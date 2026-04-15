import { Verb } from '../Models/verb';

export const manger: Verb = {
  infinitive: 'manger',
  english: 'to eat',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'er',
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
    passeCompose: {
      baseRuleHint: 'present tense avoir + past participle (mangé)',
      conjugations: {
        je: { value: 'ai mangé' },
        tu: { value: 'as mangé' },
        elle: { value: 'a mangé' },
        nous: { value: 'avons mangé' },
        vous: { value: 'avez mangé' },
        elles: { value: 'ont mangé' },
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
  },
};
