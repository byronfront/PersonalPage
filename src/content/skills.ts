import type { Localized } from "@/i18n/config";

/**
 * How a tool is used, stated qualitatively instead of with percentages.
 *  - core:    daily professional work
 *  - regular: frequent professional use
 *  - context: used within existing setups and workflows
 */
export type Usage = "core" | "regular" | "context";

export type SkillGroup = {
  id: string;
  title: Localized;
  summary: Localized;
};

export type Skill = {
  id: string;
  name: string | Localized;
  group: SkillGroup["id"];
  usage: Usage;
  note: Localized;
  /** Ids of tools this one works with. Relations are made symmetric. */
  related: string[];
  visible: boolean;
};

export const skillGroups: SkillGroup[] = [
  {
    id: "interface",
    title: {
      es: "Interfaz y desarrollo",
      en: "Interface & development",
      ru: "Интерфейс и разработка",
    },
    summary: {
      es: "Componentes, tipos y comportamiento de la interfaz.",
      en: "Components, types and interface behaviour.",
      ru: "Компоненты, типы и поведение интерфейса.",
    },
  },
  {
    id: "architecture",
    title: {
      es: "Arquitectura y herramientas",
      en: "Architecture & tooling",
      ru: "Архитектура и инструменты",
    },
    summary: {
      es: "Cómo se organiza, compila y versiona el código.",
      en: "How code is organised, built and versioned.",
      ru: "Как код организуется, собирается и версионируется.",
    },
  },
  {
    id: "forms",
    title: {
      es: "Formularios e integración",
      en: "Forms & integration",
      ru: "Формы и интеграция",
    },
    summary: {
      es: "Datos que se escriben, se validan y viajan a una API.",
      en: "Data that is entered, validated and sent to an API.",
      ru: "Данные, которые вводятся, проверяются и уходят в API.",
    },
  },
  {
    id: "testing",
    title: { es: "Pruebas", en: "Testing", ru: "Тестирование" },
    summary: {
      es: "Confianza para cambiar el código sin romperlo.",
      en: "Confidence to change code without breaking it.",
      ru: "Уверенность, что изменения ничего не сломают.",
    },
  },
];

export const skills: Skill[] = [
  {
    id: "react",
    name: "React",
    group: "interface",
    usage: "core",
    note: {
      es: "Composición de componentes, estado y efectos en interfaces de producto.",
      en: "Component composition, state and effects in product interfaces.",
      ru: "Композиция компонентов, состояние и эффекты в продуктовых интерфейсах.",
    },
    related: ["typescript", "mui", "react-hook-form", "jest", "vitest"],
    visible: true,
  },
  {
    id: "typescript",
    name: "TypeScript",
    group: "interface",
    usage: "core",
    note: {
      es: "Tipos como documentación viva de datos y componentes.",
      en: "Types as living documentation for data and components.",
      ru: "Типы как живая документация данных и компонентов.",
    },
    related: ["react", "javascript", "yup", "api"],
    visible: true,
  },
  {
    id: "javascript",
    name: "JavaScript",
    group: "interface",
    usage: "core",
    note: {
      es: "El lenguaje sobre el que se apoya todo lo demás.",
      en: "The language everything else stands on.",
      ru: "Язык, на котором держится всё остальное.",
    },
    related: ["typescript", "react"],
    visible: true,
  },
  {
    id: "mui",
    name: "Material UI",
    group: "interface",
    usage: "core",
    note: {
      es: "Sistema de componentes adaptado a las necesidades del producto.",
      en: "A component system adapted to the needs of the product.",
      ru: "Система компонентов, адаптированная под задачи продукта.",
    },
    related: ["react", "react-hook-form"],
    visible: true,
  },
  {
    id: "vite",
    name: "Vite",
    group: "architecture",
    usage: "regular",
    note: {
      es: "Entorno de desarrollo y compilación.",
      en: "Development server and build tooling.",
      ru: "Среда разработки и сборки.",
    },
    related: ["vitest", "nx", "react"],
    visible: true,
  },
  {
    id: "nx",
    name: "Nx",
    group: "architecture",
    usage: "context",
    note: {
      es: "Organización del código en un monorepo compartido por el equipo.",
      en: "Organising code in a monorepo shared by the team.",
      ru: "Организация кода в общем командном монорепозитории.",
    },
    related: ["vite", "git", "jest"],
    visible: true,
  },
  {
    id: "git",
    name: "Git",
    group: "architecture",
    usage: "core",
    note: {
      es: "Historial, ramas y revisión de cambios en equipo.",
      en: "History, branches and reviewing changes as a team.",
      ru: "История, ветки и командное ревью изменений.",
    },
    related: ["nx"],
    visible: true,
  },
  {
    id: "react-hook-form",
    name: "React Hook Form",
    group: "forms",
    usage: "core",
    note: {
      es: "Formularios de creación y edición con estado controlado.",
      en: "Create and edit forms with controlled state.",
      ru: "Формы создания и редактирования с управляемым состоянием.",
    },
    related: ["yup", "react", "mui", "api"],
    visible: true,
  },
  {
    id: "yup",
    name: "Yup",
    group: "forms",
    usage: "regular",
    note: {
      es: "Esquemas de validación declarativos.",
      en: "Declarative validation schemas.",
      ru: "Декларативные схемы валидации.",
    },
    related: ["react-hook-form", "typescript"],
    visible: true,
  },
  {
    id: "api",
    name: { es: "Consumo de APIs", en: "API integration", ru: "Работа с API" },
    group: "forms",
    usage: "core",
    note: {
      es: "Peticiones, estados de carga y error, datos tipados.",
      en: "Requests, loading and error states, typed data.",
      ru: "Запросы, состояния загрузки и ошибок, типизированные данные.",
    },
    related: ["typescript", "react-hook-form", "cypress"],
    visible: true,
  },
  {
    id: "jest",
    name: "Jest",
    group: "testing",
    usage: "regular",
    note: {
      es: "Pruebas unitarias de lógica y componentes.",
      en: "Unit tests for logic and components.",
      ru: "Модульные тесты логики и компонентов.",
    },
    related: ["react", "vitest", "nx"],
    visible: true,
  },
  {
    id: "vitest",
    name: "Vitest",
    group: "testing",
    usage: "regular",
    note: {
      es: "Pruebas unitarias integradas con Vite.",
      en: "Unit tests integrated with Vite.",
      ru: "Модульные тесты, встроенные в Vite.",
    },
    related: ["vite", "jest", "react"],
    visible: true,
  },
  {
    id: "cypress",
    name: "Cypress",
    group: "testing",
    usage: "context",
    note: {
      es: "Pruebas de extremo a extremo sobre flujos reales.",
      en: "End-to-end tests over real user flows.",
      ru: "End-to-end тесты реальных пользовательских сценариев.",
    },
    related: ["api", "react-hook-form"],
    visible: true,
  },
];

export function getVisibleSkills(): Skill[] {
  return skills.filter((skill) => skill.visible);
}

/** Symmetric relation map restricted to visible skills. */
export function getRelations(list: Skill[]): Record<string, string[]> {
  const ids = new Set(list.map((s) => s.id));
  const map: Record<string, Set<string>> = {};
  for (const s of list) map[s.id] = new Set();
  for (const s of list) {
    for (const r of s.related) {
      if (!ids.has(r) || r === s.id) continue;
      map[s.id]?.add(r);
      map[r]?.add(s.id);
    }
  }
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [k, [...v]]));
}
