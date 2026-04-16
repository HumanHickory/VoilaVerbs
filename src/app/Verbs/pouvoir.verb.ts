import { Verb } from '../Models/verb';

export const pouvoir: Verb = {
  infinitive: 'pouvoir',
  english: 'can / to be able to',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'irregular',
  pastParticiple: 'pu',

  tenses: {
    present: {
      isFullyIrregular: true,
      baseRuleHint: 'irregular present forms (peux/peux/peut/pouvons/pouvez/peuvent)',
      conjugations: {
        je: { value: 'peux', isIrregular: true },
        tu: { value: 'peux', isIrregular: true },
        elle: { value: 'peut', isIrregular: true },
        nous: { value: 'pouvons', isIrregular: true },
        vous: { value: 'pouvez', isIrregular: true },
        elles: { value: 'peuvent', isIrregular: true },
      },
    },
    imparfait: {
      baseRuleHint: 'use pouv- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'pouvais' },
        tu: { value: 'pouvais' },
        elle: { value: 'pouvait' },
        nous: { value: 'pouvions' },
        vous: { value: 'pouviez' },
        elles: { value: 'pouvaient' },
      },
    },
    future: {
      irregularStemHint: 'use stem pourr- + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'pourrai', isIrregular: true },
        tu: { value: 'pourras', isIrregular: true },
        elle: { value: 'pourra', isIrregular: true },
        nous: { value: 'pourrons', isIrregular: true },
        vous: { value: 'pourrez', isIrregular: true },
        elles: { value: 'pourront', isIrregular: true },
      },
    },

    subjonctif: {
      baseRuleHint: 'use stem puiss- + e/es/e/ions/iez/ent',
      conjugations: {
        je: { value: 'puisse', isIrregular: true },
        tu: { value: 'puisses', isIrregular: true },
        elle: { value: 'puisse', isIrregular: true },
        nous: { value: 'puissions', isIrregular: true },
        vous: { value: 'puissiez', isIrregular: true },
        elles: { value: 'puissent', isIrregular: true },
      },
    },
  },
};
