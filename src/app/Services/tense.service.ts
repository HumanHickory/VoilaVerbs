import { Injectable } from '@angular/core';
import { Pronoun } from '../Enums/pronoun.enum';
import { Tense } from '../Enums/tense.enum';
import { TenseDescription } from '../Models/tense-description.model';

@Injectable({ providedIn: 'root' })
export class TenseService {
  learnATense(tense: Tense) {
    if (tense == 'present') return this.learnPresentTense();

    return this.learnPresentTense();
  }

  learnPresentTense(): TenseDescription {
    return {
      tense: 'present',

      description: 'The present tense is used to describe actions happening now or general truths.',

      howToConjugate: {
        je: 'Remove ending + e / is / irregular',
        tu: 'Remove ending + es / is / irregular',
        elle: 'Remove ending + e / it / irregular',
        nous: 'Remove ending + ons / issons / irregular',
        vous: 'Remove ending + ez / issez / irregular',
        elles: 'Remove ending + ent / issent / irregular',
      },

      exampleSentences: [
        'Je parle français. (I speak French.)',
        'Elle travaille beaucoup. (She works a lot.)',
        'Nous finissons le projet. (We finish the project.)',
        'Ils aiment le chocolat. (They like chocolate.)',
        'Tu regardes la télévision. (You watch TV.)',
      ],
    };
  }
}
