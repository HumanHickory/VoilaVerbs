import { Verb } from '../Models/verb';

export const reussir: Verb = {
  infinitive: 'réussir',
  english: 'to succeed',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'ir',
  pastParticiple: 'réussi',

  tenses: {
    present: {
      baseRuleHint: 'use stem réuss- + is/is/it/issons/issez/issent',
      conjugations: {
        je: { value: 'réussis' },
        tu: { value: 'réussis' },
        elle: { value: 'réussit' },
        nous: { value: 'réussissons' },
        vous: { value: 'réussissez' },
        elles: { value: 'réussissent' },
      },
    },
    imparfait: {
      baseRuleHint: 'use stem réussiss- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'réussissais' },
        tu: { value: 'réussissais' },
        elle: { value: 'réussissait' },
        nous: { value: 'réussissions' },
        vous: { value: 'réussissiez' },
        elles: { value: 'réussissaient' },
      },
    },
    future: {
      baseRuleHint: 'use infinitive (réussir) + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'réussirai' },
        tu: { value: 'réussiras' },
        elle: { value: 'réussira' },
        nous: { value: 'réussirons' },
        vous: { value: 'réussirez' },
        elles: { value: 'réussiront' },
      },
    },
    subjonctif: {
      baseRuleHint: 'use stem réussiss- + e/es/e/ions/iez/ent',
      conjugations: {
        je: { value: 'réussisse' },
        tu: { value: 'réussisses' },
        elle: { value: 'réussisse' },
        nous: { value: 'réussissions' },
        vous: { value: 'réussissiez' },
        elles: { value: 'réussissent' },
      },
    },
  },
};
