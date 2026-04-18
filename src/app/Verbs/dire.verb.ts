import { Verb } from '../Models/verb';

export const dire: Verb = {
  infinitive: 'dire',
  english: 'to say / to tell',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'irregular',
  pastParticiple: 'dit',
  tenses: {
    present: {
      baseRuleHint: 'irregular present (dis/dis/dit/disons/dites/disent)',
      conjugations: {
        je: { value: 'dis', isIrregular: true },
        tu: { value: 'dis', isIrregular: true },
        elle: { value: 'dit', isIrregular: true },
        nous: { value: 'disons', isIrregular: true },
        vous: { value: 'dites', isIrregular: true },
        elles: { value: 'disent', isIrregular: true },
      },
    },

    imparfait: {
      baseRuleHint: 'use stem dis- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'disais' },
        tu: { value: 'disais' },
        elle: { value: 'disait' },
        nous: { value: 'disions' },
        vous: { value: 'disiez' },
        elles: { value: 'disaient' },
      },
    },

    future: {
      irregularStemHint: 'use stem dir- + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'dirai', isIrregular: true },
        tu: { value: 'diras', isIrregular: true },
        elle: { value: 'dira', isIrregular: true },
        nous: { value: 'dirons', isIrregular: true },
        vous: { value: 'direz', isIrregular: true },
        elles: { value: 'diront', isIrregular: true },
      },
    },

    subjonctif: {
      baseRuleHint: 'use stem dis- + e/es/e/ions/iez/ent',
      conjugations: {
        je: { value: 'dise', isIrregular: true },
        tu: { value: 'dises', isIrregular: true },
        elle: { value: 'dise', isIrregular: true },
        nous: { value: 'disions' },
        vous: { value: 'disiez' },
        elles: { value: 'disent', isIrregular: true },
      },
    },

    conditional: {
      baseRuleHint: 'use stem dir- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'dirais' },
        tu: { value: 'dirais' },
        elle: { value: 'dirait' },
        nous: { value: 'dirions' },
        vous: { value: 'diriez' },
        elles: { value: 'diraient' },
      },
    },
  },
};
