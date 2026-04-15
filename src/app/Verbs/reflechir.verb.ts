import { Verb } from '../Models/verb';

export const reflechir: Verb = {
  infinitive: 'réfléchir',
  english: 'to think / to reflect',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'ir',
  tenses: {
    present: {
      baseRuleHint: 'use stem réfléch- + is/is/it/issons/issez/issent',
      conjugations: {
        je: { value: 'réfléchis' },
        tu: { value: 'réfléchis' },
        elle: { value: 'réfléchit' },
        nous: { value: 'réfléchissons' },
        vous: { value: 'réfléchissez' },
        elles: { value: 'réfléchissent' },
      },
    },
    imparfait: {
      baseRuleHint: 'use stem réfléchiss- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'réfléchissais' },
        tu: { value: 'réfléchissais' },
        elle: { value: 'réfléchissait' },
        nous: { value: 'réfléchissions' },
        vous: { value: 'réfléchissiez' },
        elles: { value: 'réfléchissaient' },
      },
    },
    future: {
      baseRuleHint: 'use infinitive (réfléchir) + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'réfléchirai' },
        tu: { value: 'réfléchiras' },
        elle: { value: 'réfléchira' },
        nous: { value: 'réfléchirons' },
        vous: { value: 'réfléchirez' },
        elles: { value: 'réfléchiront' },
      },
    },
    passeCompose: {
      baseRuleHint: 'present tense avoir + past participle (réfléchi)',
      conjugations: {
        je: { value: 'ai réfléchi' },
        tu: { value: 'as réfléchi' },
        elle: { value: 'a réfléchi' },
        nous: { value: 'avons réfléchi' },
        vous: { value: 'avez réfléchi' },
        elles: { value: 'ont réfléchi' },
      },
    },
    subjonctif: {
      baseRuleHint: 'use stem réfléchiss- + e/es/e/ions/iez/ent',
      conjugations: {
        je: { value: 'réfléchisse' },
        tu: { value: 'réfléchisses' },
        elle: { value: 'réfléchisse' },
        nous: { value: 'réfléchissions' },
        vous: { value: 'réfléchissiez' },
        elles: { value: 'réfléchissent' },
      },
    },
  },
};
