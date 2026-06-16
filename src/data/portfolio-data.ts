import type {
  Profile,
  SkillGroup,
  Project,
  ContactSubject,
  ProjectStatus,
  ProjectCategory,
} from "@/types/portfolio.types";

export type { Profile, SkillGroup as TechnologyItem, Project, ContactSubject, ProjectStatus, ProjectCategory };

export const portfolioData = {
  profile: {
    name: "Lucas Troteseil",
    title: "Chef de projet Data / IA & Développeur Web",
    tagline: "En alternance chez Groupe NOVI et en Master Data & IA à Nexa, je soutiens des marques e-commerce dans leur performance web — SEO technique, Core Web Vitals, automatisation et IA appliquée.",
    about:
      "Chef de projet Data / IA en alternance chez Groupe NOVI à Bordeaux, où je travaille pour des marques comme Les Senteurs Gourmandes, Jozz Beauty, Physiomins et Pure Eden. SEO technique, Core Web Vitals, écosystème Google et intégration de LLMs dans les processus métier. En parallèle, je poursuis un Master Data & IA à Nexa Digital School. Dehors : surf sur l'Atlantique, escalade, et japonais en autodidacte.",
    email: "troteseil.lucas@gmail.com",
    github: "https://github.com/Lucas-tsl",
    linkedin: "https://www.linkedin.com/in/lucas-tsl/",
    wordpress: "https://profiles.wordpress.org/lucastsl/",
    location: "Bordeaux, France",
    available: true,
  },

  skills: [
    {
      id: "dev-web",
      category: "Développement Web",
      name: "Front-end & Back-end",
      description: "Conception d'applications web modernes, performantes et maintenables avec une stack orientée TypeScript.",
      focus: "Next.js, TypeScript, Node.js, React",
      level: 85,
      items: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PHP", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: "databases",
      category: "Bases de données",
      name: "Gestion de la Donnée",
      description: "Modélisation, requêtage et optimisation de bases de données relationnelles et NoSQL.",
      focus: "MySQL, PostgreSQL, MongoDB",
      level: 70,
      items: ["MySQL", "PostgreSQL", "MongoDB", "SQL", "Prisma"],
    },
    {
      id: "cms-ecommerce",
      category: "CMS & E-commerce",
      name: "WordPress & E-commerce",
      description: "Développement de plugins sur mesure, thèmes performants et intégrations WooCommerce avancées.",
      focus: "WordPress, WooCommerce, PrestaShop",
      level: 92,
      items: ["WordPress", "WooCommerce", "PrestaShop", "PHP", "ACF", "Elementor", "Figma", "Canva"],
    },
    {
      id: "seo-perf",
      category: "SEO & Performance",
      name: "SEO Technique & Core Web Vitals",
      description: "Audit, optimisation et suivi de la performance web, du référencement naturel et de l'expérience utilisateur.",
      focus: "Core Web Vitals, SEO technique, écosystème Google",
      level: 90,
      items: [
        "SEO technique",
        "Core Web Vitals",
        "Google Analytics 4",
        "Google Search Console",
        "Google Tag Manager",
        "Google Merchant Center",
        "PageSpeed Insights",
        "Lighthouse",
        "WCAG / ARIA",
      ],
    },
    {
      id: "data-ia",
      category: "Data & Intelligence Artificielle",
      name: "Data & IA Appliquée",
      description: "Intégration de LLMs, automatisation de workflows et valorisation des données au service des besoins métier.",
      focus: "LLMs, automatisation, Data Science (M1 en cours)",
      level: 68,
      items: [
        "ChatGPT / GPT-4",
        "Claude",
        "GitHub Copilot",
        "Prompt Engineering",
        "Automatisation de workflows",
        "Python (en formation)",
        "Google Data Studio",
        "Machine Learning (notions)",
      ],
    },
    {
      id: "project-management",
      category: "Gestion de projet",
      name: "Pilotage & Coordination",
      description: "Gestion de projets transverses, coordination entre équipes techniques et métier, suivi des livrables.",
      focus: "Agile, coordination, product management",
      level: 78,
      items: ["Gestion de projet Agile", "GitHub Projects", "Notion", "Figma (wireframing)", "Rédaction de specs", "Reporting"],
    },
  ],

  projects: [
    {
      id: "woocommerce-stories",

      title: "Plugin WooCommerce Stories",
      description:
        "Expérience vidéo immersive type TikTok / Instagram Stories intégrée à WooCommerce. Permet aux e-commerçants de mettre en avant leurs produits via des vidéos plein écran sur mobile, avec lecture YouTube optimisée et navigation swipe.",
      role: "Développeur Full-Stack",
      status: "Actif",
      year: "2024",
      category: "WordPress",
      technologies: ["JavaScript", "PHP", "WooCommerce", "API YouTube", "CSS mobile-first"],
      githubUrl: "https://github.com/Lucas-tsl/woocommerce-stories",
      liveUrl: "",
      highlights: [
        "Lecture vidéo YouTube sans popup, intégrée directement en page produit",
        "Navigation swipe sur mobile, similaire aux Stories Instagram",
        "Zéro dépendance externe côté JS pour optimiser les Core Web Vitals",
      ],
    },
    {
      id: "image-processing-app",
      title: "Web App de Traitement d'Images",
      description:
        "Outil en ligne de conversion et compression d'images développé pour répondre à un besoin concret : optimiser les assets web sans perte de qualité visible. Conversion WebP, AVIF, redimensionnement et optimisation automatique.",
      role: "Développeur Back-End",
      status: "Disponible",
      year: "2023",
      category: "Node.js",
      technologies: ["Node.js", "Express", "Sharp", "TypeScript"],
      githubUrl: "https://github.com/Lucas-tsl/image-processing",
      liveUrl: "",
      highlights: [
        "Conversion vers WebP et AVIF pour gains de poids -60 à -80%",
        "Traitement par lot avec interface drag & drop",
        "API REST utilisable en CI/CD ou depuis d'autres outils",
      ],
    },
    {
      id: "client-review-plugin",
      title: "Plugin Client Review (WordPress)",
      description:
        "Solution sur-mesure de gestion d'avis clients pour WordPress. Collecte, modération et affichage des avis avec schema markup intégré pour améliorer le SEO et le taux de clics dans les SERP.",
      role: "Développeur Full-Stack",
      status: "Déployé",
      year: "2023",
      category: "WordPress",
      technologies: ["PHP", "JavaScript", "MySQL", "WordPress", "Schema.org"],
      githubUrl: "https://github.com/Lucas-tsl/client-review",
      liveUrl: "",
      highlights: [
        "Balisage Schema.org Review pour les rich snippets Google",
        "Interface d'administration personnalisée dans le back-office WP",
        "Système de modération et validation avant publication",
      ],
    },
    {
      id: "kaizen-formations",
      title: "Kaizen Formations",
      description:
        "Site web professionnel développé de A à Z pour Anne Viau, psychologue clinicienne et formatrice accréditée PSSM France. Plateforme complète pour un organisme de formation certifié Qualiopi spécialisé en santé mentale et prévention des RPS.",
      role: "Développeur Full-Stack",
      status: "En production",
      year: "2025",
      category: "Next.js",
      technologies: [
        "Next.js 16",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Resend",
        "Google Places API",
        "Vercel Analytics",
        "Schema.org / JSON-LD",
      ],
      githubUrl: "https://github.com/Lucas-tsl/kaizen-website",
      liveUrl: "https://www.kaizen-formations.fr/",
      highlights: [
        "Catalogue de 7 formations avec pages détaillées, filtres et schémas JSON-LD Course",
        "Intégration Google Places API pour les avis en temps réel et Resend pour les emails",
        "SEO technique complet : sitemap dynamique, Schema.org Organization / LocalBusiness / Person",
        "Accessibilité WCAG 2.1 AA : ARIA landmarks, navigation clavier, contraste ≥ 4.5:1, tap targets ≥ 44px",
        "Blog Markdown avec table des matières automatique, temps de lecture et breadcrumbs",
      ],
    },
    {
      id: "portfolio",
      title: "Portfolio (ce site)",
      description:
        "Portfolio personnel conçu et développé from scratch avec Next.js 15 et Tailwind CSS v4. Déploiement continu via Vercel, contenu markdown dynamique, formulaire de contact avec Resend et thème sombre/clair.",
      role: "Développeur Full-Stack",
      status: "En production",
      year: "2025",
      category: "Portfolio",
      technologies: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "Resend", "Framer Motion"],
      githubUrl: "https://github.com/Lucas-tsl/portfolio-lucas",
      liveUrl: "https://lucastroteseil.com",
      highlights: [
        "CI/CD automatique via GitHub + Vercel",
        "Rendu markdown pour les articles blog et docs",
        "Formulaire de contact avec confirmation email via Resend",
      ],
    },
  ] satisfies Project[],

  contactSubjects: [
    {
      value: "dev-web",
      label: "Développement web",
      description: "Création d'application, site Next.js / React, API, intégration front-end",
      skills: ["Next.js", "TypeScript", "React", "Node.js", "PHP"],
    },
    {
      value: "wordpress-cms",
      label: "WordPress & CMS",
      description: "Site WordPress, plugin sur-mesure, WooCommerce, PrestaShop",
      skills: ["WordPress", "WooCommerce", "PHP", "ACF"],
    },
    {
      value: "seo-performance",
      label: "SEO & Performance web",
      description: "Audit SEO, optimisation Core Web Vitals, Analytics, référencement",
      skills: ["SEO technique", "Core Web Vitals", "Google Analytics 4"],
    },
    {
      value: "data-ia",
      label: "Data & Intelligence Artificielle",
      description: "Intégration IA, automatisation, valorisation de données, LLMs",
      skills: ["ChatGPT", "Claude", "Automatisation", "Prompt Engineering"],
    },
    {
      value: "gestion-projet",
      label: "Gestion de projet",
      description: "Coordination technique, pilotage de projet web, specs fonctionnelles",
      skills: ["Agile", "GitHub Projects", "Notion", "Reporting"],
    },
    {
      value: "collaboration",
      label: "Collaboration / Partenariat",
      description: "Projet commun, échange de compétences, opportunité professionnelle",
      skills: [],
    },
    {
      value: "autre",
      label: "Autre demande",
      description: "Toute autre prise de contact",
      skills: [],
    },
  ] satisfies ContactSubject[],
};

export const profile = portfolioData.profile;
export const technologyItems = portfolioData.skills;
export const skillGroups = portfolioData.skills;
export const projects = portfolioData.projects;
export const contactSubjects = portfolioData.contactSubjects;

export const metrics = [
  { value: "5",      label: "Projets déployés",      sublabel: "open-source & client" },
  { value: "4",      label: "Marques e-commerce",    sublabel: "Groupe NOVI" },
  { value: "+40 %",  label: "Trafic organique",       sublabel: "audit SEO technique" },
  { value: "98/100", label: "Score Lighthouse",       sublabel: "portfolio & projets" },
] as const;
