import { Pronoun } from '../Enums/pronoun.enum';
import { Tense } from '../Enums/tense.enum';

export interface TenseDescription {
  tense: Tense;
  description: string;
  howToConjugate: Record<Pronoun, string>;
  exampleSentences: string[];
}
