import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { defaultLocale } from "@/i18n/config";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.name,
    start_url: `/${defaultLocale}/`,
    display: "browser",
    background_color: "#171715",
    theme_color: "#171715",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
