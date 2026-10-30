import type { Metadata } from "next";
import { getProfileUrls } from "@/content/contact";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { getVisibleSkills } from "@/content/skills";
import { defaultLocale, locales, localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { skillName } from "./skills";

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** hreflang map for a path that exists in every language ("" = home). */
export function languageAlternates(path = ""): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const l of locales) entries[localeMeta[l].htmlLang] = absoluteUrl(`/${l}/${path}`);
  entries["x-default"] = absoluteUrl(`/${defaultLocale}/${path}`);
  return entries;
}

type PageMetaInput = {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
};

export function buildMetadata({ locale, path = "", title, description }: PageMetaInput): Metadata {
  const dict = getDictionary(locale);
  const fullTitle = title ? `${title} — ${profile.name}` : dict.meta.title;
  const desc = description ?? dict.meta.description;
  const url = absoluteUrl(`/${locale}/${path}`);
  const ogImage = {
    url: absoluteUrl(`/${locale}/og.png`),
    width: 1200,
    height: 630,
    alt: dict.meta.ogAlt,
    type: "image/png",
  };

  return {
    metadataBase: new URL(site.url),
    title: fullTitle,
    description: desc,
    applicationName: profile.name,
    authors: [{ name: profile.name }],
    creator: profile.name,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: path ? "article" : "profile",
      url,
      title: fullTitle,
      description: desc,
      siteName: profile.name,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      images: [ogImage],
      ...(path ? {} : { firstName: profile.givenName, lastName: profile.familyName }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

/** Person + WebSite graph. Only facts present in the content files. */
export function buildJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  const home = absoluteUrl(`/${locale}/`);
  const sameAs = getProfileUrls();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: profile.name,
        givenName: profile.givenName,
        familyName: profile.familyName,
        jobTitle: profile.role,
        url: home,
        knowsLanguage: ["es", "en", "ru"],
        knowsAbout: getVisibleSkills().map((s) => skillName(s, "en")),
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: home,
        name: profile.name,
        description: dict.meta.description,
        inLanguage: localeMeta[locale].htmlLang,
        author: { "@id": `${site.url}/#person` },
      },
    ],
  };
}
