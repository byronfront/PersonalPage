/**
 * Global site settings.
 *
 * `url` is used for canonical URLs, hreflang, Open Graph and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL at build time or replace the fallback below with
 * the final domain (no trailing slash).
 */
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, ""),
  /** Year shown in the footer and in metadata. */
  year: 2026,
} as const;

export const sectionIds = [
  "home",
  "about",
  "experience",
  "capabilities",
  "work",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];
