import { Verb } from '../Models/verb';

export const cuisiner: Verb = {
  infinitive: 'cuisiner',
  english: 'to cook',
  group: 'er',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  pastParticiple: 'cuisiné',
  tenses: {
    present: {
      baseRuleHint: 'remove -er and add e/es/e/ons/ez/ent',
      conjugations: {
        je: { value: 'cuisine' },
        tu: { value: 'cuisines' },
        elle: { value: 'cuisine' },
        nous: { value: 'cuisinons' },
        vous: { value: 'cuisinez' },
        elles: { value: 'cuisinent' },
      },
    },

    imparfait: {
      baseRuleHint: 'use stem cuisin- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'cuisinais' },
        tu: { value: 'cuisinais' },
        elle: { value: 'cuisinait' },
        nous: { value: 'cuisinions' },
        vous: { value: 'cuisiniez' },
        elles: { value: 'cuisinaient' },
      },
    },

    future: {
      baseRuleHint: 'use infinitive + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'cuisinerai' },
        tu: { value: 'cuisineras' },
        elle: { value: 'cuisinera' },
        nous: { value: 'cuisinerons' },
        vous: { value: 'cuisinerez' },
        elles: { value: 'cuisineront' },
      },
    },

    subjonctif: {
      baseRuleHint: 'use stem cuisin- + e/es/e/ions/iez/ent',
      conjugations: {
        je: { value: 'cuisine' },
        tu: { value: 'cuisines' },
        elle: { value: 'cuisine' },
        nous: { value: 'cuisinions' },
        vous: { value: 'cuisiniez' },
        elles: { value: 'cuisinent' },
      },
    },
    conditional: {
      baseRuleHint: 'use infinitive + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'cuisinerais' },
        tu: { value: 'cuisinerais' },
        elle: { value: 'cuisinerait' },
        nous: { value: 'cuisinerions' },
        vous: { value: 'cuisineriez' },
        elles: { value: 'cuisineraient' },
      },
    },
  },
};
