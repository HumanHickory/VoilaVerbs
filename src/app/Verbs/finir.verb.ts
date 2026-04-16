import { Verb } from '../Models/verb';

export const finir: Verb = {
  infinitive: 'finir',
  english: 'to finish',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'ir',
  pastParticiple: 'fini',

  tenses: {
    present: {
      baseRuleHint: 'use stem fin- + is/is/it/issons/issez/issent',
      conjugations: {
        je: { value: 'finis' },
        tu: { value: 'finis' },
        elle: { value: 'finit' },
        nous: { value: 'finissons' },
        vous: { value: 'finissez' },
        elles: { value: 'finissent' },
      },
    },
    imparfait: {
      baseRuleHint: 'use stem finiss- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'finissais' },
        tu: { value: 'finissais' },
        elle: { value: 'finissait' },
        nous: { value: 'finissions' },
        vous: { value: 'finissiez' },
        elles: { value: 'finissaient' },
      },
    },
    future: {
      baseRuleHint: 'infinitive (finir) + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'finirai' },
        tu: { value: 'finiras' },
        elle: { value: 'finira' },
        nous: { value: 'finirons' },
        vous: { value: 'finirez' },
        elles: { value: 'finiront' },
      },
    },

    subjonctif: {
      baseRuleHint: 'use stem finiss- + e/es/e/ions/iez/ent',
      conjugations: {
        je: { value: 'finisse' },
        tu: { value: 'finisses' },
        elle: { value: 'finisse' },
        nous: { value: 'finissions' },
        vous: { value: 'finissiez' },
        elles: { value: 'finissent' },
      },
    },
  },
};
