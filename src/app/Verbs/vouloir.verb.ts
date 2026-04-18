import { Verb } from '../Models/verb';

export const vouloir: Verb = {
  infinitive: 'vouloir',
  english: 'to want',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'irregular',
  pastParticiple: 'voulu',
  tenses: {
    present: {
      baseRuleHint: 'irregular present (veux/veux/veut/voulons/voulez/veulent)',
      conjugations: {
        je: { value: 'veux', isIrregular: true },
        tu: { value: 'veux', isIrregular: true },
        elle: { value: 'veut', isIrregular: true },
        nous: { value: 'voulons', isIrregular: true },
        vous: { value: 'voulez', isIrregular: true },
        elles: { value: 'veulent', isIrregular: true },
      },
    },

    imparfait: {
      baseRuleHint: 'use stem voul- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'voulais' },
        tu: { value: 'voulais' },
        elle: { value: 'voulait' },
        nous: { value: 'voulions' },
        vous: { value: 'vouliez' },
        elles: { value: 'voulaient' },
      },
    },

    future: {
      irregularStemHint: 'use stem voudr- + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'voudrai', isIrregular: true },
        tu: { value: 'voudras', isIrregular: true },
        elle: { value: 'voudra', isIrregular: true },
        nous: { value: 'voudrons', isIrregular: true },
        vous: { value: 'voudrez', isIrregular: true },
        elles: { value: 'voudront', isIrregular: true },
      },
    },

    subjonctif: {
      baseRuleHint: 'use stem veuill- / voul-',
      conjugations: {
        je: { value: 'veuille', isIrregular: true },
        tu: { value: 'veuilles', isIrregular: true },
        elle: { value: 'veuille', isIrregular: true },
        nous: { value: 'voulions' },
        vous: { value: 'vouliez' },
        elles: { value: 'veuillent', isIrregular: true },
      },
    },

    conditional: {
      baseRuleHint: 'use stem voudr- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'voudrais' },
        tu: { value: 'voudrais' },
        elle: { value: 'voudrait' },
        nous: { value: 'voudrions' },
        vous: { value: 'voudriez' },
        elles: { value: 'voudraient' },
      },
    },
  },
};
