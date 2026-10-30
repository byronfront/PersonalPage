import type { Dictionary } from "./es";

export const en: Dictionary = {
  meta: {
    title: "Byron Cardona — Frontend Developer",
    description:
      "Byron Cardona, frontend developer. Interfaces built with React and TypeScript: forms, data lists, API integration and testing.",
    ogAlt: "Byron Cardona, Frontend Developer. Precision to question the obvious.",
  },
  nav: {
    skip: "Skip to content",
    primary: "Main navigation",
    openMenu: "Open index",
    closeMenu: "Close index",
    menu: "Index",
    language: "Language",
    currentLanguage: "Current language",
    home: "Home page",
    sections: {
      home: "Home",
      about: "About",
      experience: "Experience",
      capabilities: "Technologies",
      work: "Work",
      contact: "Contact",
    },
  },
  structure: {
    show: "Show structure",
    hide: "Hide structure",
    hint: "Reveals the grid and the type specifications that organise the page.",
    grid: "12-column grid",
  },
  hero: {
    eyebrow: "Frontend Developer",
    statement: { lead: "Precision to", accent: "question", tail: "the obvious." },
    intro:
      "For about three years I have been building interfaces with React and TypeScript: complex forms, data lists, filters and API integrations, backed by tests that make them safe to change.",
    ctaWork: "See selected work",
    ctaContact: "Start a conversation",
    figure: "Fig. 01",
    portraitPending: "Portrait in preparation",
    meta: ["React · TypeScript", "Español · English · Русский"],
  },
  about: {
    label: "About",
    title: { lead: "Logic that leaves", accent: "room", tail: "for intuition." },
    lead: "I see the frontend as the place where the logic of a product meets a person. There, rigour and sensitivity do not compete: they need each other.",
    pairsLabel: "Five tensions that guide my work",
    pairs: [
      {
        a: "Problem",
        b: "Question",
        text: "Before writing code I try to understand what is being solved, and for whom. Questioning the obvious solution often reveals a simpler one.",
      },
      {
        a: "Clarity",
        b: "Character",
        text: "I value interfaces that make sense without instructions: clear hierarchy, anticipated states, errors that explain what to do next. Character comes after, never at the expense of clarity.",
      },
      {
        a: "Discipline",
        b: "Curiosity",
        text: "Many good ideas come from outside code: editorial design, typography, the way other disciplines organise information. Connecting them widens the range of possible answers.",
      },
      {
        a: "Creativity",
        b: "Maintenance",
        text: "A clever solution nobody else can maintain is a postponed problem. Expression should rest on a predictable base: small components, explicit types and tests.",
      },
      {
        a: "Technology",
        b: "People",
        text: "Technology is the means, not the outcome. Performance, accessibility and legibility are concrete forms of respect for the person using the interface.",
      },
    ],
    quote: "Expression works best on a predictable foundation.",
    factsLabel: "At a glance",
    facts: [
      { k: "Focus", v: "Product interfaces" },
      { k: "Foundation", v: "React and TypeScript" },
      { k: "Experience", v: "Approx. 3 years" },
      { k: "Languages", v: "Spanish, English, Russian" },
    ],
  },
  experience: {
    label: "Experience",
    title: { lead: "Built as part of", accent: "a team", tail: "" },
    intro:
      "Interfaces for a telemetry platform: new functionality, care for what already exists, and the collaboration both of them require.",
    labels: {
      role: "Role",
      period: "Period",
      context: "Context",
      responsibilities: "Responsibilities",
      stack: "Tools",
    },
  },
  capabilities: {
    label: "Technologies",
    title: { lead: "Tools arranged by", accent: "purpose", tail: "" },
    intro:
      "No tool works alone. Select one to see what it connects with in everyday work.",
    usage: {
      core: "Daily use",
      regular: "Frequent use",
      context: "In context",
    },
    usageLegend: {
      core: "Tools of everyday professional work.",
      regular: "Regular use in professional projects.",
      context: "Used within existing setups and workflows.",
    },
    legendLabel: "How to read the levels",
    relatedLabel: "Connects with",
    idle: "Select a tool to see its connections.",
    reset: "Show all",
  },
  work: {
    label: "Work",
    title: { lead: "Selected", accent: "work", tail: "" },
    empty: {
      status: "In preparation",
      title: {
        lead: "This space is reserved for work that can be shown",
        accent: "in full.",
        tail: "",
      },
      body: "Recent experience belongs to private products, which is why it does not appear here. Every project published here will arrive with its problem, its decisions and its code in plain view.",
      cta: "Let's talk about recent work",
    },
    labels: {
      problem: "Problem",
      solution: "Solution",
      role: "Role",
      stack: "Technologies",
      year: "Year",
      demo: "Visit the site",
      repo: "View repository",
      caseStudy: "Read the case",
      back: "Back to work",
      status: {
        published: "Published",
        "in-progress": "In progress",
        draft: "Draft",
      },
    },
  },
  contact: {
    label: "Contact",
    title: { lead: "If the problem is", accent: "interesting,", tail: "let's talk." },
    body: "Open to frontend roles in product teams and to freelance projects with a clear goal. You can write to me in English, Spanish or Russian.",
    channels: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      whatsapp: "WhatsApp",
    },
    pending: "Coming soon",
    copy: "Copy address",
    copied: "Address copied",
    newTab: "opens in a new tab",
  },
  footer: {
    authorship: "Designed and developed by Byron Cardona.",
    colophon: "Set in Cormorant, Onest and IBM Plex Mono. Built with Next.js as a static site.",
    backToTop: "Back to top",
    index: "Index",
  },
};
