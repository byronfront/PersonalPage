import type { Localized } from "@/i18n/config";

export type ProjectStatus = "published" | "in-progress" | "draft";

export type ProjectImage = {
  /** Path inside /public, e.g. "/images/projects/slug/cover.webp". */
  src: string;
  width: number;
  height: number;
  alt: Localized;
};

export type Project = {
  /** URL-safe id. Generates /{lang}/work/{slug}/ when `detail` is true. */
  slug: string;
  name: string;
  year: number;
  status: ProjectStatus;
  summary: Localized;
  problem: Localized;
  solution: Localized;
  role: Localized;
  /** Skill ids from skills.ts or free text labels. */
  stack: string[];
  cover?: ProjectImage;
  gallery?: ProjectImage[];
  demoUrl?: string;
  /** Only when the repository is public. */
  repoUrl?: string;
  /** Optional long-form description, one paragraph per array item. */
  body?: Localized<string[]>;
  /** Generate an individual case-study page. */
  detail: boolean;
};

/**
 * Real projects only. Add entries here; components adapt to 0, 1 or many.
 * Only projects with status "published" are rendered.
 */
export const projects: Project[] = [
  {
    slug: "cueros-bao",
    name: "Cueros Bao",
    year: 2026,
    status: "published",
    summary: {
      es: "Marroquinería de taller en Medellín: catálogo, oficio y encargos, en tres idiomas.",
      en: "Leather workshop in Medellín: catalogue, craft and commissions, in three languages.",
      ru: "Кожевенная мастерская в Медельине: каталог, ремесло и заказы, на трёх языках.",
    },
    problem: {
      es: "Un taller que trabaja a mano y por encargo no encajaba en una tienda genérica.",
      en: "A workshop that works by hand and to order did not fit a generic shop.",
      ru: "Мастерской, которая работает вручную и на заказ, не подходил шаблонный магазин.",
    },
    solution: {
      es: "Sitio Next.js con catálogo, bitácora del taller y encargo por correo o WhatsApp. Sin carrito.",
      en: "A Next.js site with a catalogue, workshop notes and commissions over email or WhatsApp. No cart.",
      ru: "Сайт на Next.js: каталог, записи мастерской и заказ через почту или WhatsApp. Без корзины.",
    },
    role: {
      es: "Diseño y desarrollo",
      en: "Design and development",
      ru: "Дизайн и разработка",
    },
    stack: ["Next.js", "react", "typescript", "Tailwind CSS"],
    cover: {
      src: "/images/projects/cueros-bao/cover.webp",
      width: 1280,
      height: 720,
      alt: {
        es: "Piel de cuero extendida sobre el banco del taller, con luz de ventana y herramientas de corte.",
        en: "A hide laid on the workshop bench, with window light and cutting tools.",
        ru: "Шкура на верстаке мастерской, свет из окна и инструменты для кроя.",
      },
    },
    demoUrl: "https://www.cuerosbao.com",
    detail: true,
    body: {
      es: [
        "Tres idiomas desde el origen: /es/, /en/ y /ru/. El catálogo lista las piezas que hay en el banco, cada una con ficha de cuero, curtido, medidas y tiempo de producción, y un filtro por categoría.",
        "No hay checkout. El encargo empieza por una conversación —correo, WhatsApp o Instagram— y solo entonces se marca el patrón. La bitácora del taller sostiene el relato del oficio junto al catálogo.",
      ],
      en: [
        "Three languages from the start: /es/, /en/ and /ru/. The catalogue lists what is on the bench, each piece with hide, tan, measurements and lead time, and a filter by category.",
        "There is no checkout. A commission starts as a conversation — email, WhatsApp or Instagram — and only then is the pattern marked. Workshop notes carry the craft alongside the catalogue.",
      ],
      ru: [
        "Три языка с самого начала: /es/, /en/ и /ru/. Каталог показывает то, что сейчас на верстаке: кожа, дубление, размеры и срок, плюс фильтр по категориям.",
        "Корзины нет. Заказ начинается с разговора — почта, WhatsApp или Instagram — и только потом на коже отмечают лекало. Записи мастерской держат рассказ о ремесле рядом с каталогом.",
      ],
    },
  },
];

export function getPublishedProjects(): Project[] {
  return projects
    .filter((p) => p.status === "published")
    .sort((a, b) => b.year - a.year);
}
