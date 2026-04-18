import { Verb } from '../Models/verb';

export const prendre: Verb = {
  infinitive: 'prendre',
  english: 'to take',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'irregular',
  pastParticiple: 'pris',
  tenses: {
    present: {
      isFullyIrregular: true,
      baseRuleHint: 'irregular present forms (prends/prends/prend/prenons/prenez/prennent)',
      conjugations: {
        je: { value: 'prends', isIrregular: true },
        tu: { value: 'prends', isIrregular: true },
        elle: { value: 'prend', isIrregular: true },
        nous: { value: 'prenons', isIrregular: true },
        vous: { value: 'prenez', isIrregular: true },
        elles: { value: 'prennent', isIrregular: true },
      },
    },
    imparfait: {
      baseRuleHint: 'use stem pren- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'prenais' },
        tu: { value: 'prenais' },
        elle: { value: 'prenait' },
        nous: { value: 'prenions' },
        vous: { value: 'preniez' },
        elles: { value: 'prenaient' },
      },
    },
    future: {
      irregularStemHint: 'use stem prendr- + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'prendrai', isIrregular: true },
        tu: { value: 'prendras', isIrregular: true },
        elle: { value: 'prendra', isIrregular: true },
        nous: { value: 'prendrons', isIrregular: true },
        vous: { value: 'prendrez', isIrregular: true },
        elles: { value: 'prendront', isIrregular: true },
      },
    },

    subjonctif: {
      baseRuleHint: 'use stem prenn- (singular) + e/es/e/ions/iez/ent; nous/vous use pren-',
      conjugations: {
        je: { value: 'prenne', isIrregular: true },
        tu: { value: 'prennes', isIrregular: true },
        elle: { value: 'prenne', isIrregular: true },
        nous: { value: 'prenions' },
        vous: { value: 'preniez' },
        elles: { value: 'prennent', isIrregular: true },
      },
    },
    conditional: {
      baseRuleHint: 'use stem prendr- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'prendrais' },
        tu: { value: 'prendrais' },
        elle: { value: 'prendrait' },
        nous: { value: 'prendrions' },
        vous: { value: 'prendriez' },
        elles: { value: 'prendraient' },
      },
    },
  },
};
