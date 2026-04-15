import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SettingsService } from '../../Services/settings.service';
import type { VerbSettings } from '../../Models/settings.model';

import type { Verb } from '../../Models/verb';
import type { Tense } from '../../Enums/tense.enum';
import { TENSE_LABELS } from '../../Enums/tense.enum';
import type { Pronoun } from '../../Enums/pronoun.enum';
import { verbs } from '../../Verbs/VERBS.const';

type DrillTriple = {
  verb: Verb;
  tense: Tense;
  pronoun: Pronoun;
};

@Component({
  selector: 'verb-drill',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verb-drill.component.html',
  styleUrls: ['./verb-drill.component.scss'],
})
export class VerbDrillComponent implements OnInit {
  private readonly verbs: Verb[] = verbs; //add verbs in VERBS.const

  private validTriples: DrillTriple[] = [];
  private settings: VerbSettings;

  // remember the last verb used so we can prefer a different verb next time
  private lastVerb: Verb | null = null;

  currentVerb!: Verb;
  currentTense!: Tense;
  currentPronoun!: Pronoun; //actual pronoun
  currentDisplayPronoun!: string; //display pronoun (elle might be the current pronoun, but il/on/elle might be displayed)
  isCurrentlyNegative: boolean = false;

  userAnswer = '';
  showHints = false;
  showAnswer = false;
  showEnglish = true;
  errorMessage = '';

  accentCharacters = [
    'à',
    'â',
    'æ',
    'ç',
    'é',
    'è',
    'ê',
    'ë',
    'î',
    'ï',
    'ô',
    'œ',
    'ù',
    'û',
    'ü',
    "'",
    '-',
  ];

  constructor(
    private readonly router: Router,
    private readonly settingsSvc: SettingsService,
  ) {
    this.settings = this.settingsSvc.load();
  }

  ngOnInit(): void {
    this.initializeDrill();
  }

  get availableCount(): number {
    return this.validTriples.length;
  }

  submit(): void {
    const expected = this.getExpectedAnswer();

    if (!expected) {
      this.errorMessage = 'This conjugation is not available.';
      return;
    }

    if (this.answersMatch(this.userAnswer, expected)) {
      this.resetRoundState();
      this.pickRandom();
      return;
    }

    this.errorMessage = 'Incorrect — try again.';

    this.userAnswer = '';
  }

  toggleHints(): void {
    this.showHints = !this.showHints;
  }

  setShowAnswer(show: boolean): void {
    this.showAnswer = show;
  }

  openSettings(): void {
    this.router.navigateByUrl('/settings');
  }

  getHint(): string {
    const tenseData = this.getCurrentTenseData();

    if (!tenseData || !this.currentPronoun) {
      return 'No hints available.';
    }

    const conjugation = tenseData.conjugations[this.currentPronoun];

    if (conjugation?.customHint) {
      return conjugation.customHint;
    }

    if (conjugation?.isIrregular && tenseData.irregularStemHint) {
      return tenseData.irregularStemHint;
    }

    if (tenseData.baseRuleHint) {
      return tenseData.baseRuleHint;
    }

    return 'No hints available.';
  }

  getAnswer(): string {
    return this.getExpectedAnswer() ?? 'Answer not available.';
  }

  private initializeDrill(): void {
    this.applySettingsToUiState();
    this.rebuildPool();
    this.pickRandom();
  }

  private applySettingsToUiState(): void {
    this.settings = this.settingsSvc.load();

    this.resetRoundState();
  }

  private resetRoundState(): void {
    this.errorMessage = '';
    this.userAnswer = '';
    this.showAnswer = false;
    this.showHints = this.settings.alwaysShowHints;
    this.showEnglish = this.settings.showEnglish;
  }

  private rebuildPool(): void {
    const pool: DrillTriple[] = [];

    for (const verb of this.verbs) {
      if (!this.settings.groups.includes(verb.group)) {
        continue;
      }

      if (!this.matchesReflexiveFilter(verb)) {
        continue;
      }

      if (!this.matchesAuxiliaryFilter(verb)) {
        continue;
      }

      const availableTenses = Object.keys(verb.tenses) as Tense[];

      for (const tense of availableTenses) {
        if (!this.settings.tenses.includes(tense)) {
          continue;
        }

        const tenseData = verb.tenses[tense];
        if (!tenseData) {
          continue;
        }

        const pronouns = Object.keys(tenseData.conjugations) as Pronoun[];

        for (const pronoun of pronouns) {
          if (!this.settings.subjects.includes(pronoun)) {
            continue;
          }

          const conjugation = tenseData.conjugations[pronoun];
          if (!conjugation?.value) {
            continue;
          }

          if (!this.matchesIrregularFilter(conjugation.isIrregular === true)) {
            continue;
          }

          pool.push({ verb, tense, pronoun });
        }
      }
    }

    this.validTriples = pool;
  }

  private matchesIrregularFilter(isIrregular: boolean): boolean {
    switch (this.settings.irregularFilter) {
      case 'irregular':
        return isIrregular;
      case 'regular':
        return !isIrregular;
      default:
        return true;
    }
  }

  private matchesReflexiveFilter(verb: Verb): boolean {
    if (this.settings.reflexiveFilter === 'all') {
      return true;
    }

    if (this.settings.reflexiveFilter === 'reflexiveOnly') {
      return verb.isReflexive;
    }

    if (this.settings.reflexiveFilter === 'excludeReflexive') {
      return !verb.isReflexive;
    }

    return true;
  }

  private matchesAuxiliaryFilter(verb: Verb): boolean {
    const wantAvoir = this.settings.auxiliaries.includes('avoir');
    const wantEtre = this.settings.auxiliaries.includes('etre');

    // if both auxiliaries are allowed, accept any verb
    if (wantAvoir && wantEtre) return true;

    // if only avoir is allowed, require verb.usesAvoirAuxiliaryInPasseCompose === true
    if (wantAvoir && !wantEtre) return verb.usesAvoirAuxiliaryInPasseCompose === true;

    // if only etre is allowed, require verb.usesAvoirAuxiliaryInPasseCompose === false
    if (wantEtre && !wantAvoir) return verb.usesAvoirAuxiliaryInPasseCompose === false;

    // otherwise, no auxiliary selected (should be prevented elsewhere)
    return false;
  }

  private pickRandom(): void {
    if (this.validTriples.length === 0) {
      throw new Error('No valid drill combinations found. Check filters or data.');
    }

    // Prefer triples whose verb is different from the last one used.
    // If no alternative exists (all triples use the same verb), allow reuse.
    let candidates = this.validTriples;

    if (this.lastVerb) {
      const others = this.validTriples.filter(
        (t) => t.verb.infinitive !== this.lastVerb!.infinitive,
      );
      if (others.length > 0) {
        candidates = others;
      }
    }

    if (this.settings.negatives == 'all') this.isCurrentlyNegative = this.randomFrom([true, false]);
    else this.isCurrentlyNegative = this.settings.negatives === 'negativeOnly';

    const choice = candidates[Math.floor(Math.random() * candidates.length)];

    this.currentVerb = choice.verb;
    this.currentTense = choice.tense;
    this.currentPronoun = choice.pronoun;
    this.currentDisplayPronoun = this.getDisplayPronoun(choice.pronoun);

    // remember what we just used
    this.lastVerb = choice.verb;
  }
  private getCurrentTenseData() {
    if (!this.currentVerb || !this.currentTense) {
      return null;
    }

    return this.currentVerb.tenses[this.currentTense] ?? null;
  }

  private getDisplayPronoun(pronoun: Pronoun): string {
    switch (pronoun) {
      case 'elle':
        return this.randomFrom(['elle', 'il', 'on']);
      case 'elles':
        return this.randomFrom(['elles', 'ils']);
      case 'je':
        return this.getJeForm();
      default:
        return pronoun;
    }
  }

  // Handle "je" elision based on the expected answer (e.g. "j'aime", "j'habite")
  private getJeForm() {
    const expectedAnswer = this.getBaseExpectedAnswer();

    if (!expectedAnswer) return 'je';

    if (/^[aeiouh]/i.test(expectedAnswer)) {
      return "j'";
    }

    return 'je';
  }

  getDisplayTense(): string {
    return TENSE_LABELS[this.currentTense] ?? this.currentTense;
  }

  private randomFrom<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  //gets the expected conjugation, but doesn't include negatives
  private getBaseExpectedAnswer(): string | null {
    const tenseData = this.getCurrentTenseData();

    if (!tenseData || !this.currentPronoun) {
      return null;
    }

    return tenseData.conjugations[this.currentPronoun]?.value ?? null;
  }

  //returns the expected answer and will add ne and pas if negative
  private getExpectedAnswer(): string | null {
    const baseAnswer = this.getBaseExpectedAnswer();

    if (!baseAnswer) return null;

    if (!this.isCurrentlyNegative) return baseAnswer;

    return this.toNegativeForm(baseAnswer);
  }

  private answersMatch(userAnswer: string, expectedAnswer: string): boolean {
    return this.normalizeForCompare(userAnswer) === this.normalizeForCompare(expectedAnswer);
  }

  private normalizeForCompare(value: string): string {
    return value
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ');
  }

  private toNegativeForm(value: string): string {
    // reflexive (starts with me/te/se/nous/vous)
    if (/^(me|te|se|nous|vous)\s/.test(value)) {
      return value.replace(/^(me|te|se|nous|vous)\s/, (match) => `ne ${match}`) + ' pas';
    }

    return `ne ${value} pas`;
  }
}
