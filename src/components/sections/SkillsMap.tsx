"use client";

import { useMemo, useState } from "react";
import type { Usage } from "@/content/skills";
import styles from "./Capabilities.module.css";

export type MapTool = {
  id: string;
  name: string;
  usage: Usage;
  note: string;
  related: string[];
};

export type MapGroup = { id: string; title: string; summary: string; tools: MapTool[] };

type Props = {
  groups: MapGroup[];
  labels: { usage: Record<Usage, string>; related: string; idle: string; reset: string };
};

/**
 * Tools as an ecosystem rather than a list: hovering or focusing a tool
 * previews its connections, pressing it pins the selection.
 */
export function SkillsMap({ groups, labels }: Props) {
  const [pinned, setPinned] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const byId = useMemo(() => {
    const map = new Map<string, MapTool>();
    groups.forEach((g) => g.tools.forEach((t) => map.set(t.id, t)));
    return map;
  }, [groups]);

  const activeId = preview ?? pinned;
  const active = activeId ? byId.get(activeId) : undefined;
  const related = new Set(active?.related ?? []);

  const stateOf = (id: string) => {
    if (!active) return undefined;
    if (id === active.id) return "active";
    return related.has(id) ? "related" : "muted";
  };

  return (
    <div className={`grid ${styles.map}`} data-has-active={active ? "" : undefined}>
      <div className={styles.groups} onMouseLeave={() => setPreview(null)}>
        {groups.map((group, gi) => (
          <div key={group.id} className={styles.group} data-reveal>
            <div className={styles.groupHead}>
              <span className={`t-mono ${styles.groupIndex}`} aria-hidden="true">
                04.{gi + 1}
              </span>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <p className={styles.groupSummary}>{group.summary}</p>
            </div>
            <ul className={styles.tools}>
              {group.tools.map((tool) => (
                <li key={tool.id}>
                  <button
                    type="button"
                    className={styles.tool}
                    data-state={stateOf(tool.id)}
                    aria-pressed={pinned === tool.id}
                    onClick={() => setPinned((p) => (p === tool.id ? null : tool.id))}
                    onMouseEnter={() => setPreview(tool.id)}
                    onFocus={() => setPreview(tool.id)}
                    onBlur={() => setPreview(null)}
                  >
                    <span className={styles.mark} data-usage={tool.usage} aria-hidden="true" />
                    <span className={styles.toolName}>{tool.name}</span>
                    <span className="visually-hidden">, {labels.usage[tool.usage]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <aside className={styles.detail} aria-live="polite" id="skills-detail">
        <div className={styles.detailInner}>
          {active ? (
            <div key={active.id} className={styles.detailBody}>
              <p className={`t-mono ${styles.detailUsage}`}>
                <span className={styles.mark} data-usage={active.usage} aria-hidden="true" />
                {labels.usage[active.usage]}
              </p>
              <p className={styles.detailName}>{active.name}</p>
              <p className={styles.detailNote}>{active.note}</p>
              {active.related.length > 0 && (
                <p className={styles.detailRelated}>
                  <span className="t-mono t-faint">{labels.related}</span>
                  <span>
                    {active.related
                      .map((id) => byId.get(id)?.name)
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </p>
              )}
              {pinned && (
                <button type="button" className={styles.reset} onClick={() => setPinned(null)}>
                  {labels.reset}
                </button>
              )}
            </div>
          ) : (
            <p className={`t-faint ${styles.idle}`}>{labels.idle}</p>
          )}
        </div>
      </aside>
    </div>
  );
}
