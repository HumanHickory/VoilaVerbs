import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { Pronoun } from '../Enums/pronoun.enum';
import { Verb } from '../Models/verb';
import { Tense } from '../Enums/tense.enum';
import { PastParticipleService } from './pastParticiple.service';
import { UtilityService } from './utility.service';

@Injectable({ providedIn: 'root' })
export class VerbDrillService {
  constructor(
    private readonly settingsSvc: SettingsService,
    private readonly pastParticipleService: PastParticipleService,
    private readonly utilityService: UtilityService,
  ) {}

  answerMatches(userAnswer: string, expectedAnswer: string): boolean {
    const removeAccents = !(this.settingsSvc.load().requireAccents === true);
    return (
      this.utilityService.normalizeForCompare(userAnswer, removeAccents) ===
      this.utilityService.normalizeForCompare(expectedAnswer, removeAccents)
    );
  }

  answerIsAcceptable(
    userAnswer: string,
    expectedAnswer: string,
    verb: Verb,
    tense: Tense,
    pronoun: Pronoun,
  ) {
    //if the answer matches the expected answer, obviously acceptable
    if (this.answerMatches(userAnswer, expectedAnswer)) return true;

    //but if it's not a compound tense and it doesn't match, then it's not acceptable
    if (!this.utilityService.compoundTenses.includes(tense)) return false;

    //these are gendered and account for plural, so if it didn't match before, it's not going to match now
    if (pronoun == 'elle' || pronoun == 'elles') return false;

    //get the fem and masc conjugations (will use 'pronoun' to determine if singular or plural)
    const feminineConjugation = this.pastParticipleService.getConjugation(
      verb,
      pronoun,
      tense,
      true,
    );

    const masculineConjugation = this.pastParticipleService.getConjugation(
      verb,
      pronoun,
      tense,
      false,
    );

    //if either expected answer is acceptable, then return true
    const expectedAnswers = [feminineConjugation, masculineConjugation];
    return this.answersMatch(userAnswer, expectedAnswers);
  }

  answersMatch(userAnswer: string, expectedAnswers: string[]): boolean {
    const removeAccents = !(this.settingsSvc.load().requireAccents === true);

    return expectedAnswers.some(
      (expAns) =>
        this.utilityService.normalizeForCompare(userAnswer, removeAccents) ===
        this.utilityService.normalizeForCompare(expAns, removeAccents),
    );
  }

  answerMatchesWithNoAccent(userAnswer: string, expectedAnswer: string): boolean {
    return (
      this.utilityService.normalizeForCompare(userAnswer, true) ===
      this.utilityService.normalizeForCompare(expectedAnswer, true)
    );
  }

  matchesIrregularFilter(isIrregular: boolean): boolean {
    switch (this.settingsSvc.load().irregularFilter) {
      case 'irregular':
        return isIrregular;
      case 'regular':
        return !isIrregular;
      default:
        return true;
    }
  }

  matchesReflexiveFilter(verb: Verb): boolean {
    const settings = this.settingsSvc.load();
    if (settings.reflexiveFilter === 'all') {
      return true;
    }

    if (settings.reflexiveFilter === 'reflexiveOnly') {
      return verb.isReflexive;
    }

    if (settings.reflexiveFilter === 'excludeReflexive') {
      return !verb.isReflexive;
    }

    return true;
  }

  matchesAuxiliaryFilter(verb: Verb): boolean {
    const settings = this.settingsSvc.load();

    const wantAvoir = settings.auxiliaries.includes('avoir');
    const wantEtre = settings.auxiliaries.includes('etre');
    // if both auxiliaries are allowed, accept any verb
    if (wantAvoir && wantEtre) return true;

    // if only avoir is allowed, require verb.usesAvoirAuxiliaryInPasseCompose === true
    if (wantAvoir && !wantEtre) return verb.usesAvoirAuxiliaryInPasseCompose === true;

    // if only etre is allowed, require verb.usesAvoirAuxiliaryInPasseCompose === false
    if (wantEtre && !wantAvoir) return verb.usesAvoirAuxiliaryInPasseCompose === false;

    // otherwise, no auxiliary selected (should be prevented elsewhere)
    return false;
  }

  matchesGroup(verb: Verb): boolean {
    return this.settingsSvc.load().groups.includes(verb.group);
  }

  //#region Detailed Error Message Services

  tokenizeFrench(value: string): string[] {
    return value.trim().match(/[A-Za-zÀ-ÿŒœÆæ]+(?:[-'’][A-Za-zÀ-ÿŒœÆæ]+)*/g) ?? [];
  }

  normalizeToken(value: string): string {
    return value
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/’/g, "'")
      .toLowerCase();
  }

  buildDetailedMismatchMessage(expected: string, actual: string): string {
    const expectedTokens = this.tokenizeFrench(expected);
    const actualTokens = this.tokenizeFrench(actual);

    const aligned = this.alignTokens(expectedTokens, actualTokens);

    return aligned.join(' ');
  }

  private alignTokens(expected: string[], actual: string[]): string[] {
    const m = expected.length;
    const n = actual.length;

    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
      dp[0][j] = 0; // extra user words are ignored
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const expectedNorm = this.normalizeToken(expected[i - 1]);
        const actualNorm = this.normalizeToken(actual[j - 1]);

        if (expectedNorm === actualNorm) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j - 1] + 1, // substitution
            dp[i - 1][j] + 1, // missing expected word
            dp[i][j - 1], // ignore extra user word
          );
        }
      }
    }

    const result: string[] = [];
    let i = m;
    let j = n;

    while (i > 0) {
      if (j > 0) {
        const expectedNorm = this.normalizeToken(expected[i - 1]);
        const actualNorm = this.normalizeToken(actual[j - 1]);

        if (expectedNorm === actualNorm && dp[i][j] === dp[i - 1][j - 1]) {
          result.unshift(expected[i - 1]);
          i--;
          j--;
          continue;
        }

        if (dp[i][j] === dp[i - 1][j - 1] + 1) {
          result.unshift(`*${expected[i - 1]}*`);
          i--;
          j--;
          continue;
        }

        if (dp[i][j] === dp[i - 1][j] + 1) {
          result.unshift(`+${expected[i - 1]}`);
          i--;
          continue;
        }

        if (dp[i][j] === dp[i][j - 1]) {
          j--;
          continue;
        }
      } else {
        result.unshift(`+${expected[i - 1]}`);
        i--;
      }
    }

    return result;
  }

  //#endregion
}
