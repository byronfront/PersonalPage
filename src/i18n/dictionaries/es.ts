/**
 * Spanish dictionary. Its shape defines `Dictionary`: en.ts and ru.ts must
 * provide exactly the same keys (TypeScript will fail the build otherwise).
 *
 * Headlines use { lead, accent, tail }: `accent` is set in the italic serif.
 */
export const es = {
  meta: {
    title: "Byron Cardona — Frontend Developer",
    description:
      "Byron Cardona, desarrollador frontend. Interfaces con React y TypeScript: formularios, listados, integración con APIs y pruebas.",
    ogAlt: "Byron Cardona, Frontend Developer. Precisión para cuestionar lo evidente.",
  },
  nav: {
    skip: "Saltar al contenido",
    primary: "Navegación principal",
    openMenu: "Abrir índice",
    closeMenu: "Cerrar índice",
    menu: "Índice",
    language: "Idioma",
    currentLanguage: "Idioma actual",
    home: "Página de inicio",
    sections: {
      home: "Inicio",
      about: "Sobre mí",
      experience: "Experiencia",
      capabilities: "Tecnologías",
      work: "Proyectos",
      contact: "Contacto",
    },
  },
  structure: {
    show: "Ver estructura",
    hide: "Ocultar estructura",
    hint: "Muestra la retícula y las especificaciones tipográficas que ordenan la página.",
    grid: "Retícula de 12 columnas",
  },
  hero: {
    eyebrow: "Frontend Developer",
    statement: { lead: "Precisión para", accent: "cuestionar", tail: "lo evidente." },
    intro:
      "Desarrollo interfaces con React y TypeScript desde hace unos tres años: formularios complejos, listados, filtros e integraciones con APIs, respaldados por pruebas que permiten cambiarlos con confianza.",
    ctaWork: "Ver trabajo seleccionado",
    ctaContact: "Iniciar una conversación",
    figure: "Fig. 01",
    portraitPending: "Retrato en preparación",
    meta: ["React · TypeScript", "Español · English · Русский"],
  },
  about: {
    label: "Sobre mí",
    title: { lead: "Lógica que deja", accent: "espacio", tail: "para la intuición." },
    lead: "Entiendo el frontend como el lugar donde la lógica de un producto se encuentra con una persona. Ahí, el rigor y la sensibilidad no compiten: se necesitan.",
    pairsLabel: "Cinco tensiones que guían mi trabajo",
    pairs: [
      {
        a: "Problema",
        b: "Pregunta",
        text: "Antes de escribir código intento entender qué se resuelve y para quién. Cuestionar la solución evidente suele revelar una más simple.",
      },
      {
        a: "Claridad",
        b: "Carácter",
        text: "Valoro las interfaces que se entienden sin instrucciones: jerarquía clara, estados previstos y errores que explican qué hacer. El carácter llega después, nunca a costa de la claridad.",
      },
      {
        a: "Disciplina",
        b: "Curiosidad",
        text: "Muchas buenas ideas vienen de fuera del código: del diseño editorial, de la tipografía, de cómo otras disciplinas ordenan la información. Conectarlas amplía las respuestas posibles.",
      },
      {
        a: "Creatividad",
        b: "Mantenimiento",
        text: "Una solución ingeniosa que nadie más puede mantener es un problema aplazado. Lo expresivo debe apoyarse en una base predecible: componentes pequeños, tipos explícitos y pruebas.",
      },
      {
        a: "Tecnología",
        b: "Persona",
        text: "La tecnología es el medio, no el resultado. Rendimiento, accesibilidad y legibilidad son formas concretas de respeto hacia quien usa la interfaz.",
      },
    ],
    quote: "Lo expresivo funciona mejor sobre una base predecible.",
    factsLabel: "Ficha",
    facts: [
      { k: "Enfoque", v: "Interfaces de producto" },
      { k: "Base", v: "React y TypeScript" },
      { k: "Experiencia", v: "Aprox. 3 años" },
      { k: "Idiomas", v: "Español, inglés, ruso" },
    ],
  },
  experience: {
    label: "Experiencia",
    title: { lead: "Lo construido", accent: "en equipo", tail: "" },
    intro:
      "Interfaces para una plataforma de telemetría: funcionalidad nueva, mantenimiento de lo existente y la colaboración que ambas exigen.",
    labels: {
      role: "Rol",
      period: "Periodo",
      context: "Contexto",
      responsibilities: "Responsabilidades",
      stack: "Herramientas",
    },
  },
  capabilities: {
    label: "Tecnologías",
    title: { lead: "Herramientas ordenadas por", accent: "función", tail: "" },
    intro:
      "Ninguna herramienta trabaja sola. Selecciona una para ver con cuáles se conecta en el trabajo diario.",
    usage: {
      core: "Uso diario",
      regular: "Uso frecuente",
      context: "En contexto",
    },
    usageLegend: {
      core: "Herramientas del trabajo profesional cotidiano.",
      regular: "Uso habitual en proyectos profesionales.",
      context: "Uso dentro de configuraciones y flujos existentes.",
    },
    legendLabel: "Cómo leer los niveles",
    relatedLabel: "Se conecta con",
    idle: "Selecciona una herramienta para ver sus conexiones.",
    reset: "Ver todas",
  },
  work: {
    label: "Proyectos",
    title: { lead: "Trabajo", accent: "seleccionado", tail: "" },
    empty: {
      status: "En preparación",
      title: {
        lead: "Este espacio se reserva para trabajo que pueda mostrarse",
        accent: "completo.",
        tail: "",
      },
      body: "La experiencia reciente pertenece a productos privados y por eso no aparece aquí. Cada proyecto que se publique llegará con su problema, sus decisiones y su código a la vista.",
      cta: "Conversemos sobre el trabajo reciente",
    },
    labels: {
      problem: "Problema",
      solution: "Solución",
      role: "Rol",
      stack: "Tecnologías",
      year: "Año",
      demo: "Ver el sitio",
      repo: "Ver repositorio",
      caseStudy: "Leer el caso",
      back: "Volver a proyectos",
      status: {
        published: "Publicado",
        "in-progress": "En desarrollo",
        draft: "Borrador",
      },
    },
  },
  contact: {
    label: "Contacto",
    title: { lead: "Si el problema es", accent: "interesante,", tail: "hablemos." },
    body: "Abierto a posiciones frontend en equipos de producto y a proyectos freelance con un objetivo claro. Puedes escribirme en español, inglés o ruso.",
    channels: {
      email: "Correo",
      linkedin: "LinkedIn",
      github: "GitHub",
      whatsapp: "WhatsApp",
    },
    pending: "Disponible pronto",
    copy: "Copiar dirección",
    copied: "Dirección copiada",
    newTab: "se abre en una pestaña nueva",
  },
  footer: {
    authorship: "Diseñado y desarrollado por Byron Cardona.",
    colophon: "Compuesto en Cormorant, Onest e IBM Plex Mono. Construido con Next.js como sitio estático.",
    backToTop: "Volver arriba",
    index: "Índice",
  },
};

export type Dictionary = typeof es;
