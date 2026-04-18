import { Verb } from '../Models/verb';

export const manger: Verb = {
  infinitive: 'manger',
  english: 'to eat',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'er',
  pastParticiple: 'mangé',

  tenses: {
    present: {
      baseRuleHint: 'use stem mang- + e/es/e/eons/ez/ent',
      conjugations: {
        je: { value: 'mange' },
        tu: { value: 'manges' },
        elle: { value: 'mange' },
        nous: { value: 'mangeons', isIrregular: true },
        vous: { value: 'mangez' },
        elles: { value: 'mangent' },
      },
    },
    imparfait: {
      baseRuleHint: 'use stem mange- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'mangeais', isIrregular: true },
        tu: { value: 'mangeais', isIrregular: true },
        elle: { value: 'mangeait', isIrregular: true },
        nous: { value: 'mangions' },
        vous: { value: 'mangiez' },
        elles: { value: 'mangeaient', isIrregular: true },
      },
    },
    future: {
      baseRuleHint: 'use infinitive (manger) + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'mangerai' },
        tu: { value: 'mangeras' },
        elle: { value: 'mangera' },
        nous: { value: 'mangerons' },
        vous: { value: 'mangerez' },
        elles: { value: 'mangeront' },
      },
    },

    subjonctif: {
      baseRuleHint: 'use stem mang- + e/es/e/ions/iez/ent',
      conjugations: {
        je: { value: 'mange' },
        tu: { value: 'manges' },
        elle: { value: 'mange' },
        nous: { value: 'mangions' },
        vous: { value: 'mangiez' },
        elles: { value: 'mangent' },
      },
    },
    conditional: {
      baseRuleHint: 'use infinitive + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'mangerais' },
        tu: { value: 'mangerais' },
        elle: { value: 'mangerait' },
        nous: { value: 'mangerions' },
        vous: { value: 'mangeriez' },
        elles: { value: 'mangeraient' },
      },
    },
  },
};
