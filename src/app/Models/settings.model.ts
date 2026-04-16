import type { Tense } from '../Enums/tense.enum';
import type { Pronoun } from '../Enums/pronoun.enum';

export type IrregularFilter = 'all' | 'regular' | 'irregular';
export type ReflexiveFilter = 'all' | 'reflexiveOnly' | 'excludeReflexive';
export type NegativeFilters = 'all' | 'positiveOnly' | 'negativeOnly';

export interface VerbSettings {
  tenses: Tense[]; // e.g. ['present','future']
  subjects: Pronoun[]; // pronouns
  groups: string[]; // er/ir/re/irregular
  irregularFilter: IrregularFilter;
  reflexiveFilter: ReflexiveFilter;
  auxiliaries: string[]; // 'avoir' | 'etre'
  negatives: NegativeFilters;

  // general UI settings
  showEnglish: boolean;
  alwaysShowHints: boolean;
  requireAccents: boolean;
  resetAnswersOnMismatch: boolean;
  showOnScreenAccents: boolean;
}

export const SETTINGS_KEY = 'vv-settings';

export const DEFAULT_SETTINGS: VerbSettings = {
  tenses: ['present', 'imparfait', 'future', 'passeCompose', 'subjonctif'],
  subjects: ['je', 'tu', 'elle', 'nous', 'vous', 'elles'],
  groups: ['er', 'ir', 're', 'irregular'],
  irregularFilter: 'all',
  reflexiveFilter: 'all',
  auxiliaries: ['avoir', 'etre'],
  negatives: 'all',

  showEnglish: true,
  alwaysShowHints: false,
  requireAccents: false,
  resetAnswersOnMismatch: true,
  showOnScreenAccents: true,
};
