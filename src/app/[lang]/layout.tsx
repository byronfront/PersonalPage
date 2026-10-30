import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { preload } from "react-dom";
import { StructureOverlay } from "@/components/layout/StructureOverlay";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { isLocale, locales, localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { buildJsonLd, buildMetadata } from "@/lib/seo";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return buildMetadata({ locale: lang });
}

export const viewport: Viewport = {
  themeColor: "#171715",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const fontFiles: Record<"latin" | "cyrillic", string[]> = {
  latin: ["/fonts/onest-latin-wght-normal.woff2", "/fonts/cormorant-latin-wght-normal.woff2"],
  cyrillic: ["/fonts/onest-cyrillic-wght-normal.woff2", "/fonts/cormorant-cyrillic-wght-normal.woff2"],
};

function preloadFonts(locale: Locale) {
  const files = locale === "ru" ? [...fontFiles.cyrillic, ...fontFiles.latin.slice(0, 1)] : fontFiles.latin;
  files.forEach((href) => preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" }));
}

/** Marks the document as JS-capable before first paint, so reveals never flash. */
const bootScript = `document.documentElement.classList.add("js")`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  preloadFonts(lang);
  const dict = getDictionary(lang);

  return (
    <html lang={localeMeta[lang].htmlLang} data-structure="off" id="top">
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        {children}
        <StructureOverlay label={dict.structure.grid} />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }}
        />
      </body>
    </html>
  );
}
