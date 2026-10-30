import { Headline } from "@/components/ui/Headline";
import { SectionHead } from "@/components/ui/SectionHead";
import { getVisibleExperience } from "@/content/experience";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { labelFor } from "@/lib/skills";
import styles from "./Experience.module.css";

export function Experience({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { experience: copy } = dict;
  const entries = getVisibleExperience();

  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title">
      <div className="container">
        <SectionHead index="03" label={copy.label} />

        <div className={`grid ${styles.intro}`}>
          <Headline
            id="experience-title"
            text={copy.title}
            lines="reveal"
            className={`t-h2 ${styles.title}`}
          />
          <p className={styles.introText} data-reveal>
            {copy.intro}
          </p>
        </div>

        <div className={styles.entries}>
          {entries.map((entry) => (
            <article key={entry.id} className={styles.entry} aria-labelledby={`exp-${entry.id}`}>
              <header className={`grid ${styles.entryHead}`}>
                <p className={`t-mono ${styles.entryIndex}`} aria-hidden="true">
                  E—{entry.id}
                </p>
                <h3 id={`exp-${entry.id}`} className={`t-h3 ${styles.company}`} data-reveal>
                  {entry.company}
                </h3>
                <dl className={styles.meta}>
                  <div>
                    <dt className="t-mono t-faint">{copy.labels.role}</dt>
                    <dd>{entry.role[locale]}</dd>
                  </div>
                  <div>
                    <dt className="t-mono t-faint">{copy.labels.period}</dt>
                    <dd>{entry.period[locale]}</dd>
                  </div>
                </dl>
              </header>

              <span className="rule" data-reveal="rule" aria-hidden="true" />

              <div className={`grid ${styles.entryBody}`}>
                <div className={styles.context} data-reveal>
                  <h4 className="t-mono t-faint">{copy.labels.context}</h4>
                  <p className={styles.contextText}>{entry.context[locale]}</p>
                </div>

                <div className={styles.duties}>
                  <h4 className="t-mono t-faint">{copy.labels.responsibilities}</h4>
                  <ol className={styles.dutyList}>
                    {entry.responsibilities[locale].map((item, i) => (
                      <li key={item} data-reveal style={{ ["--reveal-i" as string]: i % 3 }}>
                        <span className={`t-mono ${styles.dutyNum}`} aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className={styles.stack} data-reveal>
                  <h4 className="t-mono t-faint">{copy.labels.stack}</h4>
                  <ul className={styles.stackList}>
                    {entry.stack.map((id) => (
                      <li key={id}>{labelFor(id, locale)}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {entry.note && <p className={`t-mono t-faint ${styles.note}`}>{entry.note[locale]}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
