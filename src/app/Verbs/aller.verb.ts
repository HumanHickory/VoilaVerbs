import { Verb } from '../Models/verb';

export const aller: Verb = {
  infinitive: 'aller',
  english: 'to go',
  group: 'irregular',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: false,

  tenses: {
    present: {
      isFullyIrregular: true,
      baseRuleHint: 'use stem va- or -all',
      conjugations: {
        je: { value: 'vais', isIrregular: true },
        tu: { value: 'vas', isIrregular: true },
        elle: { value: 'va', isIrregular: true },
        nous: { value: 'allons', isIrregular: true },
        vous: { value: 'allez', isIrregular: true },
        elles: { value: 'vont', isIrregular: true },
      },
    },

    imparfait: {
      baseRuleHint: 'use stem all- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'allais' },
        tu: { value: 'allais' },
        elle: { value: 'allait' },
        nous: { value: 'allions' },
        vous: { value: 'alliez' },
        elles: { value: 'allaient' },
      },
    },

    future: {
      baseRuleHint: 'use stem ir- + ai/as/a/ons/ez/ont',
      isFullyIrregular: true,
      conjugations: {
        je: { value: 'irai', isIrregular: true },
        tu: { value: 'iras', isIrregular: true },
        elle: { value: 'ira', isIrregular: true },
        nous: { value: 'irons', isIrregular: true },
        vous: { value: 'irez', isIrregular: true },
        elles: { value: 'iront', isIrregular: true },
      },
    },

    passeCompose: {
      baseRuleHint: 'present tense etre + past participle (allé)',
      isFullyIrregular: true,
      conjugations: {
        je: { value: 'suis allée', isIrregular: true },
        tu: { value: 'es allée', isIrregular: true },
        elle: { value: 'est allée', isIrregular: true },
        nous: { value: 'sommes allées', isIrregular: true },
        vous: { value: 'êtes allées', isIrregular: true },
        elles: { value: 'sont allées', isIrregular: true },
      },
    },

    subjonctif: {
      baseRuleHint: 'use stem aill- + e/es/e/ions/iez/ent',
      isFullyIrregular: true,
      conjugations: {
        je: { value: 'aille', isIrregular: true },
        tu: { value: 'ailles', isIrregular: true },
        elle: { value: 'aille', isIrregular: true },
        nous: { value: 'allions', isIrregular: true },
        vous: { value: 'alliez', isIrregular: true },
        elles: { value: 'aillent', isIrregular: true },
      },
    },
  },
};
