import type { Metadata } from "next";
import type { ReactNode } from "react";
import { defaultLocale } from "@/i18n/config";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = {
  title: "Byron Cardona — Frontend Developer",
  alternates: {
    canonical: absoluteUrl(`/${defaultLocale}/`),
    languages: languageAlternates(),
  },
  robots: { index: false, follow: true },
};

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLocale}>
      <body>{children}</body>
    </html>
  );
}
