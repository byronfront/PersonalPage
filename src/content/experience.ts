import type { Localized } from "@/i18n/config";

export type ExperienceEntry = {
  /** Stable id, also used as visible index ("E—01"). */
  id: string;
  company: string;
  role: Localized;
  /**
   * Free-form period label. Use exact dates only when they are confirmed,
   * e.g. { es: "2023 — actualidad", en: "2023 — present", ru: "2023 — н. в." }.
   */
  period: Localized;
  context: Localized;
  responsibilities: Localized<string[]>;
  /** Skill ids from skills.ts, rendered in this order. */
  stack: string[];
  /** Optional confidentiality or scope note. */
  note?: Localized;
  /** Set to false to hide an entry without deleting it. */
  visible: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    id: "01",
    company: "Monitoreo Inteligente SAS",
    role: {
      es: "Frontend Developer",
      en: "Frontend Developer",
      ru: "Frontend-разработчик",
    },
    period: {
      es: "Aprox. 3 años",
      en: "Approx. 3 years",
      ru: "Около 3 лет",
    },
    context: {
      es: "Plataforma web de rastreo GPS y telemetría, en un equipo de producto.",
      en: "Web platform for GPS tracking and telemetry, in a product team.",
      ru: "Веб-платформа GPS-мониторинга и телеметрии, в продуктовой команде.",
    },
    responsibilities: {
      es: [
        "Interfaces con React y TypeScript.",
        "Formularios de creación y edición.",
        "Listados, filtros e integración con APIs.",
        "Pruebas unitarias y de extremo a extremo.",
      ],
      en: [
        "Interfaces with React and TypeScript.",
        "Create and edit forms.",
        "Lists, filters and API integration.",
        "Unit and end-to-end tests.",
      ],
      ru: [
        "Интерфейсы на React и TypeScript.",
        "Формы создания и редактирования.",
        "Списки, фильтры и интеграция с API.",
        "Модульные и end-to-end тесты.",
      ],
    },
    stack: [
      "react",
      "typescript",
      "mui",
      "react-hook-form",
      "yup",
      "api",
      "vite",
      "nx",
      "jest",
      "vitest",
      "cypress",
      "git",
    ],
    note: {
      es: "Producto privado: se omiten detalles, capturas y métricas de la plataforma.",
      en: "Private product: platform details, screenshots and metrics are intentionally left out.",
      ru: "Закрытый продукт: подробности, скриншоты и метрики платформы не публикуются.",
    },
    visible: true,
  },
];

export function getVisibleExperience(): ExperienceEntry[] {
  return experience.filter((entry) => entry.visible);
}
