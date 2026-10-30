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
      es: "Desarrollo colaborativo de una plataforma web de rastreo GPS y telemetría, como parte de un equipo de producto.",
      en: "Collaborative development of a web platform for GPS tracking and telemetry, as part of a product team.",
      ru: "Совместная разработка веб-платформы для GPS-мониторинга и телеметрии в составе продуктовой команды.",
    },
    responsibilities: {
      es: [
        "Construcción y mantenimiento de interfaces con React y TypeScript.",
        "Formularios de creación y edición con validación declarativa.",
        "Listados y filtros para consultar información operativa.",
        "Integración con APIs y manejo de sus estados: carga, error y vacío.",
        "Pruebas unitarias y de extremo a extremo.",
        "Mantenimiento de funcionalidades existentes en coordinación con el equipo.",
      ],
      en: [
        "Building and maintaining interfaces with React and TypeScript.",
        "Create and edit forms with declarative validation.",
        "Lists and filters for browsing operational data.",
        "API integration and handling of its states: loading, error, empty.",
        "Unit and end-to-end testing.",
        "Maintaining existing features in coordination with the team.",
      ],
      ru: [
        "Разработка и поддержка интерфейсов на React и TypeScript.",
        "Формы создания и редактирования с декларативной валидацией.",
        "Списки и фильтры для работы с операционными данными.",
        "Интеграция с API и обработка состояний: загрузка, ошибка, отсутствие данных.",
        "Модульное и end-to-end тестирование.",
        "Поддержка существующей функциональности совместно с командой.",
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
