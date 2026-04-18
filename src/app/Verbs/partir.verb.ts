import { Verb } from '../Models/verb';

export const partir: Verb = {
  infinitive: 'partir',
  english: 'to leave',
  group: 'irregular',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: false,
  pastParticiple: 'parti',
  tenses: {
    present: {
      isFullyIrregular: true,
      baseRuleHint: 'use stem part- / partons / partez',
      conjugations: {
        je: { value: 'pars', isIrregular: true },
        tu: { value: 'pars', isIrregular: true },
        elle: { value: 'part', isIrregular: true },
        nous: { value: 'partons', isIrregular: true },
        vous: { value: 'partez', isIrregular: true },
        elles: { value: 'partent', isIrregular: true },
      },
    },

    imparfait: {
      baseRuleHint: 'use stem part- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'partais' },
        tu: { value: 'partais' },
        elle: { value: 'partait' },
        nous: { value: 'partions' },
        vous: { value: 'partiez' },
        elles: { value: 'partaient' },
      },
    },

    future: {
      baseRuleHint: 'use infinitive + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'partirai' },
        tu: { value: 'partiras' },
        elle: { value: 'partira' },
        nous: { value: 'partirons' },
        vous: { value: 'partirez' },
        elles: { value: 'partiront' },
      },
    },

    subjonctif: {
      isFullyIrregular: true,
      baseRuleHint: 'use stem part- / partions / partiez',
      conjugations: {
        je: { value: 'parte', isIrregular: true },
        tu: { value: 'partes', isIrregular: true },
        elle: { value: 'parte', isIrregular: true },
        nous: { value: 'partions', isIrregular: true },
        vous: { value: 'partiez', isIrregular: true },
        elles: { value: 'partent', isIrregular: true },
      },
    },
    conditional: {
      baseRuleHint: 'use infinitive + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'partirais' },
        tu: { value: 'partirais' },
        elle: { value: 'partirait' },
        nous: { value: 'partirions' },
        vous: { value: 'partiriez' },
        elles: { value: 'partiraient' },
      },
    },
  },
};
