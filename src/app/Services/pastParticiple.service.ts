import { Injectable } from '@angular/core';
import { Verb } from '../Models/verb';
import { Tense, TENSE_LABELS } from '../Enums/tense.enum';
import { avoir } from '../Verbs/avoir.verb';
import { etre } from '../Verbs/etre.verb';
import { Pronoun } from '../Enums/pronoun.enum';
import { VerbDrillService } from './verbDrill.service';
import { UtilityService } from './utility.service';

@Injectable({ providedIn: 'root' })
export class PastParticipleService {
  constructor(private readonly utilityService: UtilityService) {}

  //Gets the past participle, ignoring gender and plural
  getBasePastParticiple(verb: Verb) {
    return verb.pastParticiple;
  }

  getAuxiliaryVerb(verb: Verb, pronoun: Pronoun, tense: Tense): string {
    const baseAuxVerb = verb.usesAvoirAuxiliaryInPasseCompose ? avoir : etre;

    const auxiliaryTense = this.getAuxiliaryTenseForCompoundTense(tense);
    if (!auxiliaryTense) return '';

    const auxVerbTense = baseAuxVerb.tenses[auxiliaryTense];
    if (!auxVerbTense) return '';

    return auxVerbTense.conjugations[pronoun].value;
  }

  private getAuxiliaryTenseForCompoundTense(tense: Tense): Tense | null {
    switch (tense) {
      case 'passeCompose':
        return 'present';
      // case 'plusQueParfait':
      //   return 'imparfait';
      default:
        return null;
    }
  }

  getConjugation(verb: Verb, pronoun: Pronoun, tense: Tense, isFeminine: boolean) {
    let pastParticiple = this.getBasePastParticiple(verb);
    const auxiliaryVerb = this.getAuxiliaryVerb(verb, pronoun, tense);

    const isPluralPronoun = this.isPluralPronoun(pronoun);
    if (verb.usesAvoirAuxiliaryInPasseCompose == false) {
      if (isFeminine && !isPluralPronoun) pastParticiple += 'e';
      else if (isFeminine && isPluralPronoun) pastParticiple += 'es';
      else if (isPluralPronoun) pastParticiple += 's';
    }

    let conjugation = `${auxiliaryVerb} ${pastParticiple}`;

    if (verb.isReflexive) {
      //only use contractions with s'est and t'es (but not j'suis or s'sont obvi)
      const pronounsThatNeedContractionWithEtre = ['tu', 'elle'];
      let reflexivePronoun =
        verb.usesAvoirAuxiliaryInPasseCompose == false &&
        pronounsThatNeedContractionWithEtre.includes(pronoun)
          ? this.utilityService.getContractedReflexivePronoun(pronoun)
          : this.utilityService.getReflexivePronoun(pronoun);

      //if it's  contracted and ends in ' we don't want a space. Otherwise, add a space
      const separator = reflexivePronoun.endsWith("'") ? '' : ' ';
      conjugation = `${reflexivePronoun}${separator}${conjugation}`;
    }

    return conjugation;
  }

  isPluralPronoun(pronoun: Pronoun) {
    const pluralPronouns: Pronoun[] = ['nous', 'vous', 'elles'];
    return pluralPronouns.includes(pronoun);
  }
}
