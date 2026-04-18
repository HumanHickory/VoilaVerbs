import { Verb } from '../Models/verb';

export const devoir: Verb = {
  infinitive: 'devoir',
  english: 'must / to have to',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'irregular',
  pastParticiple: 'dû',

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
    subjonctif: {
      baseRuleHint: 'use stem doiv- + e/es/e/ions/iez/ent. note: use dev- in nous and vous forms',
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
    conditional: {
      baseRuleHint: 'use stem devr- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'devrais' },
        tu: { value: 'devrais' },
        elle: { value: 'devrait' },
        nous: { value: 'devrions' },
        vous: { value: 'devriez' },
        elles: { value: 'devraient' },
      },
    },
  },
};
