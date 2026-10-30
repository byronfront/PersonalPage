import type { Locale, Localized } from "@/i18n/config";

export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

export function localePath(locale: Locale, hash?: string): string {
  return `/${locale}/${hash ? `#${hash}` : ""}`;
}
