import { Verb } from '../Models/verb';

export const seLever: Verb = {
  infinitive: 'se lever',
  english: 'to get up',
  group: 'er',
  isReflexive: true,
  usesAvoirAuxiliaryInPasseCompose: false,
  pastParticiple: 'levé',

  tenses: {
    present: {
      baseRuleHint: 'reflexive pronoun + stem lev- + e/es/e/ons/ez/ent',
      conjugations: {
        je: { value: 'me lève', isIrregular: true },
        tu: { value: 'te lèves', isIrregular: true },
        elle: { value: 'se lève', isIrregular: true },
        nous: { value: 'nous levons' },
        vous: { value: 'vous levez' },
        elles: { value: 'se lèvent', isIrregular: true },
      },
    },

    imparfait: {
      baseRuleHint: 'reflexive pronoun + use stem lev- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'me levais' },
        tu: { value: 'te levais' },
        elle: { value: 'se levait' },
        nous: { value: 'nous levions' },
        vous: { value: 'vous leviez' },
        elles: { value: 'se levaient' },
      },
    },

    future: {
      baseRuleHint: 'reflexive pronoun + infinitive (lever) + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'me lèverai', isIrregular: true },
        tu: { value: 'te lèveras', isIrregular: true },
        elle: { value: 'se lèvera', isIrregular: true },
        nous: { value: 'nous lèverons', isIrregular: true },
        vous: { value: 'vous lèverez', isIrregular: true },
        elles: { value: 'se lèveront', isIrregular: true },
      },
    },

    subjonctif: {
      baseRuleHint: 'reflexive pronoun + stem lev- + e/es/e/ions/iez/ent',
      conjugations: {
        je: { value: 'me lève', isIrregular: true },
        tu: { value: 'te lèves', isIrregular: true },
        elle: { value: 'se lève', isIrregular: true },
        nous: { value: 'nous levions' },
        vous: { value: 'vous leviez' },
        elles: { value: 'se lèvent', isIrregular: true },
      },
    },
    conditional: {
      baseRuleHint: 'use stem lèver- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'me lèverais' },
        tu: { value: 'te lèverais' },
        elle: { value: 'se lèverait' },
        nous: { value: 'nous lèverions' },
        vous: { value: 'vous lèveriez' },
        elles: { value: 'se lèveraient' },
      },
    },
  },
};
