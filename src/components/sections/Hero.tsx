import { StructureToggle } from "@/components/layout/StructureToggle";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Headline } from "@/components/ui/Headline";
import { Portrait } from "@/components/ui/Portrait";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import styles from "./Hero.module.css";

type Props = { locale: Locale; dict: Dictionary };

export function Hero({ locale, dict }: Props) {
  const { hero, structure } = dict;

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-name">
      <div className={`container grid ${styles.layout}`}>
        <p className={`t-mono ${styles.eyebrow}`}>
          <span className={styles.index}>01</span>
          <span aria-hidden="true" className="t-faint">
            /
          </span>
          <span>{hero.eyebrow}</span>
        </p>

        <ul className={`t-mono t-faint ${styles.meta}`}>
          {hero.meta.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <Headline
          as="p"
          text={hero.statement}
          lines="static"
          className={`t-display ${styles.statement}`}
          spec="Cormorant 320 · clamp(3.25rem → 11.5rem) · lh 0.9"
        />

        <Portrait
          portrait={profile.portrait}
          alt={profile.portrait.alt[locale]}
          figure={hero.figure}
          pending={hero.portraitPending}
          className={styles.portrait}
        />

        <div className={styles.identity}>
          <h1 id="hero-name" className={styles.name} data-spec="Onest 500 · 1.5rem">
            {profile.name}
            <span className={`t-mono ${styles.role}`}>{hero.eyebrow}</span>
          </h1>
        </div>

        <div className={styles.body}>
          <p className={styles.intro} data-spec="Onest 380 · 62ch">
            {hero.intro}
          </p>
          <div className={styles.actions}>
            <ArrowLink href="#work" direction="down" variant="primary">
              {hero.ctaWork}
            </ArrowLink>
            <ArrowLink href="#contact" direction="right">
              {hero.ctaContact}
            </ArrowLink>
          </div>
        </div>

        <div className={styles.foot}>
          <StructureToggle show={structure.show} hide={structure.hide} hint={structure.hint} />
        </div>
      </div>
    </section>
  );
}
