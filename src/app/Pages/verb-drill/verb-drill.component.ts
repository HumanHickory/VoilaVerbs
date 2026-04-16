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
import { PastParticipleService } from '../../Services/pastParticiple.service';
import { UtilityService } from '../../Services/utility.service';
import { TenseService } from '../../Services/tense.service';
import { TenseDescription } from '../../Models/tense-description.model';

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
    private readonly pastParticipleService: PastParticipleService,
    private readonly utilityService: UtilityService,
    private readonly tenseService: TenseService,
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
      ) {
        continue;
      }

      const availableTenses = Object.keys(verb.tenses) as Tense[];
      availableTenses.push('passeCompose');
      availableTenses.push('plusQueParfait');

      for (const tense of availableTenses) {
        if (!this.settings.tenses.includes(tense)) {
          continue;
        }

        const isCompoundTense = this.utilityService.compoundTenses.includes(tense);

        if (isCompoundTense) {
          if (!verb.pastParticiple || !verb.pastParticiple.trim()) {
            continue;
          }

          for (const pronoun of this.settings.subjects) {
            pool.push({ verb, tense, pronoun });
          }

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

          if (!this.verbDrillService.matchesIrregularFilter(conjugation.isIrregular === true)) {
            continue;
          }

          pool.push({ verb, tense, pronoun });
        }
      }
    }

    this.validTriples = pool;
  }

  submit(): void {
    const expected = this.expectedAnswer;

    let errMessage = 'Incorrect — try again.';
    if (!expected) {
      this.errorMessage = 'This conjugation is not available.';
      return;
    }

    if (
      this.verbDrillService.answerIsAcceptable(
        this.userAnswer,
        expected,
        this.currentVerb,
        this.currentTense,
        this.currentPronoun,
      )
    ) {
      this.resetRoundState();
      this.pickRandom();
      this.refocusOnInput();

      return;
    }

    //Create more helpful error messages if it's something small that's wrong
    if (this.verbDrillService.answerMatchesWithNoAccent(this.userAnswer, expected))
      errMessage = 'So Close! Missing Diacritics';
    else if (
      this.utilityService.compoundTenses.includes(this.currentTense) &&
      this.currentVerb.usesAvoirAuxiliaryInPasseCompose === false
    ) {
      //etre auxilary verbs change the past participle for gender and/or plurality (je + aller can be je suis alle or je suis allee, for example)
      //then see if their answer matches a different version of that agreement, and give them a more helpful suggestion
      const allPastParticiplesConjugations = this.createEtreConjugations();
      let simulatedAnswers = [];

      allPastParticiplesConjugations.forEach((conjugation) => {
        simulatedAnswers.push(this.createExpectedAnswer(conjugation));
      });

      //if the answer matches any of the passe compose versions, then give them a more helpful suggestion
      if (this.verbDrillService.answersMatch(this.userAnswer, allPastParticiplesConjugations))
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

  learnAboutTense() {}

  openSettings(): void {
    this.router.navigateByUrl('/settings');
  }

  getHint(): string {
    if (!this.currentPronoun) return 'Current Pronoun Missing, cannot get hint.';

    if (this.utilityService.compoundTenses.includes(this.currentTense)) {
      let hint = '';
      if (this.currentVerb.isReflexive) hint += 'Reflexive Pronoun + ';

      if (this.currentVerb.usesAvoirAuxiliaryInPasseCompose) hint += 'Avoir ';
      else hint += 'Etre ';

      if (this.currentTense == 'passeCompose') hint += '(present tense) + ';
      else if (this.currentTense == 'plusQueParfait') hint += '(imparfait tense) + ';

      hint += `past participle (${this.currentVerb.pastParticiple}) `;
      if (!this.currentVerb.usesAvoirAuxiliaryInPasseCompose)
        hint += '(Remember the past participle must have gender and plural agreement)';

      return hint;
    } else {
      const tenseData = this.getCurrentTenseData();

      if (!tenseData) return 'Tense Data Missing, cannot get hint';

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
    }

    return 'No hints available.';
  }

  //used for show answer button
  getAnswer(): string {
    return this.expectedAnswer ?? 'Answer not available.';
  }

  tenseDescription(): TenseDescription {
    return this.tenseService.learnATense(this.currentTense);
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
      this.isCurrentlyNegative = this.utilityService.randomFrom([true, false]);
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
        return this.utilityService.randomFrom(['elle', 'il', 'on']);
      case 'elles':
        return this.utilityService.randomFrom(['elles', 'ils']);
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
    if (!this.currentPronoun) return '';

    let baseAnswer = '';
    if (this.utilityService.compoundTenses.includes(this.currentTense))
      baseAnswer = this.pastParticipleService.getConjugation(
        this.currentVerb,
        this.currentPronoun,
        this.currentTense,
        this.utilityService.isFemininePronoun(this.currentDisplayPronoun),
      );
    else {
      const tenseData = this.getCurrentTenseData();
      if (!tenseData) return '';

      baseAnswer = tenseData.conjugations[this.currentPronoun]?.value ?? '';
    }

    return baseAnswer;
  }

  //returns the expected answer and will add ne and pas if negative
  private get expectedAnswer(): string {
    const baseAnswer = this.baseExpectedAnswer;

    if (!baseAnswer) return '';
    return this.createExpectedAnswer(baseAnswer);
  }

  private createExpectedAnswer(possibleAnswer: string): string {
    if (!this.isCurrentlyNegative) return possibleAnswer;
    return this.utilityService.toNegativeForm(possibleAnswer);
  }

  get showOnScreenAccents(): boolean {
    return this.settings.showOnScreenAccents;
  }

  private createEtreConjugations(): string[] {
    const singularFeminine = this.pastParticipleService.getConjugation(
      this.currentVerb,
      'elle',
      this.currentTense,
      true,
    );
    const pluralFeminine = this.pastParticipleService.getConjugation(
      this.currentVerb,
      'elles',
      this.currentTense,
      true,
    );
    const singularMasculine = this.pastParticipleService.getConjugation(
      this.currentVerb,
      'elle',
      this.currentTense,
      false,
    );
    const pluralMasculine = this.pastParticipleService.getConjugation(
      this.currentVerb,
      'elles',
      this.currentTense,
      false,
    );

    const conjugations = [singularFeminine, pluralFeminine, singularMasculine, pluralMasculine];
    return conjugations;
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
