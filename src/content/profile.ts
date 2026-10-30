import type { Localized } from "@/i18n/config";

export type Portrait = {
  /**
   * Base path inside /public without extension, e.g. "/images/byron-cardona".
   * The component expects three files next to each other:
   *   {src}-800.avif, {src}-800.webp, {src}-1400.webp
   * Leave `src` as null to show the editorial placeholder.
   */
  src: string | null;
  /** Intrinsic size of the largest file. Prevents layout shift. */
  width: number;
  height: number;
  alt: Localized;
  /** CSS object-position, so the crop is decided, never arbitrary. */
  focus: string;
};

export const profile = {
  name: "Byron Cardona",
  givenName: "Byron",
  familyName: "Cardona",
  role: "Frontend Developer",
  /** Approximate professional experience, stated as such on the site. */
  yearsOfExperience: 3,
  languages: ["es", "en", "ru"] as const,
  portrait: {
    src: null,
    width: 1400,
    height: 1750,
    focus: "50% 30%",
    alt: {
      es: "Retrato de Byron Cardona",
      en: "Portrait of Byron Cardona",
      ru: "Портрет Байрона Кардоны",
    },
  } satisfies Portrait,
} as const;
