import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { getPublishedProjects } from "@/content/projects";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { labelFor } from "@/lib/skills";
import styles from "./page.module.css";

export const dynamicParams = false;

/**
 * Static export needs at least one path per dynamic segment. While there
 * are no case studies, a reserved placeholder slug is generated and
 * rendered as a 404 (see `notFound()` below), so the build stays valid.
 */
const PLACEHOLDER = "_";

export function generateStaticParams() {
  const slugs = getPublishedProjects()
    .filter((p) => p.detail)
    .map((p) => p.slug);
  const list = slugs.length ? slugs : [PLACEHOLDER];
  return locales.flatMap((lang) => list.map((slug) => ({ lang, slug })));
}

type Params = { params: Promise<{ lang: string; slug: string }> };

function findProject(slug: string) {
  return getPublishedProjects().find((p) => p.slug === slug && p.detail);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = findProject(slug);
  if (!isLocale(lang) || !project) return { robots: { index: false } };
  return buildMetadata({
    locale: lang,
    path: `work/${slug}/`,
    title: project.name,
    description: project.summary[lang],
  });
}

export default async function ProjectPage({ params }: Params) {
  const { lang, slug } = await params;
  const project = findProject(slug);
  if (!isLocale(lang) || !project) notFound();

  const dict = getDictionary(lang);
  const { labels } = dict.work;

  return (
    <SiteShell locale={lang} dict={dict} path={`work/${slug}/`}>
      <article className={`container ${styles.page}`}>
        <ArrowLink href={`/${lang}/#work`} direction="up">
          {labels.back}
        </ArrowLink>

        <header className={`grid ${styles.head}`}>
          <p className={`t-mono ${styles.meta}`}>
            <span>{project.year}</span>
            <span className="t-faint">{labels.status[project.status]}</span>
          </p>
          <h1 className={`t-h2 ${styles.title}`}>{project.name}</h1>
          <p className={`t-lead ${styles.summary}`}>{project.summary[lang]}</p>
        </header>

        {project.cover && (
          <figure className={styles.cover}>
            <img
              src={project.cover.src}
              alt={project.cover.alt[lang]}
              width={project.cover.width}
              height={project.cover.height}
              fetchPriority="high"
            />
          </figure>
        )}

        <div className={`grid ${styles.body}`}>
          <dl className={styles.facts}>
            <div>
              <dt className="t-mono t-faint">{labels.role}</dt>
              <dd>{project.role[lang]}</dd>
            </div>
            <div>
              <dt className="t-mono t-faint">{labels.stack}</dt>
              <dd>{project.stack.map((id) => labelFor(id, lang)).join(" / ")}</dd>
            </div>
          </dl>

          <div className={styles.text}>
            <section>
              <h2 className="t-mono t-faint">{labels.problem}</h2>
              <p>{project.problem[lang]}</p>
            </section>
            <section>
              <h2 className="t-mono t-faint">{labels.solution}</h2>
              <p>{project.solution[lang]}</p>
            </section>
            {project.body?.[lang].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

            <div className={styles.links}>
              {project.demoUrl && (
                <ArrowLink href={project.demoUrl} direction="out" external newTabLabel={dict.contact.newTab}>
                  {labels.demo}
                </ArrowLink>
              )}
              {project.repoUrl && (
                <ArrowLink href={project.repoUrl} direction="out" external newTabLabel={dict.contact.newTab}>
                  {labels.repo}
                </ArrowLink>
              )}
            </div>
          </div>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <div className={styles.gallery}>
            {project.gallery.map((img) => (
              <figure key={img.src}>
                <img src={img.src} alt={img.alt[lang]} width={img.width} height={img.height} loading="lazy" />
              </figure>
            ))}
          </div>
        )}
      </article>
    </SiteShell>
  );
}
