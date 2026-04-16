import { Verb } from '../Models/verb';

export const parler: Verb = {
  infinitive: 'parler',
  english: 'to speak',
  group: 'er',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  pastParticiple: 'parlé',

  tenses: {
    present: {
      baseRuleHint: 'use stem parl- + e/es/e/ons/ez/ent',
      conjugations: {
        je: { value: 'parle' },
        tu: { value: 'parles' },
        elle: { value: 'parle' },
        nous: { value: 'parlons' },
        vous: { value: 'parlez' },
        elles: { value: 'parlent' },
      },
    },

    imparfait: {
      baseRuleHint: 'use stem parl- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'parlais' },
        tu: { value: 'parlais' },
        elle: { value: 'parlait' },
        nous: { value: 'parlions' },
        vous: { value: 'parliez' },
        elles: { value: 'parlaient' },
      },
    },

    future: {
      baseRuleHint: 'use infinitive (parler) + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'parlerai' },
        tu: { value: 'parleras' },
        elle: { value: 'parlera' },
        nous: { value: 'parlerons' },
        vous: { value: 'parlerez' },
        elles: { value: 'parleront' },
      },
    },

    subjonctif: {
      baseRuleHint: 'use stem parl- + e/es/e/ions/iez/ent',
      conjugations: {
        je: { value: 'parle' },
        tu: { value: 'parles' },
        elle: { value: 'parle' },
        nous: { value: 'parlions' },
        vous: { value: 'parliez' },
        elles: { value: 'parlent' },
      },
    },
  },
};
