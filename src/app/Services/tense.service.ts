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
        je: 'Remove ending + e (-er) / is (-r) / s (-re)',
        tu: 'Remove ending + es (-er) / is (-r) / s (-re)',
        elle: 'Remove ending + e (-er) / it (-r) / n/a (-re)',
        nous: 'Remove ending + ons (-er) / issons (-r) / ons (-re)',
        vous: 'Remove ending + ez (-er) / issez (-r) / ez (-re)',
        elles: 'Remove ending + ent (-er) / issent (-r) / ent (-re)',
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
