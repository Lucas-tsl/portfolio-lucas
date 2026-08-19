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
      challenge:
        "Intégrer une expérience vidéo fluide à WooCommerce sans alourdir les pages produit ni dégrader le score Lighthouse — les solutions existantes chargeaient des iframes dès le premier rendu.",
      result:
        "Plugin autonome sans dépendance JS externe. Score Lighthouse maintenu à 95+, adopté sur 3 boutiques du Groupe NOVI avec une augmentation mesurée du temps passé sur les pages produit.",
      timeline: [
        { date: "Oct 2024", label: "Analyse & conception", description: "Étude des API WooCommerce et YouTube, choix d'une approche lazy-iframe pour éviter les pénalités CWV." },
        { date: "Nov 2024", label: "Prototype mobile", description: "Première version du swipe natif et de la lecture YouTube intégrée, validée sur iOS Safari et Chrome Android." },
        { date: "Déc 2024", label: "Optimisation performances", description: "Élimination des dépendances, lazy loading des vidéos au scroll, réduction à zéro du blocking JS." },
        { date: "Jan 2025", label: "Release v1.0", description: "Publication sur GitHub, documentation d'intégration et tests de compatibilité WooCommerce 8.x." },
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
      challenge:
        "L'équipe perdait du temps à convertir manuellement les images avant chaque mise en ligne. Les outils en ligne étaient limités en taille et sans API exploitable en pipeline.",
      result:
        "Réduction du poids moyen des assets de 65% sur les projets e-commerce traités. L'API REST est intégrée dans deux pipelines CI/CD actifs.",
      timeline: [
        { date: "Sep 2023", label: "Identification du besoin", description: "Constat d'une perte de temps récurrente en équipe sur la préparation des images pour le web." },
        { date: "Oct 2023", label: "Back-end Express + Sharp", description: "Mise en place du serveur de traitement, tests des formats WebP et AVIF avec Sharp.js." },
        { date: "Oct 2023", label: "Interface drag & drop", description: "UI minimaliste pour les non-développeurs, traitement par lot et prévisualisation avant téléchargement." },
        { date: "Nov 2023", label: "API REST & CI/CD", description: "Endpoint documenté utilisable en pipeline de déploiement, testé en intégration sur 2 projets actifs." },
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
      challenge:
        "Remplacer un plugin générique coûteux par une solution sur-mesure respectant les contraintes RGPD, sans sacrifier le référencement lié aux avis clients.",
      result:
        "Rich snippets actifs en Search Console dès la première semaine. Taux de collecte d'avis multiplié par 3 grâce au formulaire contextuel post-achat.",
      timeline: [
        { date: "Sep 2023", label: "Audit & specs", description: "Analyse de la solution existante, rédaction des specs techniques avec les contraintes RGPD et SEO." },
        { date: "Oct 2023", label: "Développement back-end", description: "Système de collecte, stockage MySQL et interface de modération dans le back-office WordPress." },
        { date: "Oct 2023", label: "Schema.org & rich snippets", description: "Intégration du balisage Review/AggregateRating pour les étoiles dans les résultats Google." },
        { date: "Nov 2023", label: "Déploiement", description: "Mise en production sur 2 sites, tests de charge, conformité RGPD et suivi Search Console." },
      ],
    },
    {
      id: "navi-wordpress",
      title: "Navi — Hub d'engagement WordPress/WooCommerce",
      description:
        "Plugin WordPress/WooCommerce qui regroupe derrière un seul bouton flottant plusieurs modules d'engagement client : consentement cookies (Google Consent Mode V2), ajout au panier automatique, accessibilité numérique et bulles vidéo type Stories Instagram sur les fiches produit.",
      role: "Développeur Plugin",
      status: "Actif",
      year: "2025",
      category: "WordPress",
      technologies: ["PHP", "JavaScript", "WordPress", "WooCommerce", "Google Consent Mode V2", "WPML"],
      githubUrl: "https://github.com/Lucas-tsl/navi-wordpress",
      liveUrl: "https://lessenteursgourmandes.fr/",
      highlights: [
        "Bouton flottant unique à 3 états, architecture à registre de modules découplés du noyau",
        "Bannière RGPD + Google Consent Mode V2, logo auto-détecté depuis l'identité du site",
        "Bulles vidéo type Stories Instagram sur les fiches produit (jusqu'à 4 par produit, YouTube ou MP4)",
        "Panier automatique sur fiche produit, produits simples et à variations, sélecteur de teinte accessible au clavier",
        "Traduction auto-suffisante (WPML ou repli sur la locale WordPress) sans plugin supplémentaire",
      ],
      challenge:
        "Régler à la fois des problèmes de conformité RGPD sur les cookies, d'accessibilité numérique et d'expérience produit sur 3 boutiques WooCommerce du Groupe NOVI, sans multiplier les plugins tiers ni dégrader les Core Web Vitals.",
      result:
        "Plugin unique déployé sur Les Senteurs Gourmandes, Jozz Beauty et Pure Eden, fusionnant 3 déploiements site-spécifiques initiaux en une architecture à modules généralisée, prête pour une soumission au répertoire officiel WordPress.org.",
      timeline: [
        { date: "2024", label: "Déploiements site-spécifiques", description: "Développement initial de 3 hubs indépendants (hub-lsg, hub-pe, hub-jozz) pour répondre aux besoins cookies, accessibilité et panier de chaque boutique." },
        { date: "2025", label: "Fusion & généralisation", description: "Fusion des 3 déploiements en un plugin unique, architecture à registre de modules découplés du noyau, sans dépendance entre eux." },
        { date: "2025", label: "Module Stories", description: "Ajout du module bulles vidéo type Stories Instagram sur les fiches produit, jusqu'à 4 vidéos par produit, YouTube ou MP4." },
        { date: "2025", label: "Préparation WordPress.org", description: "Rédaction du readme.txt au format officiel, bannière, icône et captures d'écran prêts pour soumission au répertoire public." },
      ],
    },
    {
      id: "navi-prestashop",
      title: "Navi — Hub d'engagement PrestaShop",
      description:
        "Module PrestaShop, frère du plugin Navi pour WordPress : un bouton flottant unique regroupant consentement cookies (Google Consent Mode v2), accessibilité, panier sticky calé sur le bouton natif du thème et bulles vidéo Stories sur les fiches produit.",
      role: "Développeur Module",
      status: "Déployé",
      year: "2025",
      category: "PrestaShop",
      technologies: ["PHP", "JavaScript", "PrestaShop", "Smarty", "Google Consent Mode v2"],
      githubUrl: "https://github.com/Lucas-tsl/navi-prestashop",
      liveUrl: "https://www.physiomins.com/",
      highlights: [
        "Panier sticky qui suit le vrai bouton \"Ajouter au panier\" du thème, y compris l'état rupture de stock",
        "Stories vidéo natives par produit (table dédiée navi_story, jusqu'à 4 par fiche), sans dépendance à un module tiers",
        "Consent Mode v2 injecté avant tout script tiers pour bloquer le tracking par défaut tant qu'aucun choix n'est fait",
        "Compatible PrestaShop 1.7 à 8.x, configuration entièrement personnalisable depuis le Back Office",
      ],
      challenge:
        "Adapter la même logique de hub d'engagement à l'écosystème PrestaShop pour Physiomins, avec des contraintes propres à la plateforme : ordre des hooks non garanti pour le Consent Mode, thème sans sélecteur de variation standard sur le panier sticky.",
      result:
        "Module en production sur physiomins.com, avec synchronisation Google Consent Mode v2 pour Analytics/Ads et un événement navi_cookie_consent_updated exploitable dans GTM pour synchroniser les pixels tiers (Meta, TikTok, Hotjar...).",
      timeline: [
        { date: "2025", label: "Conception du hub", description: "Reprise de l'architecture du bouton flottant à 3 états développée pour WordPress, adaptée aux hooks et au Back Office PrestaShop." },
        { date: "2025", label: "Cookies & accessibilité", description: "Bannière de consentement Google Consent Mode v2, panneau accessibilité (taille du texte, contraste, curseur agrandi)." },
        { date: "2025", label: "Panier sticky & stories", description: "Panier sticky calé sur le bouton natif du thème, gestion native des stories vidéo par produit." },
        { date: "2025", label: "Déploiement Physiomins", description: "Mise en production sur physiomins.com, configuration Back Office et synchronisation des tags tiers via GTM." },
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
      challenge:
        "Concevoir un site vitrine crédible pour un organisme certifié Qualiopi, avec un référencement fort sur des requêtes concurrentielles (formations PSSM, premiers secours en santé mentale), dans un délai de 4 mois.",
      result:
        "Score Lighthouse ≥ 95 en production. Positionnement sur les formations PSSM France actif dès le premier mois. Avis Google intégrés en temps réel via Places API.",
      timeline: [
        { date: "Jan 2025", label: "Cahier des charges", description: "Analyse des besoins métier, wireframes et définition de l'architecture technique et du périmètre SEO." },
        { date: "Fév 2025", label: "Design & intégration", description: "Maquettes, intégration Tailwind CSS avec animations Framer Motion, dark mode et accessibilité." },
        { date: "Mar 2025", label: "Fonctionnalités", description: "Catalogue formations, avis Google Places API, formulaire Resend, blog Markdown avec TOC." },
        { date: "Avr 2025", label: "SEO & accessibilité", description: "Schema.org complet (Organization, Course, Person), audit Lighthouse, conformité WCAG 2.1 AA." },
        { date: "Mai 2025", label: "Mise en production", description: "Déploiement Vercel, configuration DNS, Google Search Console et Vercel Analytics." },
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
      challenge:
        "Créer un portfolio qui soit simultanément une vitrine propre et une démonstration concrète des compétences — performance, accessibilité, sécurité — sans over-engineering.",
      result:
        "First Load JS de 179 kB sur la homepage, 17 tests E2E Playwright, score PageSpeed 98/100, CSP strict et rate limiting sur le contact.",
      timeline: [
        { date: "Jan 2025", label: "Architecture", description: "Choix Next.js 15 App Router, design system Tailwind v4, structure des données et routing." },
        { date: "Fév 2025", label: "Pages principales", description: "Homepage, /projects avec filtres, /blog et /docs avec rendu Markdown et sanitisation HTML." },
        { date: "Mar 2025", label: "Fonctionnalités avancées", description: "Palette ⌘K, radar chart compétences (Recharts), OG images dynamiques, flux RSS." },
        { date: "Avr 2025", label: "Performance & sécurité", description: "Code splitting, lazy loading (-35% JS), CSP strict, rate limiting, headers HTTP sécurisés." },
        { date: "Mai 2025", label: "Tests & production", description: "17 tests Playwright E2E, déploiement continu via Vercel, PageSpeed 98/100." },
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
