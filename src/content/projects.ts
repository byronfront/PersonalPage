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
      es: "Sitio de Bao, marroquinería de taller en Medellín: catálogo de piezas, bitácora del oficio y encargos, en español, inglés y ruso.",
      en: "Website for Bao, a leather workshop in Medellín: piece catalogue, workshop notes and commissions, in Spanish, English and Russian.",
      ru: "Сайт Bao, кожевенной мастерской в Медельине: каталог вещей, записи с верстака и заказы — на испанском, английском и русском.",
    },
    problem: {
      es: "Un taller que trabaja a mano, por encargo y en lotes pequeños, no encajaba en una tienda genérica. Hacía falta una presencia que explicara el oficio y permitiera encargar una pieza sin convertir el sitio en un carrito.",
      en: "A workshop that works by hand, to order and in small lots, did not fit a generic shop. It needed a public face that explained the craft and let someone commission a piece without turning the site into a cart.",
      ru: "Мастерской, которая работает вручную, на заказ и малыми партиями, не подходил шаблонный магазин. Нужно было лицо в сети, которое объясняет ремесло и позволяет заказать вещь без корзины.",
    },
    solution: {
      es: "Un sitio Next.js con rutas por idioma, fichas de catálogo, notas del taller y un camino de encargo por correo o WhatsApp. La interfaz sigue el ritmo del banco: poco inventario, mucho contexto.",
      en: "A Next.js site with per-language routes, catalogue cards, workshop notes and a commission path over email or WhatsApp. The interface follows the bench: little inventory, a lot of context.",
      ru: "Сайт на Next.js с маршрутами по языкам, карточками каталога, записями мастерской и заказом через почту или WhatsApp. Интерфейс идёт в ритме верстака: мало вещей, много контекста.",
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
