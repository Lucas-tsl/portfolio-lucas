export type SkillGroup = {
  title: string;
  items: string[];
};

export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  role: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export const profile = {
  name: "Lucas Troteseil",
  title: "Chef de projet Data / IA & Developpeur Web",
  tagline:
    "A la recherche de nouveaux defis, de projets creatifs et de collaborations inspirantes.",
  location: "Bordeaux, France",
  about:
    "Profil hybride entre pilotage de projets data/IA et execution technique web. J'aime transformer un besoin business en solution claire, mesurable et utile.",
  links: {
    github: "https://github.com/Lucas-tsl",
    linkedin: "https://www.linkedin.com/in/lucas-tsl/",
  },
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Developpement",
    items: ["JavaScript", "TypeScript", "Node.js", "PHP", "HTML", "CSS"],
  },
  {
    title: "Data & IA",
    items: ["LLM Integration", "Prompt Engineering", "Automatisation", "Copilot"],
  },
  {
    title: "BDD & CMS",
    items: ["MongoDB", "MySQL", "WordPress", "PrestaShop"],
  },
  {
    title: "Marketing Tech",
    items: ["SEO technique", "Core Web Vitals", "Google Analytics", "Merchant Center"],
  },
];

export const projects: ProjectItem[] = [
  {
    id: "woocommerce-stories",
    title: "Plugin WooCommerce Stories immersives",
    description:
      "Experience video mobile-first type stories (inspiree TikTok/Instagram) pour augmenter l'engagement e-commerce.",
    role: "Conception fonctionnelle, implementation front et integration API video.",
    technologies: ["JavaScript", "CSS", "WooCommerce", "YouTube API"],
  },
  {
    id: "image-processing-webapp",
    title: "Web App de traitement d'images",
    description:
      "Outil de conversion et optimisation d'images (WebP, AVIF) pour accelerer les performances web.",
    role: "Architecture back, developpement API et logique de traitement.",
    technologies: ["Node.js", "Express", "Sharp"],
  },
  {
    id: "client-review-plugin",
    title: "Plugin Client Review",
    description:
      "Solution sur-mesure de gestion d'avis clients avec workflow de moderation.",
    role: "Conception produit, implementation technique et accompagnement metier.",
    technologies: ["JavaScript", "PHP", "UX"],
  },
];
