import type { Locale } from "./config";
import { en } from "./dictionaries/en";
import { es, type Dictionary } from "./dictionaries/es";
import { ru } from "./dictionaries/ru";

const dictionaries: Record<Locale, Dictionary> = { es, en, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
