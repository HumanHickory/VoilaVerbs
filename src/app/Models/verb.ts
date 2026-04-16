import { Tense } from '../Enums/tense.enum';
import { TenseData } from './tense-data';

export interface Verb {
  infinitive: string;
  english: string;
  isReflexive: boolean;
  usesAvoirAuxiliaryInPasseCompose: boolean; // only needed for irregular verbs, default true
  pastParticiple: string;

  group: 'er' | 'ir' | 're' | 'irregular';

  tenses: Partial<Record<Tense, TenseData>>;
}
