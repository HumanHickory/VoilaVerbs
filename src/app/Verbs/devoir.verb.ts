import { Verb } from '../Models/verb';

export const devoir: Verb = {
  infinitive: 'devoir',
  english: 'must / to have to',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'irregular',
  tenses: {
    present: {
      isFullyIrregular: true,
      baseRuleHint: 'use stem doi- or dev-',
      conjugations: {
        je: { value: 'dois', isIrregular: true },
        tu: { value: 'dois', isIrregular: true },
        elle: { value: 'doit', isIrregular: true },
        nous: { value: 'devons', isIrregular: true },
        vous: { value: 'devez', isIrregular: true },
        elles: { value: 'doivent', isIrregular: true },
      },
    },
    imparfait: {
      baseRuleHint: 'use dev- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'devais' },
        tu: { value: 'devais' },
        elle: { value: 'devait' },
        nous: { value: 'devions' },
        vous: { value: 'deviez' },
        elles: { value: 'devaient' },
      },
    },
    future: {
      baseRuleHint: 'use stem devr- + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'devrai', isIrregular: true },
        tu: { value: 'devras', isIrregular: true },
        elle: { value: 'devra', isIrregular: true },
        nous: { value: 'devrons', isIrregular: true },
        vous: { value: 'devrez', isIrregular: true },
        elles: { value: 'devront', isIrregular: true },
      },
    },
    passeCompose: {
      baseRuleHint: 'present tense avoir + past participle (dû)',
      conjugations: {
        je: { value: 'ai dû', isIrregular: true },
        tu: { value: 'as dû', isIrregular: true },
        elle: { value: 'a dû', isIrregular: true },
        nous: { value: 'avons dû', isIrregular: true },
        vous: { value: 'avez dû', isIrregular: true },
        elles: { value: 'ont dû', isIrregular: true },
      },
    },
    subjonctif: {
      baseRuleHint: 'use doiv- + e/es/e/ions/iez/ent',
      isFullyIrregular: true,
      conjugations: {
        je: { value: 'doive', isIrregular: true },
        tu: { value: 'doives', isIrregular: true },
        elle: { value: 'doive', isIrregular: true },
        nous: { value: 'devions', isIrregular: true },
        vous: { value: 'deviez', isIrregular: true },
        elles: { value: 'doivent', isIrregular: true },
      },
    },
  },
};
