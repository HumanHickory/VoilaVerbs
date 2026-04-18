import { Verb } from '../Models/verb';

export const sAsseoir: Verb = {
  infinitive: "s'asseoir",
  english: 'to sit down',
  group: 'irregular',
  isReflexive: true,
  usesAvoirAuxiliaryInPasseCompose: false,
  pastParticiple: 'assis',
  tenses: {
    present: {
      isFullyIrregular: true,
      baseRuleHint: 'use stem assied- / assey-',
      conjugations: {
        je: { value: "m'assieds", isIrregular: true },
        tu: { value: "t'assieds", isIrregular: true },
        elle: { value: "s'assied", isIrregular: true },
        nous: { value: 'nous asseyons', isIrregular: true },
        vous: { value: 'vous asseyez', isIrregular: true },
        elles: { value: "s'asseyent", isIrregular: true },
      },
    },

    imparfait: {
      baseRuleHint: 'use stem assey- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: "m'asseyais", isIrregular: true },
        tu: { value: "t'asseyais", isIrregular: true },
        elle: { value: "s'asseyait", isIrregular: true },
        nous: { value: 'nous asseyions', isIrregular: true },
        vous: { value: 'vous asseyiez', isIrregular: true },
        elles: { value: "s'asseyaient", isIrregular: true },
      },
    },

    future: {
      isFullyIrregular: true,
      baseRuleHint: 'use stem assiér-',
      conjugations: {
        je: { value: "m'assiérai", isIrregular: true },
        tu: { value: "t'assiéras", isIrregular: true },
        elle: { value: "s'assiéra", isIrregular: true },
        nous: { value: 'nous assiérons', isIrregular: true },
        vous: { value: 'vous assiérez', isIrregular: true },
        elles: { value: "s'assiéront", isIrregular: true },
      },
    },

    subjonctif: {
      isFullyIrregular: true,
      baseRuleHint: 'use stem assey- / asseyions / asseyiez',
      conjugations: {
        je: { value: "m'asseye", isIrregular: true },
        tu: { value: "t'asseyes", isIrregular: true },
        elle: { value: "s'asseye", isIrregular: true },
        nous: { value: 'nous asseyions', isIrregular: true },
        vous: { value: 'vous asseyiez', isIrregular: true },
        elles: { value: "s'asseyent", isIrregular: true },
      },
    },
    conditional: {
      baseRuleHint: 'use stem assiér- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: "m'assiérais" },
        tu: { value: "t'assiérais" },
        elle: { value: "s'assiérait" },
        nous: { value: 'nous assiérions' },
        vous: { value: 'vous assiériez' },
        elles: { value: "s'assiéraient" },
      },
    },
  },
};
