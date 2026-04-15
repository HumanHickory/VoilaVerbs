import { Verb } from '../Models/verb';

export const seSouvenir: Verb = {
  infinitive: 'se souvenir',
  english: 'to remember',
  isReflexive: true,
  usesAvoirAuxiliaryInPasseCompose: false,
  group: 'irregular',
  tenses: {
    present: {
      isFullyIrregular: true,
      baseRuleHint:
        "reflexive pronoun + stem souv- + e/es/e/ons/ez/ent (double 'n' in ils/elles forms)",
      conjugations: {
        je: { value: 'me souviens', isIrregular: true },
        tu: { value: 'te souviens', isIrregular: true },
        elle: { value: 'se souvient', isIrregular: true },
        nous: { value: 'nous souvenons', isIrregular: true },
        vous: { value: 'vous souvenez', isIrregular: true },
        elles: { value: 'se souviennent', isIrregular: true },
      },
    },
    imparfait: {
      baseRuleHint: 'reflexive pronoun + stem souven- + ais/ais/ait/ions/iez/aient',
      conjugations: {
        je: { value: 'me souvenais' },
        tu: { value: 'te souvenais' },
        elle: { value: 'se souvenait' },
        nous: { value: 'nous souvenions' },
        vous: { value: 'vous souveniez' },
        elles: { value: 'se souvenaient' },
      },
    },
    future: {
      irregularStemHint: "reflexive pronoun + stem 'souviendr-' + ai/as/a/ons/ez/ont",
      conjugations: {
        je: { value: 'me souviendrai', isIrregular: true },
        tu: { value: 'te souviendras', isIrregular: true },
        elle: { value: 'se souviendra', isIrregular: true },
        nous: { value: 'nous souviendrons', isIrregular: true },
        vous: { value: 'vous souviendrez', isIrregular: true },
        elles: { value: 'se souviendront', isIrregular: true },
      },
    },
    passeCompose: {
      baseRuleHint: 'reflexive pronoun + present tense être + past participle (souvenu)',
      conjugations: {
        je: { value: 'me suis souvenu', isIrregular: true },
        tu: { value: 't’es souvenu', isIrregular: true },
        elle: { value: 's’est souvenue', isIrregular: true },
        nous: { value: 'nous sommes souvenus', isIrregular: true },
        vous: { value: 'vous êtes souvenus', isIrregular: true },
        elles: { value: 'se sont souvenues', isIrregular: true },
      },
    },
    subjonctif: {
      isFullyIrregular: true,
      baseRuleHint:
        'reflexive pronoun + stem souvienne- + e/es/e/ions/iez/ent; nous/vous use souven-',
      conjugations: {
        je: { value: 'me souvienne', isIrregular: true },
        tu: { value: 'te souviennes', isIrregular: true },
        elle: { value: 'se souvienne', isIrregular: true },
        nous: { value: 'nous souvenions', isIrregular: true },
        vous: { value: 'vous souveniez', isIrregular: true },
        elles: { value: 'se souviennent', isIrregular: true },
      },
    },
  },
};
