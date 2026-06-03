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

export type DocumentationItem = {
  id: string;
  title: string;
  summary: string;
  audience: string;
  status: string;
  category: string;
};

export type ArticleItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  status: string;
};

export type TechnologyItem = {
  id: string;
  name: string;
  description: string;
  focus: string;
  category: string;
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
    githubUrl: "https://github.com/Lucas-tsl/portfolio-lucas",
    liveUrl: "https://portfolio-lucas-two.vercel.app/",
  },
  {
    id: "image-processing-webapp",
    title: "Web App de traitement d'images",
    description:
      "Outil de conversion et optimisation d'images (WebP, AVIF) pour accelerer les performances web.",
    role: "Architecture back, developpement API et logique de traitement.",
    technologies: ["Node.js", "Express", "Sharp"],
    githubUrl: "https://github.com/Lucas-tsl/portfolio-lucas",
    liveUrl: "https://portfolio-lucas-two.vercel.app/",
  },
  {
    id: "client-review-plugin",
    title: "Plugin Client Review",
    description:
      "Solution sur-mesure de gestion d'avis clients avec workflow de moderation.",
    role: "Conception produit, implementation technique et accompagnement metier.",
    technologies: ["JavaScript", "PHP", "UX"],
    githubUrl: "https://github.com/Lucas-tsl/portfolio-lucas",
    liveUrl: "https://portfolio-lucas-two.vercel.app/",
  },
];

export const documentationItems: DocumentationItem[] = [
  {
    id: "onboarding-groupe-novi",
    title: "Onboarding technique Groupe NOVI",
    summary:
      "Guide pour comprendre les environnements, bonnes pratiques et ressources internes avant d'intervenir sur les sites des marques.",
    audience: "Equipe interne",
    status: "Disponible sur demande",
    category: "Process & Ops",
  },
  {
    id: "seo-core-web-vitals",
    title: "Checklist SEO et performance",
    summary:
      "Recueil des verifications prioritaires pour maintenir des Core Web Vitals solides et une indexation propre.",
    audience: "Marketing / Produit / Tech",
    status: "Mise a jour continue",
    category: "SEO",
  },
  {
    id: "wordpress-content-guide",
    title: "Guide de contenu WordPress",
    summary:
      "Methodologie de publication pour documentations, articles et fiches techniques afin de garder un espace clair et utile.",
    audience: "Collaborateurs et parties prenantes",
    status: "Pret a publier",
    category: "Content",
  },
];

export const articleIdeas: ArticleItem[] = [
  {
    id: "story-bubble-plugin",
    title: "Retour d'experience: le plugin Product Video Story Bubble",
    summary:
      "Pourquoi j'ai construit une experience stories pour WooCommerce et comment elle s'integre dans un tunnel de conversion.",
    category: "WordPress / WooCommerce",
    status: "Brouillon",
  },
  {
    id: "ai-productivity-web",
    title: "Automatiser sans alourdir: IA et productivite web",
    summary:
      "Comment utiliser des outils IA pour accelerer la production sans sacrifier la qualite ni la maintenabilite.",
    category: "IA / Productivite",
    status: "Idée",
  },
  {
    id: "core-web-vitals-guide",
    title: "Core Web Vitals: le minimum a viser pour un portfolio",
    summary:
      "Une approche pratique pour garder un site rapide, lisible et pertinent pour les moteurs de recherche.",
    category: "SEO / Performance",
    status: "Programmé",
  },
];

export const technologyItems: TechnologyItem[] = [
  {
    id: "nextjs",
    name: "Next.js",
    description:
      "Base de mon portfolio et de mes futurs espaces de contenu, avec App Router pour pages et API.",
    focus: "Rendu, routes, SEO et intégration backend",
    category: "Front / Fullstack",
  },
  {
    id: "wordpress",
    name: "WordPress",
    description:
      "Environnement dans lequel j'ai construit des plugins, des contenus et des experiences orientées metier.",
    focus: "Plugins, contenu et productivité éditoriale",
    category: "CMS",
  },
  {
    id: "resend",
    name: "Resend",
    description:
      "Solution d'email transactionnel pour les formulaires du portfolio et les futures notifications.",
    focus: "Formulaires, notifications et experience utilisateur",
    category: "Backend",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    description:
      "Utilisé pour construire un design system rapide, cohérent et maintenable sur toute la plateforme.",
    focus: "Design system et responsiveness",
    category: "UI",
  },
];
