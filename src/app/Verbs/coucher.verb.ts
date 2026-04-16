import { Verb } from '../Models/verb';

export const seCoucher: Verb = {
  infinitive: 'se coucher',
  english: 'to go to bed',
  isReflexive: true,
  usesAvoirAuxiliaryInPasseCompose: false,
  group: 'er',
  pastParticiple: 'couché',

  tenses: {
    present: {
      baseRuleHint: 'reflexive pronoun + stem couch- + e/es/e/ons/ez/ent',
      conjugations: {
        je: { value: 'me couche' },
        tu: { value: 'te couches' },
        elle: { value: 'se couche' },
        nous: { value: 'nous couchons' },
        vous: { value: 'vous couchez' },
        elles: { value: 'se couchent' },
      },
    },
    imparfait: {
      baseRuleHint: 'reflexive pronoun + use stem couch- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'me couchais' },
        tu: { value: 'te couchais' },
        elle: { value: 'se couchait' },
        nous: { value: 'nous couchions' },
        vous: { value: 'vous couchiez' },
        elles: { value: 'se couchaient' },
      },
    },
    future: {
      baseRuleHint: 'reflexive pronoun + infinitive (coucher) + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'me coucherai' },
        tu: { value: 'te coucheras' },
        elle: { value: 'se couchera' },
        nous: { value: 'nous coucherons' },
        vous: { value: 'vous coucherez' },
        elles: { value: 'se coucheront' },
      },
    },
    subjonctif: {
      baseRuleHint: 'reflexive pronoun +  use stem couch- + e/es/e/ions/iez/ent',
      conjugations: {
        je: { value: 'me couche' },
        tu: { value: 'te couches' },
        elle: { value: 'se couche' },
        nous: { value: 'nous couchions' },
        vous: { value: 'vous couchiez' },
        elles: { value: 'se couchent' },
      },
    },
  },
};
