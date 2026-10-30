import { ArrowLink } from "@/components/ui/ArrowLink";
import { Headline } from "@/components/ui/Headline";
import { SectionHead } from "@/components/ui/SectionHead";
import { getPublishedProjects, type Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { labelFor } from "@/lib/skills";
import styles from "./Work.module.css";

export function Work({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { work: copy } = dict;
  const projects = getPublishedProjects();
  const count = String(projects.length).padStart(2, "0");

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          index="05"
          label={copy.label}
          aside={projects.length > 0 ? count : copy.empty.status}
        />

        <Headline
          id="work-title"
          text={copy.title}
          lines="reveal"
          className={`t-h2 ${styles.title}`}
        />

        {projects.length === 0 ? (
          <EmptyPlate dict={dict} />
        ) : (
          <ol className={styles.list}>
            {projects.map((project, i) => (
              <ProjectEntry
                key={project.slug}
                project={project}
                index={i}
                locale={locale}
                dict={dict}
              />
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

function EmptyPlate({ dict }: { dict: Dictionary }) {
  const { empty } = dict.work;
  return (
    <div className={styles.plate} data-reveal>
      <svg className={styles.plateArc} viewBox="0 0 600 600" aria-hidden="true">
        <path d="M470.9 146.1A230 230 0 1 0 470.9 453.9" />
        <line x1="70" y1="300" x2="300" y2="300" />
        <rect x="62" y="292" width="16" height="16" />
      </svg>
      <span className={`${styles.corner} ${styles.tl}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.tr}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.bl}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.br}`} aria-hidden="true" />

      <div className={`grid ${styles.plateGrid}`}>
        <p className={`t-mono ${styles.plateStatus}`}>
          <span className={styles.pulse} aria-hidden="true" />
          {empty.status}
        </p>
        <Headline as="h3" text={empty.title} className={styles.plateTitle} />
        <p className={styles.plateBody}>{empty.body}</p>
        <div className={styles.plateCta}>
          <ArrowLink href="#contact">{empty.cta}</ArrowLink>
        </div>
      </div>
    </div>
  );
}

function ProjectEntry({
  project,
  index,
  locale,
  dict,
}: {
  project: Project;
  index: number;
  locale: Locale;
  dict: Dictionary;
}) {
  const { labels } = dict.work;
  const { newTab } = dict.contact;
  const reversed = index % 2 === 1;

  return (
    <li className={`grid ${styles.project}`} data-reversed={reversed ? "" : undefined}>
      <article className={styles.projectInner} aria-labelledby={`project-${project.slug}`}>
        {project.cover && (
          <figure className={styles.cover} data-reveal>
            <img
              src={project.cover.src}
              alt={project.cover.alt[locale]}
              width={project.cover.width}
              height={project.cover.height}
              loading="lazy"
              decoding="async"
            />
          </figure>
        )}

        <div className={styles.projectText}>
          <p className={`t-mono ${styles.projectMeta}`}>
            <span className={styles.projectIndex}>P—{String(index + 1).padStart(2, "0")}</span>
            <span className="t-faint">
              {labels.year} {project.year}
            </span>
          </p>
          <h3 id={`project-${project.slug}`} className={`t-h3 ${styles.projectName}`}>
            {project.name}
          </h3>
          <p className={styles.projectSummary}>{project.summary[locale]}</p>
          <p className={`t-mono ${styles.projectStack}`}>
            {project.role[locale]}
            <span className="t-faint"> · </span>
            {project.stack.map((id) => labelFor(id, locale)).join(" / ")}
          </p>

          <div className={styles.projectLinks}>
            {project.detail && (
              <ArrowLink href={`/${locale}/work/${project.slug}/`}>{labels.caseStudy}</ArrowLink>
            )}
            {project.demoUrl && (
              <ArrowLink href={project.demoUrl} direction="out" external newTabLabel={newTab}>
                {labels.demo}
              </ArrowLink>
            )}
            {project.repoUrl && (
              <ArrowLink href={project.repoUrl} direction="out" external newTabLabel={newTab}>
                {labels.repo}
              </ArrowLink>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}
