export type Tense =
  | 'present'
  | 'imparfait'
  | 'future'
  | 'passeCompose'
  | 'subjonctif'
  | 'plusQueParfait';

export const TENSE_LABELS: Record<Tense, string> = {
  present: 'Present',
  imparfait: 'Imparfait',
  future: 'Future',
  passeCompose: 'Passé Composé',
  subjonctif: 'Subjonctif',
  plusQueParfait: 'Plus-Que-Parfait',
};
