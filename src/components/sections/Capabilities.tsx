import { Headline } from "@/components/ui/Headline";
import { SectionHead } from "@/components/ui/SectionHead";
import { getRelations, getVisibleSkills, skillGroups, type Usage } from "@/content/skills";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { skillName } from "@/lib/skills";
import { SkillsMap, type MapGroup } from "./SkillsMap";
import styles from "./Capabilities.module.css";

export function Capabilities({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { capabilities: copy } = dict;
  const visible = getVisibleSkills();
  const relations = getRelations(visible);

  const groups: MapGroup[] = skillGroups
    .map((g) => ({
      id: g.id,
      title: g.title[locale],
      summary: g.summary[locale],
      tools: visible
        .filter((s) => s.group === g.id)
        .map((s) => ({
          id: s.id,
          name: skillName(s, locale),
          usage: s.usage,
          note: s.note[locale],
          related: relations[s.id] ?? [],
        })),
    }))
    .filter((g) => g.tools.length > 0);

  const levels: Usage[] = ["core", "regular", "context"];

  return (
    <section id="capabilities" className={styles.section} aria-labelledby="capabilities-title">
      <div className="container">
        <SectionHead index="04" label={copy.label} />

        <div className={`grid ${styles.intro}`}>
          <Headline
            id="capabilities-title"
            text={copy.title}
            lines="reveal"
            className={`t-h2 ${styles.title}`}
          />
          <div className={styles.introSide} data-reveal>
            <p className={styles.introText}>{copy.intro}</p>
            <div className={styles.legend}>
              <h3 className="t-mono t-faint">{copy.legendLabel}</h3>
              <ul>
                {levels.map((level) => (
                  <li key={level} className={styles.legendRow}>
                    <span className={styles.mark} data-usage={level} aria-hidden="true" />
                    {copy.usage[level]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <SkillsMap
          groups={groups}
          labels={{
            usage: copy.usage,
            related: copy.relatedLabel,
            idle: copy.idle,
            reset: copy.reset,
          }}
        />
      </div>
    </section>
  );
}
