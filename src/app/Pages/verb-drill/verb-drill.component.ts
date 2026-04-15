import { Component, ElementRef, input, OnInit, ViewChild } from '@angular/core';
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
import { VerbDrillService } from '../../Services/verbDrill.service';

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
  @ViewChild('answerInput') answerInput!: ElementRef<HTMLInputElement>; //used to refocus on the input

  private validTriples: DrillTriple[] = [];
  private settings: VerbSettings;
  private maxWrongAttempts = 3;

  // remember the last verb used so we can prefer a different verb next time
  private lastVerb: Verb | null = null;

  currentVerb!: Verb;
  currentTense!: Tense;
  currentPronoun!: Pronoun; //actual pronoun
  currentDisplayPronoun!: string; //display pronoun (elle might be the current pronoun, but il/on/elle might be displayed)
  isCurrentlyNegative: boolean = false;
  wrongAttempts = 0;

  userAnswer = '';
  showHints = false;
  showAnswer = false;
  showEnglish = true;
  errorMessage = '';

  //TO DEPLOY: ng deploy --base-href=/VoilaVerbs/

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
    private readonly verbDrillService: VerbDrillService,
  ) {
    this.settings = this.settingsSvc.load();
  }

  ngOnInit(): void {
    this.initializeDrill();
  }

  private initializeDrill(): void {
    this.getSettings();
    this.rebuildPool();
    this.pickRandom();
  }

  private getSettings(): void {
    this.settings = this.settingsSvc.load();
    this.resetRoundState();
  }

  private resetRoundState(): void {
    this.errorMessage = '';
    this.userAnswer = '';
    this.showAnswer = false;
    this.showHints = this.settings.alwaysShowHints;
    this.showEnglish = this.settings.showEnglish;
    this.wrongAttempts = 0;
  }

  private rebuildPool(): void {
    const pool: DrillTriple[] = [];

    for (const verb of this.verbs) {
      if (
        !this.verbDrillService.matchesGroup(verb) ||
        !this.verbDrillService.matchesReflexiveFilter(verb) ||
        !this.verbDrillService.matchesAuxiliaryFilter(verb)
      )
        continue;

      const availableTenses = Object.keys(verb.tenses) as Tense[];

      for (const tense of availableTenses) {
        if (!this.settings.tenses.includes(tense)) continue;

        const tenseData = verb.tenses[tense];
        if (!tenseData) continue;

        const pronouns = Object.keys(tenseData.conjugations) as Pronoun[];

        for (const pronoun of pronouns) {
          if (!this.settings.subjects.includes(pronoun)) continue;

          const conjugation = tenseData.conjugations[pronoun];
          if (!conjugation?.value) continue;

          if (!this.verbDrillService.matchesIrregularFilter(conjugation.isIrregular === true))
            continue;

          pool.push({ verb, tense, pronoun });
        }
      }
    }

    this.validTriples = pool;
  }

  submit(): void {
    const expected = this.expectedAnswer;
    const tenseData = this.getCurrentTenseData();

    let errMessage = 'Incorrect — try again.';
    if (!expected) {
      this.errorMessage = 'This conjugation is not available.';
      return;
    }

    if (tenseData == null) return;

    if (this.verbDrillService.answerMatches(this.userAnswer, expected)) {
      this.resetRoundState();
      this.pickRandom();
      this.refocusOnInput();

      return;
    }

    //Create more helpful error messages if it's something small that's wrong
    if (this.verbDrillService.answerMatchesWithNoAccent(this.userAnswer, expected))
      errMessage = 'So Close! Missing Diacritics';
    else if (
      this.currentTense == 'passeCompose' &&
      this.currentVerb.usesAvoirAuxiliaryInPasseCompose === false &&
      (this.currentPronoun == 'elle' || this.currentPronoun == 'elles')
    ) {
      //if it's an etre 3rd person passe verb (which will have gender and plural agreement)
      //then see if their answer matches a different version of that agreement, and give them a more helpful suggestion
      const singularFeminine = tenseData.conjugations['elle']?.value ?? '';
      const pluralFeminine = tenseData.conjugations['elles']?.value ?? '';

      const singularMasculine = this.verbDrillService.toMasculinePasseCompose(
        singularFeminine,
        'il',
      );

      const pluralMasculine = this.verbDrillService.toMasculinePasseCompose(pluralFeminine, 'ils');

      //might as well get all of them, even though we know it doesn't match one (the correct answer)
      const simulatedAnswerSingleFem = this.createExpectedAnswer(singularFeminine);
      const simulatedAnswerPluralFem = this.createExpectedAnswer(pluralFeminine);
      const simulatedAnswerSingleMasc = this.createExpectedAnswer(singularMasculine);
      const simulatedAnswerPluralMasc = this.createExpectedAnswer(pluralMasculine);

      //if the answer matches any of the passe compose versions, then give them a more helpful suggestion
      if (
        this.verbDrillService.answersMatch(this.userAnswer, [
          simulatedAnswerSingleFem,
          simulatedAnswerPluralFem,
          simulatedAnswerSingleMasc,
          simulatedAnswerPluralMasc,
        ])
      )
        errMessage = 'So Close! Check gender or plural agreement in passé composé.';
    }

    this.wrongAttempts++;

    if (this.wrongAttempts >= this.maxWrongAttempts) {
      this.errorMessage = this.verbDrillService.buildDetailedMismatchMessage(
        expected,
        this.userAnswer,
      );
    } else {
      this.errorMessage = errMessage;
    }
    if (this.settings.resetAnswersOnMismatch) this.userAnswer = '';
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
    return this.expectedAnswer ?? 'Answer not available.';
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

    if (this.settings.negatives == 'all')
      this.isCurrentlyNegative = this.verbDrillService.randomFrom([true, false]);
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
        return this.verbDrillService.randomFrom(['elle', 'il', 'on']);
      case 'elles':
        return this.verbDrillService.randomFrom(['elles', 'ils']);
      case 'je':
        return this.JeForm;
      default:
        return pronoun;
    }
  }

  // Handle "je" elision based on the expected answer (e.g. "j'aime", "j'habite")
  private get JeForm() {
    const expectedAnswer = this.baseExpectedAnswer;

    if (!expectedAnswer || this.isCurrentlyNegative) return 'je';

    if (/^[aeiouh]/i.test(expectedAnswer)) {
      return "j'";
    }

    return 'je';
  }

  get displayTense(): string {
    return TENSE_LABELS[this.currentTense] ?? this.currentTense;
  }

  //gets the expected conjugation, but doesn't include negatives
  private get baseExpectedAnswer(): string {
    const tenseData = this.getCurrentTenseData();

    if (!tenseData || !this.currentPronoun) {
      return '';
    }

    const baseAnswer = tenseData.conjugations[this.currentPronoun]?.value ?? '';

    if (this.currentTense == 'passeCompose')
      return this.verbDrillService.toMasculinePasseCompose(baseAnswer, this.currentDisplayPronoun);
    else return baseAnswer;
  }

  //returns the expected answer and will add ne and pas if negative
  private get expectedAnswer(): string {
    const baseAnswer = this.baseExpectedAnswer;

    if (!baseAnswer) return '';
    return this.createExpectedAnswer(baseAnswer);
  }

  private createExpectedAnswer(possibleAnswer: string): string {
    if (!this.isCurrentlyNegative) return possibleAnswer;

    return this.verbDrillService.toNegativeForm(possibleAnswer);
  }

  protected insertAccent(char: string): void {
    const input = this.answerInput.nativeElement;
    const start = input.selectionStart ?? this.userAnswer.length;
    const end = input.selectionEnd ?? this.userAnswer.length;

    this.userAnswer = this.userAnswer.slice(0, start) + char + this.userAnswer.slice(end);
    this.refocusOnInput();
  }

  private refocusOnInput() {
    const input = this.answerInput.nativeElement;
    input.focus();
    const newCursorPos = this.userAnswer.length;
    input.setSelectionRange(newCursorPos, newCursorPos);
  }
}
