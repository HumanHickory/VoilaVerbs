import { Verb } from '../Models/verb';

export const venir: Verb = {
  infinitive: 'venir',
  english: 'to come',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: false,
  group: 'irregular',
  pastParticiple: 'venu',
  tenses: {
    present: {
      isFullyIrregular: true,
      baseRuleHint: 'irregular present forms (viens/viens/vient/venons/venez/viennent)',
      conjugations: {
        je: { value: 'viens', isIrregular: true },
        tu: { value: 'viens', isIrregular: true },
        elle: { value: 'vient', isIrregular: true },
        nous: { value: 'venons', isIrregular: true },
        vous: { value: 'venez', isIrregular: true },
        elles: { value: 'viennent', isIrregular: true },
      },
    },
    imparfait: {
      baseRuleHint: 'use stem ven- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'venais' },
        tu: { value: 'venais' },
        elle: { value: 'venait' },
        nous: { value: 'venions' },
        vous: { value: 'veniez' },
        elles: { value: 'venaient' },
      },
    },
    future: {
      irregularStemHint: 'use stem viendr- + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'viendrai', isIrregular: true },
        tu: { value: 'viendras', isIrregular: true },
        elle: { value: 'viendra', isIrregular: true },
        nous: { value: 'viendrons', isIrregular: true },
        vous: { value: 'viendrez', isIrregular: true },
        elles: { value: 'viendront', isIrregular: true },
      },
    },

    subjonctif: {
      baseRuleHint: 'use stem vienn- + e/es/e/ions/iez/ent (note nous/vous use ven- stem)',
      isFullyIrregular: true,
      conjugations: {
        je: { value: 'vienne', isIrregular: true },
        tu: { value: 'viennes', isIrregular: true },
        elle: { value: 'vienne', isIrregular: true },
        nous: { value: 'venions', isIrregular: true },
        vous: { value: 'veniez', isIrregular: true },
        elles: { value: 'viennent', isIrregular: true },
      },
    },
  },
};
