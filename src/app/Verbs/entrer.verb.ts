import { Verb } from '../Models/verb';

export const entrer: Verb = {
  infinitive: 'entrer',
  english: 'to enter',
  group: 'er',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: false,
  pastParticiple: 'entré',
  tenses: {
    present: {
      baseRuleHint: 'remove -er and add e/es/e/ons/ez/ent',
      conjugations: {
        je: { value: 'entre' },
        tu: { value: 'entres' },
        elle: { value: 'entre' },
        nous: { value: 'entrons' },
        vous: { value: 'entrez' },
        elles: { value: 'entrent' },
      },
    },

    imparfait: {
      baseRuleHint: 'use stem entr- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'entrais' },
        tu: { value: 'entrais' },
        elle: { value: 'entrait' },
        nous: { value: 'entrions' },
        vous: { value: 'entriez' },
        elles: { value: 'entraient' },
      },
    },

    future: {
      baseRuleHint: 'use infinitive + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'entrerai' },
        tu: { value: 'entreras' },
        elle: { value: 'entrera' },
        nous: { value: 'entrerons' },
        vous: { value: 'entrerez' },
        elles: { value: 'entreront' },
      },
    },

    subjonctif: {
      baseRuleHint: 'use stem entr- + e/es/e/ions/iez/ent',
      conjugations: {
        je: { value: 'entre' },
        tu: { value: 'entres' },
        elle: { value: 'entre' },
        nous: { value: 'entrions' },
        vous: { value: 'entriez' },
        elles: { value: 'entrent' },
      },
    },
    conditional: {
      baseRuleHint: 'use infinitive + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'entrerais' },
        tu: { value: 'entrerais' },
        elle: { value: 'entrerait' },
        nous: { value: 'entrerions' },
        vous: { value: 'entreriez' },
        elles: { value: 'entreraient' },
      },
    },
  },
};
