import { Verb } from '../Models/verb';

export const seReunir: Verb = {
  infinitive: 'se réunir',
  english: 'to meet / to gather',
  isReflexive: true,
  usesAvoirAuxiliaryInPasseCompose: false,
  group: 'ir',
  pastParticiple: 'réuni',
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
    conditional: {
      baseRuleHint: 'use infinitive + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'me réunirais' },
        tu: { value: 'te réunirais' },
        elle: { value: 'se réunirait' },
        nous: { value: 'nous réunirions' },
        vous: { value: 'vous réuniriez' },
        elles: { value: 'se réuniraient' },
      },
    },
  },
};
