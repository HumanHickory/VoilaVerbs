import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { Pronoun } from '../Enums/pronoun.enum';
import { Verb } from '../Models/verb';

@Injectable({ providedIn: 'root' })
export class VerbDrillService {
  constructor(private readonly settingsSvc: SettingsService) {}

  randomFrom<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  answerMatches(userAnswer: string, expectedAnswer: string): boolean {
    const removeAccents = !(this.settingsSvc.load().requireAccents === true);
    return (
      this.normalizeForCompare(userAnswer, removeAccents) ===
      this.normalizeForCompare(expectedAnswer, removeAccents)
    );
  }

  answersMatch(userAnswer: string, expectedAnswers: string[]): boolean {
    const removeAccents = !(this.settingsSvc.load().requireAccents === true);

    return expectedAnswers.some(
      (expAns) =>
        this.normalizeForCompare(userAnswer, removeAccents) ===
        this.normalizeForCompare(expAns, removeAccents),
    );
  }

  answerMatchesWithNoAccent(userAnswer: string, expectedAnswer: string): boolean {
    return (
      this.normalizeForCompare(userAnswer, true) === this.normalizeForCompare(expectedAnswer, true)
    );
  }

  private normalizeForCompare(value: string, removeAccents = true): string {
    let v = value ?? '';
    v = v.normalize('NFD'); //this separates the letter and diacritic so "é" becomes "e" + "́ ", which allows us to remove the diacritic
    if (removeAccents) v = v.replace(/\p{Diacritic}/gu, ''); // remove diacritics when accents are not required

    //.replace(/\s+/g, ' ') = removes extra white space between words (ne    parle = ne parle)
    //.replace(/[’]/g, "'") = changes the curly apostrophe into a normal apostrophe
    return v.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[’]/g, "'");
  }

  toMasculinePasseCompose(answer: string, displayPronoun: string): string {
    if (displayPronoun === 'il' || displayPronoun === 'on')
      return answer.replace(/ée\b/g, 'é').replace(/ie\b/g, 'i').replace(/ue\b/g, 'u');

    if (displayPronoun === 'ils')
      return answer.replace(/ées\b/g, 'és').replace(/ies\b/g, 'is').replace(/ues\b/g, 'us');

    return answer;
  }

  toNegativeForm(value: string): string {
    const v = value.trim().replace(/[’]/g, "'");

    // Already contracted reflexive pronoun, like:
    // s'est, t'es, m'appelle
    if (/^(m'|t'|s')/i.test(v)) {
      return `ne ${v} pas`;
    }

    // Uncontracted reflexive pronoun, like:
    // me couche, te leves, se souvient, nous couchons, vous levez
    if (/^(me|te|se|nous|vous)\b/i.test(v)) {
      return `ne ${v} pas`;
    }

    // Non-reflexive form starting with vowel or mute h:
    // aime, est, habite
    if (/^[aeiouhàâæéèêëîïôœùûü]/i.test(v)) {
      return `n'${v} pas`;
    }

    return `ne ${v} pas`;
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
