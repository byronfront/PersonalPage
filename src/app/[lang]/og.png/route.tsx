import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { MONOGRAM_PATHS } from "@/components/brand/geometry";
import { site } from "@/content/site";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export const dynamic = "force-static";
export const dynamicParams = false;

const size = { width: 1200, height: 630 };

/** Emitted as out/{lang}/og.png. Referenced from buildMetadata(). */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const fontDir = join(process.cwd(), "src/assets/og");

async function font(file: string) {
  return readFile(join(fontDir, file));
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "es";
  const { hero } = getDictionary(locale);
  const { b, c, joint } = MONOGRAM_PATHS;
  const host = site.url.replace(/^https?:\/\//, "");

  const [serif, serifItalic, serifCyr, serifItalicCyr, mono, monoCyr] = await Promise.all([
    font("cormorant-latin.ttf"),
    font("cormorant-latin-italic.ttf"),
    font("cormorant-cyrillic.ttf"),
    font("cormorant-cyrillic-italic.ttf"),
    font("plex-mono-latin.ttf"),
    font("plex-mono-cyrillic.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#171715",
          color: "#E9E2D5",
          fontFamily: "Cormorant",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Plex Mono",
            fontSize: 20,
            letterSpacing: 1.5,
            color: "#B8A990",
            textTransform: "uppercase",
          }}
        >
          <span>Byron Cardona</span>
          <span>{hero.eyebrow}</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: locale === "ru" ? 96 : 112,
              lineHeight: 0.95,
              letterSpacing: -2,
            }}
          >
            <span>{hero.statement.lead}</span>
            <span style={{ fontStyle: "italic", paddingLeft: 110 }}>{hero.statement.accent}</span>
            <span>{hero.statement.tail}</span>
          </div>
          <svg width="210" height="210" viewBox="0 0 64 64" fill="none" style={{ marginBottom: 8 }}>
            <path d={c} stroke="#E9E2D5" strokeWidth="1.6" />
            <path d={b} stroke="#E9E2D5" strokeWidth="1.6" />
            <rect x={joint.x + 0.8} y={joint.y + 0.8} width={joint.size - 1.6} height={joint.size - 1.6} fill="#A76A45" />
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 22,
            borderTop: "1px solid rgba(233,226,213,0.22)",
            fontFamily: "Plex Mono",
            fontSize: 18,
            letterSpacing: 1.2,
            color: "#8F8574",
          }}
        >
          <span>ES · EN · RU</span>
          <span style={{ width: 120, height: 2, background: "#A76A45" }} />
          <span>{host}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: serif, style: "normal", weight: 400 },
        { name: "Cormorant", data: serifItalic, style: "italic", weight: 400 },
        { name: "Cormorant", data: serifCyr, style: "normal", weight: 400 },
        { name: "Cormorant", data: serifItalicCyr, style: "italic", weight: 400 },
        { name: "Plex Mono", data: mono, style: "normal", weight: 400 },
        { name: "Plex Mono", data: monoCyr, style: "normal", weight: 400 },
      ],
    },
  );
}
