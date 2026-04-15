import { Verb } from '../Models/verb';

export const connaitre: Verb = {
  infinitive: 'connaître',
  english: 'to know',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'irregular',
  tenses: {
    present: {
      baseRuleHint: 'use stem conna- + is/is/ît/issons/issez/issent',
      conjugations: {
        je: { value: 'connais', isIrregular: true },
        tu: { value: 'connais', isIrregular: true },
        elle: { value: 'connaît', isIrregular: true },
        nous: { value: 'connaissons' },
        vous: { value: 'connaissez' },
        elles: { value: 'connaissent', isIrregular: true },
      },
    },
    imparfait: {
      baseRuleHint: 'use stem connaiss- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'connaissais' },
        tu: { value: 'connaissais' },
        elle: { value: 'connaissait' },
        nous: { value: 'connaissions' },
        vous: { value: 'connaissiez' },
        elles: { value: 'connaissaient' },
      },
    },
    future: {
      baseRuleHint: 'use stem connaîtr- + ai/as/a/ons/ez/ont',
      conjugations: {
        je: { value: 'connaîtrai', isIrregular: true },
        tu: { value: 'connaîtras', isIrregular: true },
        elle: { value: 'connaîtra', isIrregular: true },
        nous: { value: 'connaîtrons', isIrregular: true },
        vous: { value: 'connaîtrez', isIrregular: true },
        elles: { value: 'connaîtront', isIrregular: true },
      },
    },
    passeCompose: {
      baseRuleHint: 'present tense avoir + past participle (connu)',
      conjugations: {
        je: { value: 'ai connu', isIrregular: true },
        tu: { value: 'as connu', isIrregular: true },
        elle: { value: 'a connu', isIrregular: true },
        nous: { value: 'avons connu', isIrregular: true },
        vous: { value: 'avez connu', isIrregular: true },
        elles: { value: 'ont connu', isIrregular: true },
      },
    },
    subjonctif: {
      baseRuleHint: 'use stem connaiss- + e/es/e/ions/iez/ent',
      conjugations: {
        je: { value: 'connaisse', isIrregular: true },
        tu: { value: 'connaisses', isIrregular: true },
        elle: { value: 'connaisse', isIrregular: true },
        nous: { value: 'connaissions' },
        vous: { value: 'connaissiez' },
        elles: { value: 'connaissent', isIrregular: true },
      },
    },
  },
};
