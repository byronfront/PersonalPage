/**
 * Direct contact channels. Every value is optional.
 *
 * A channel set to `null` is never rendered as a link: the site shows it as
 * "pending" text, so there are no broken or empty links in production.
 *
 *  - email:    "hola@tudominio.com"
 *  - linkedin: full profile URL, "https://www.linkedin.com/in/usuario/"
 *  - github:   full profile URL, "https://github.com/usuario"
 *  - whatsapp: international number, digits only, "573001234567"
 */
export const contact: {
  email: string | null;
  linkedin: string | null;
  github: string | null;
  whatsapp: string | null;
} = {
  email: null,
  linkedin: null,
  github: null,
  whatsapp: null,
};

export type ChannelId = keyof typeof contact;

export type Channel = {
  id: ChannelId;
  href: string | null;
  /** Human readable value, e.g. the address or the handle. */
  display: string | null;
  external: boolean;
};

function handleFromUrl(url: string): string {
  return url
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/$/, "");
}

export function getChannels(): Channel[] {
  const { email, linkedin, github, whatsapp } = contact;
  return [
    {
      id: "email",
      href: email ? `mailto:${email}` : null,
      display: email,
      external: false,
    },
    {
      id: "linkedin",
      href: linkedin,
      display: linkedin ? handleFromUrl(linkedin) : null,
      external: true,
    },
    {
      id: "github",
      href: github,
      display: github ? handleFromUrl(github) : null,
      external: true,
    },
    {
      id: "whatsapp",
      href: whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, "")}` : null,
      display: whatsapp ? `+${whatsapp.replace(/\D/g, "")}` : null,
      external: true,
    },
  ];
}

/** Public profile URLs, used for structured data (`sameAs`). */
export function getProfileUrls(): string[] {
  return [contact.linkedin, contact.github].filter((v): v is string => Boolean(v));
}
