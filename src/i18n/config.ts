export const locales = ["es", "en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Text that exists once per language. Used by every content file. */
export type Localized<T = string> = Record<Locale, T>;

export const localeMeta: Record<
  Locale,
  { label: string; short: string; htmlLang: string; ogLocale: string }
> = {
  es: { label: "Español", short: "ES", htmlLang: "es", ogLocale: "es_ES" },
  en: { label: "English", short: "EN", htmlLang: "en", ogLocale: "en_US" },
  ru: { label: "Русский", short: "RU", htmlLang: "ru", ogLocale: "ru_RU" },
};
