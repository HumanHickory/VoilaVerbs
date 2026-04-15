import { Verb } from '../Models/verb';

export const seReunir: Verb = {
  infinitive: 'se réunir',
  english: 'to meet / to gather',
  isReflexive: true,
  usesAvoirAuxiliaryInPasseCompose: false,
  group: 'ir',
  tenses: {
    present: {
      baseRuleHint: 'reflexive pronoun + use stem réun- + is/is/it/issons/issez/issent',
      conjugations: {
        je: { value: 'me réunis' },
        tu: { value: 'te réunis' },
        elle: { value: 'se réunit' },
        nous: { value: 'nous réunissons' },
        vous: { value: 'vous réunissez' },
        elles: { value: 'se réunissent' },
      },
    },
    imparfait: {
      baseRuleHint: 'reflexive pronoun + use stem réuniss- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'me réunissais' },
        tu: { value: 'te réunissais' },
        elle: { value: 'se réunissait' },
        nous: { value: 'nous réunissions' },
        vous: { value: 'vous réunissiez' },
        elles: { value: 'se réunissaient' },
      },
    },
    future: {
      baseRuleHint: 'reflexive pronoun + infinitive (réunir) + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'me réunirai' },
        tu: { value: 'te réuniras' },
        elle: { value: 'se réunira' },
        nous: { value: 'nous réunirons' },
        vous: { value: 'vous réunirez' },
        elles: { value: 'se réuniront' },
      },
    },
    passeCompose: {
      baseRuleHint: 'reflexive pronoun + present tense être + past participle (réuni)',
      conjugations: {
        je: { value: 'me suis réunie', isIrregular: true },
        tu: { value: 't’es réunie', isIrregular: true },
        elle: { value: 's’est réunie', isIrregular: true },
        nous: { value: 'nous sommes réunies', isIrregular: true },
        vous: { value: 'vous êtes réunies', isIrregular: true },
        elles: { value: 'se sont réunies', isIrregular: true },
      },
    },
    subjonctif: {
      baseRuleHint: 'reflexive pronoun + stem réuniss- + e/es/e/ions/iez/ent',
      conjugations: {
        je: { value: 'me réunisse' },
        tu: { value: 'te réunisses' },
        elle: { value: 'se réunisse' },
        nous: { value: 'nous réunissions' },
        vous: { value: 'vous réunissiez' },
        elles: { value: 'se réunissent' },
      },
    },
  },
};
