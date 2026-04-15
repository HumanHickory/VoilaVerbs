import { Verb } from '../Models/verb';

export const etre: Verb = {
  infinitive: 'être',
  english: 'to be',
  group: 'irregular',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: false,

  tenses: {
    present: {
      isFullyIrregular: true,
      baseRuleHint: 'irregular present forms (suis/es/est/sommes/êtes/sont)',
      conjugations: {
        je: { value: 'suis', isIrregular: true },
        tu: { value: 'es', isIrregular: true },
        elle: { value: 'est', isIrregular: true },
        nous: { value: 'sommes', isIrregular: true },
        vous: { value: 'êtes', isIrregular: true },
        elles: { value: 'sont', isIrregular: true },
      },
    },

    imparfait: {
      baseRuleHint: 'use stem ét- + ais/ais/ait/ions/iez/aient',
      irregularStemHint: "use stem 'ét-'",
      isFullyIrregular: true,
      conjugations: {
        je: { value: 'étais', isIrregular: true },
        tu: { value: 'étais', isIrregular: true },
        elle: { value: 'était', isIrregular: true },
        nous: { value: 'étions', isIrregular: true },
        vous: { value: 'étiez', isIrregular: true },
        elles: { value: 'étaient', isIrregular: true },
      },
    },

    future: {
      baseRuleHint: 'use stem ser- + ai/as/a/ons/ez/ont',
      isFullyIrregular: true,
      conjugations: {
        je: { value: 'serai', isIrregular: true },
        tu: { value: 'seras', isIrregular: true },
        elle: { value: 'sera', isIrregular: true },
        nous: { value: 'serons', isIrregular: true },
        vous: { value: 'serez', isIrregular: true },
        elles: { value: 'seront', isIrregular: true },
      },
    },

    passeCompose: {
      isFullyIrregular: true,
      baseRuleHint: 'present tense avoir + past participle (été)',
      conjugations: {
        je: { value: 'ai été', isIrregular: true },
        tu: { value: 'as été', isIrregular: true },
        elle: { value: 'a été', isIrregular: true },
        nous: { value: 'avons été', isIrregular: true },
        vous: { value: 'avez été', isIrregular: true },
        elles: { value: 'ont été', isIrregular: true },
      },
    },

    subjonctif: {
      isFullyIrregular: true,
      baseRuleHint: 'use stem soi- or soy-',
      conjugations: {
        je: { value: 'sois', isIrregular: true },
        tu: { value: 'sois', isIrregular: true },
        elle: { value: 'soit', isIrregular: true },
        nous: { value: 'soyons', isIrregular: true },
        vous: { value: 'soyez', isIrregular: true },
        elles: { value: 'soient', isIrregular: true },
      },
    },
  },
};
