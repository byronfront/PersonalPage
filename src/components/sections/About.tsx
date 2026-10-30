import { Headline } from "@/components/ui/Headline";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Dictionary } from "@/i18n";
import styles from "./About.module.css";

export function About({ dict }: { dict: Dictionary }) {
  const { about } = dict;

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className="container">
        <SectionHead index="02" label={about.label} />

        <div className={`grid ${styles.layout}`}>
          <Headline
            id="about-title"
            text={about.title}
            lines="reveal"
            className={`t-h2 ${styles.title}`}
            spec="Cormorant 330 · clamp(2.75rem → 6.75rem)"
          />

          <p className={`t-lead ${styles.lead}`} data-reveal>
            {about.lead}
          </p>

          <aside className={styles.facts} aria-labelledby="about-facts">
            <div className={styles.factsInner}>
              <h3 id="about-facts" className="t-mono t-faint">
                {about.factsLabel}
              </h3>
              <dl className={styles.dl}>
                {about.facts.map((f) => (
                  <div key={f.k} className={styles.fact}>
                    <dt className="t-mono t-faint">{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

          <div className={styles.pairsWrap}>
            <h3 className={`t-mono t-faint ${styles.pairsLabel}`}>{about.pairsLabel}</h3>
            <ol className={styles.pairs}>
              {about.pairs.map((pair, i) => (
                <li
                  key={pair.a}
                  className={styles.pair}
                  data-reveal
                  style={{ ["--reveal-i" as string]: i % 2 }}
                >
                  <span className={`t-mono ${styles.num}`} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className={styles.terms}>
                    <span className={styles.a}>{pair.a}</span>
                    <span className={styles.joint} aria-hidden="true" />
                    <span className={`t-accent ${styles.b}`}>{pair.b}</span>
                  </p>
                  <p className={styles.text}>{pair.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <blockquote className={styles.quote} data-reveal>
            <span className={styles.quoteMark} aria-hidden="true" />
            <p className="t-accent">{about.quote}</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
