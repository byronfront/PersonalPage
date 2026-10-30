import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/content/projects";
import { locales, localeMeta } from "@/i18n/config";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

function entry(path: string, priority: number): MetadataRoute.Sitemap {
  return locales.map((l) => ({
    url: absoluteUrl(`/${l}/${path}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((alt) => [localeMeta[alt].htmlLang, absoluteUrl(`/${alt}/${path}`)]),
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = getPublishedProjects()
    .filter((p) => p.detail)
    .flatMap((p) => entry(`work/${p.slug}/`, 0.7));

  return [...entry("", 1), ...projectPages];
}
