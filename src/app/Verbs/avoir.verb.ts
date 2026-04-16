import { Verb } from '../Models/verb';

export const avoir: Verb = {
  infinitive: 'avoir',
  english: 'to have',
  isReflexive: false,
  usesAvoirAuxiliaryInPasseCompose: true,
  group: 'irregular',
  pastParticiple: 'eu',
  tenses: {
    present: {
      isFullyIrregular: true,
      baseRuleHint: 'irregular present forms (ai/as/a/avons/avez/ont)',
      conjugations: {
        je: { value: 'ai', isIrregular: true },
        tu: { value: 'as', isIrregular: true },
        elle: { value: 'a', isIrregular: true },
        nous: { value: 'avons', isIrregular: true },
        vous: { value: 'avez', isIrregular: true },
        elles: { value: 'ont', isIrregular: true },
      },
    },
    imparfait: {
      baseRuleHint: 'use stem av- + ais/ais/ait/ions/iez/aient',
      isFullyIrregular: true,
      conjugations: {
        je: { value: 'avais', isIrregular: true },
        tu: { value: 'avais', isIrregular: true },
        elle: { value: 'avait', isIrregular: true },
        nous: { value: 'avions', isIrregular: true },
        vous: { value: 'aviez', isIrregular: true },
        elles: { value: 'avaient', isIrregular: true },
      },
    },
    future: {
      baseRuleHint: 'use stem aur- + ai/as/a/ons/ez/ont',
      isFullyIrregular: true,
      conjugations: {
        je: { value: 'aurai', isIrregular: true },
        tu: { value: 'auras', isIrregular: true },
        elle: { value: 'aura', isIrregular: true },
        nous: { value: 'aurons', isIrregular: true },
        vous: { value: 'aurez', isIrregular: true },
        elles: { value: 'auront', isIrregular: true },
      },
    },
    subjonctif: {
      baseRuleHint: 'use stem ai- + e/es/e/ions/iez/ent',
      isFullyIrregular: true,
      conjugations: {
        je: { value: 'aie', isIrregular: true },
        tu: { value: 'aies', isIrregular: true },
        elle: { value: 'ait', isIrregular: true },
        nous: { value: 'ayons', isIrregular: true },
        vous: { value: 'ayez', isIrregular: true },
        elles: { value: 'aient', isIrregular: true },
      },
    },
  },
};
