import { skills, type Skill } from "@/content/skills";
import type { Locale } from "@/i18n/config";

export function skillName(skill: Skill, locale: Locale): string {
  return typeof skill.name === "string" ? skill.name : skill.name[locale];
}

/** Resolves an id from skills.ts to its display name; unknown ids pass through as labels. */
export function labelFor(id: string, locale: Locale): string {
  const skill = skills.find((s) => s.id === id);
  return skill ? skillName(skill, locale) : id;
}
