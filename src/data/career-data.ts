/**
 * Parcours professionnel et académique — source unique partagée par
 * la page À propos (about-tabs) et la page CV (/cv).
 */

/** Date de début du contrat NOVI (1ère alternance) — sert au calcul de l'ancienneté totale */
export const NOVI_SINCE = "2024-09-01";

export const noviRoles = [
  {
    period: "Oct. 2025 — Aujourd'hui",
    since: "2025-10-01",
    duration: "9 mois",
    role: "Chef de Projet Data & IA",
    type: "Alternance",
    current: true,
    description:
      "Je soutiens des marques comme Les Senteurs Gourmandes, Jozz Beauty, Physiomins et Pure Eden dans le développement, l'optimisation et le positionnement stratégique de leurs plateformes digitales.",
    missions: [
      "SEO technique : structure, balisage, maillage, sitemap, robots.txt, optimisation de +250 fiches produits",
      "Core Web Vitals : lazy loading, compression JS/CSS, images — conformité WCAG/ARIA",
      "Écosystème Google : Search Console, PageSpeed Insights, Merchant Center, Analytics, Tag Manager",
      "Automatisation & IA : ChatGPT & GitHub Copilot pour les workflows de développement, intégration LLMs",
    ],
    tags: ["SEO technique", "Core Web Vitals", "Google Analytics 4", "Tag Manager", "ChatGPT", "GitHub Copilot", "WCAG"],
  },
  {
    period: "Sept. 2024 — Sept. 2025",
    since: "2024-09-01",
    duration: "1 an 1 mois",
    role: "Développeur Web / Webmaster",
    type: "Alternance",
    current: false,
    description:
      "Développement et gestion des sites e-commerce du groupe sur WordPress et PrestaShop.",
    missions: [
      "Front-end (HTML, CSS, JavaScript) et back-end (PHP) des propriétés web du groupe",
      "CMS WordPress & PrestaShop : paramétrage complet (tunnel de commande, paiement, SEO, sécurité)",
      "Design et maquettes (Figma, Canva), versioning (GitHub, WinSCP), coordination (Notion)",
      "Gestion des réductions, rôles & privilèges, performances, intégrité des données",
    ],
    tags: ["WordPress", "PrestaShop", "PHP", "JavaScript", "Figma", "GitHub", "Notion"],
  },
];

export const otherExperiences = [
  {
    period: "Mai 2023 — Avr. 2024",
    duration: "1 an",
    role: "Développeur Web",
    company: "ALTERNATRI 53",
    location: "Angers",
    type: "Bénévolat",
    description:
      "Développement et maintenance du site web de l'association. Démarré par un stage de 2 mois (mai–juin 2023) puis poursuite en bénévolat.",
    tags: ["WordPress", "Notion"],
  },
  {
    period: "Juil. 2023 — Août 2023",
    duration: "2 mois",
    role: "Gestion de programmes",
    company: "éolane",
    location: "Angers",
    type: "Intérimaire",
    description:
      "Création et transfert de programmes AOI (Automated Optical Inspection) de la version MV3 vers MV7.",
    tags: ["Microsoft Excel", "AOI"],
  },
  {
    period: "Juil. 2022 — Août 2022",
    duration: "2 mois",
    role: "Aide comptable",
    company: "LILIAL",
    location: "Angers",
    type: "Intérimaire",
    description: "Mission d'aide comptable : saisie et gestion des commandes.",
    tags: ["Microsoft Excel", "Gestion des commandes"],
  },
];

export const education = [
  {
    period: "Oct. 2025 — Oct. 2027",
    degree: "Master Data & Intelligence Artificielle (M2 en cours)",
    school: "Nexa Digital School",
    current: true,
    description:
      "Formation en alternance spécialisée en Data Science, Machine Learning et IA appliquée aux contextes métier. En cours.",
    tags: ["Data Science", "Machine Learning", "IA appliquée", "Python", "Alternance"],
  },
  {
    period: "Sept. 2024 — Sept. 2025",
    degree: "Bachelor — Développement Web & Applications",
    school: "Nexa Digital School",
    current: false,
    description:
      "Bachelor informatique orienté développement web, gestion de projet et SEO. Obtenu en alternance chez Groupe NOVI.",
    tags: ["Développement web", "SEO", "Notion", "Gestion de projet"],
  },
  {
    period: "2023 — 2024",
    degree: "BTS — Classe préparatoire ingénieur",
    school: "ESAIP, École d'Ingénieurs",
    current: false,
    description:
      "Année de prépa intégrée à l'ESAIP pour préparer l'entrée en cycle ingénieur.",
    tags: ["Mathématiques", "Sciences", "Notion", "SEO"],
  },
  {
    period: "2022 — 2024",
    degree: "BTS SIO — Cybersécurité, Développement Web & BDD",
    school: "Lycée CHEVROLLIER, Angers",
    current: false,
    description:
      "BTS Services Informatiques aux Organisations. Spécialités : cybersécurité, développement web, gestion de bases de données, veille informatique.",
    tags: ["JavaScript", "HTML5", "CSS", "SQL", "Cybersécurité", "Réseaux", "PHP", "BDD", "Veille"],
  },
  {
    period: "2019 — 2022",
    degree: "Baccalauréat Général — SES, HGGSP, Anglais",
    school: "Lycée Joachim du Bellay, Angers",
    current: false,
    description:
      "Spécialités Sciences Économiques et Sociales, Histoire-Géographie Géopolitique et Sciences Politiques, Anglais.",
    tags: ["SES", "HGGSP", "Anglais"],
  },
];

export const certifications = [
  { label: "Google Analytics 4", issuer: "Google", year: "2024" },
  { label: "Google Search Console", issuer: "Google", year: "2024" },
  { label: "SEO technique & Core Web Vitals", issuer: "Autoformation", year: "2024" },
  { label: "Intégration IA en contexte métier", issuer: "Autoformation", year: "2025" },
  { label: "GitHub Copilot", issuer: "GitHub", year: "2025" },
  { label: "WCAG / Accessibilité web", issuer: "Autoformation", year: "2025" },
];

/** Langues — affichées sur le CV */
export const languages = [
  { label: "Français", level: "Langue maternelle" },
  { label: "Anglais", level: "Intermédiaire (lecture technique courante)" },
  { label: "Espagnol", level: "Notions" },
  { label: "Japonais", level: "Débutant · autodidacte" },
];

/** Qualités mises en avant sur le CV */
export const strengths = ["Autonomie", "Esprit d'équipe", "Prise de recul", "Résolution de problèmes"];

/** Centres d'intérêt — affichés sur le CV */
export const interests = [
  { label: "Sport", detail: "Surf, escalade" },
  { label: "Culture", detail: "Japon, nouvelles technologies, IA" },
  { label: "Voyages", detail: "États-Unis, Espagne, Portugal" },
];
