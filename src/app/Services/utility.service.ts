import { Injectable } from '@angular/core';
import { Pronoun } from '../Enums/pronoun.enum';
import { Tense } from '../Enums/tense.enum';

@Injectable({ providedIn: 'root' })
export class UtilityService {
  readonly compoundTenses: Tense[] = ['passeCompose'];

  accentCharacters = [
    'à',
    'â',
    'æ',
    'ç',
    'é',
    'è',
    'ê',
    'ë',
    'î',
    'ï',
    'ô',
    'œ',
    'ù',
    'û',
    'ü',
    "'",
    '-',
  ];

  randomFrom<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  getReflexivePronoun(pronoun: Pronoun): string {
    switch (pronoun) {
      case 'je':
        return 'me';
      case 'tu':
        return 'te';
      case 'elle':
        return 'se';
      case 'nous':
        return 'nous';
      case 'vous':
        return 'vous';
      case 'elles':
        return 'se';
      default:
        return '';
    }
  }

  getContractedReflexivePronoun(pronoun: Pronoun): string {
    switch (pronoun) {
      case 'je':
        return "m'";
      case 'tu':
        return "t'";
      case 'elle':
        return "s'";
      case 'nous':
        return 'nous';
      case 'vous':
        return 'vous';
      case 'elles':
        return "s'";
      default:
        return '';
    }
  }

  toNegativeForm(value: string): string {
    const v = value.trim().replace(/[’]/g, "'");

    // Already contracted reflexive pronoun, like:
    // s'est, t'es, m'appelle
    if (/^(m'|t'|s')/i.test(v)) {
      return `ne ${v} pas`;
    }

    // Uncontracted reflexive pronoun, like:
    // me couche, te leves, se souvient, nous couchons, vous levez
    if (/^(me|te|se|nous|vous)\b/i.test(v)) {
      return `ne ${v} pas`;
    }

    // Non-reflexive form starting with vowel or mute h:
    // aime, est, habite
    if (/^[aeiouhàâæéèêëîïôœùûü]/i.test(v)) {
      return `n'${v} pas`;
    }

    return `ne ${v} pas`;
  }

  normalizeForCompare(value: string, removeAccents = true): string {
    let v = value ?? '';
    v = v.normalize('NFD'); //this separates the letter and diacritic so "é" becomes "e" + "́ ", which allows us to remove the diacritic
    if (removeAccents) v = v.replace(/\p{Diacritic}/gu, ''); // remove diacritics when accents are not required

    //.replace(/\s+/g, ' ') = removes extra white space between words (ne    parle = ne parle)
    //.replace(/[’]/g, "'") = changes the curly apostrophe into a normal apostrophe
    return v.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[’]/g, "'");
  }

  isFemininePronoun(displayPronoun: string) {
    const femininePronouns: string[] = ['elle', 'elles'];
    return femininePronouns.includes(displayPronoun);
  }
}
