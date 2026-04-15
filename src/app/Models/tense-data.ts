import { Pronoun } from "../Enums/pronoun.enum";
import { Conjugation } from "./conjugation";

export interface TenseData {
  conjugations: Record<Pronoun, Conjugation>;

  // optional hint helpers
  baseRuleHint?: string;      // e.g. "remove ending + e/es/e/ons/ez/ent"
  irregularStemHint?: string; // e.g. "use stem 'viendr-'"

  isFullyIrregular?: boolean; // optional shortcut
}