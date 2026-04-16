import { Verb } from '../Models/verb';

export const faire: Verb = {
  infinitive: 'faire',
  english: 'to do / to make',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'irregular',
  pastParticiple: 'fait',

  tenses: {
    present: {
      isFullyIrregular: true,
      baseRuleHint: 'irregular present forms (fais/fais/fait/faisons/faites/font)',
      conjugations: {
        je: { value: 'fais', isIrregular: true },
        tu: { value: 'fais', isIrregular: true },
        elle: { value: 'fait', isIrregular: true },
        nous: { value: 'faisons', isIrregular: true },
        vous: { value: 'faites', isIrregular: true },
        elles: { value: 'font', isIrregular: true },
      },
    },
    imparfait: {
      baseRuleHint: 'use stem fais- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'faisais' },
        tu: { value: 'faisais' },
        elle: { value: 'faisait' },
        nous: { value: 'faisions' },
        vous: { value: 'faisiez' },
        elles: { value: 'faisaient' },
      },
    },
    future: {
      baseRuleHint: 'use stem fer-+ ai/as/a/ons/ez/ont',
      isFullyIrregular: true,
      conjugations: {
        je: { value: 'ferai', isIrregular: true },
        tu: { value: 'feras', isIrregular: true },
        elle: { value: 'fera', isIrregular: true },
        nous: { value: 'ferons', isIrregular: true },
        vous: { value: 'ferez', isIrregular: true },
        elles: { value: 'feront', isIrregular: true },
      },
    },

    subjonctif: {
      baseRuleHint: 'use stem fass- + e/es/e/ions/iez/ent',
      isFullyIrregular: true,
      conjugations: {
        je: { value: 'fasse', isIrregular: true },
        tu: { value: 'fasses', isIrregular: true },
        elle: { value: 'fasse', isIrregular: true },
        nous: { value: 'fassions', isIrregular: true },
        vous: { value: 'fassiez', isIrregular: true },
        elles: { value: 'fassent', isIrregular: true },
      },
    },
  },
};
