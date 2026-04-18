import { Verb } from '../Models/verb';

export const voir: Verb = {
  infinitive: 'voir',
  english: 'to see',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'irregular',
  pastParticiple: 'vu',
  tenses: {
    present: {
      baseRuleHint: 'irregular present forms (vois/vois/voit/voyons/voyez/voient)',
      conjugations: {
        je: { value: 'vois', isIrregular: true },
        tu: { value: 'vois', isIrregular: true },
        elle: { value: 'voit', isIrregular: true },
        nous: { value: 'voyons', isIrregular: true },
        vous: { value: 'voyez', isIrregular: true },
        elles: { value: 'voient', isIrregular: true },
      },
    },
    imparfait: {
      baseRuleHint: 'use stem voy- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'voyais' },
        tu: { value: 'voyais' },
        elle: { value: 'voyait' },
        nous: { value: 'voyions' },
        vous: { value: 'voyiez' },
        elles: { value: 'voyaient' },
      },
    },
    future: {
      irregularStemHint: 'use stem verr- + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'verrai', isIrregular: true },
        tu: { value: 'verras', isIrregular: true },
        elle: { value: 'verra', isIrregular: true },
        nous: { value: 'verrons', isIrregular: true },
        vous: { value: 'verrez', isIrregular: true },
        elles: { value: 'verront', isIrregular: true },
      },
    },

    subjonctif: {
      baseRuleHint: 'use stem voi- + e/es/e/ions/iez/ent (note nous/vous use voy- stem)',
      conjugations: {
        je: { value: 'voie', isIrregular: true },
        tu: { value: 'voies', isIrregular: true },
        elle: { value: 'voie', isIrregular: true },
        nous: { value: 'voyions' },
        vous: { value: 'voyiez' },
        elles: { value: 'voient', isIrregular: true },
      },
    },
    conditional: {
      baseRuleHint: 'use stem verr- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'verrais' },
        tu: { value: 'verrais' },
        elle: { value: 'verrait' },
        nous: { value: 'verrions' },
        vous: { value: 'verriez' },
        elles: { value: 'verraient' },
      },
    },
  },
};
