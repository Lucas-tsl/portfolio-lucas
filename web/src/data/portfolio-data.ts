export type SkillCategory = {
  id: string;
  category: string;
  name: string;
  description: string;
  focus: string;
  items: string[];
};

export const portfolioData = {
  profile: {
    name: "Lucas Troteseil",
    title: "Chef de projet Data / IA & Développeur Web",
    tagline: "À la recherche de nouveaux défis, de projets créatifs et de collaborations inspirantes.",
    about: "Profil hybride, mêlant la vision technique du développement et la gestion de projet stratégique. Passionné par les nouvelles technologies, l'apprentissage continu (japonais, Swift), le surf et l'escalade.",
    email: "contact@lucastroteseil.com",
    github: "https://github.com/Lucas-tsl",
    linkedin: "https://www.linkedin.com/in/lucas-tsl/",
    wordpress: "https://profiles.wordpress.org/lucastsl/",
  },
  skills: [
    {
      id: "dev",
      category: "Développement",
      name: "Développement Web",
      description: "Création d'applications web modernes et performantes.",
      focus: "JavaScript, TypeScript, Next.js, Node.js",
      items: ["JavaScript", "TypeScript", "PHP", "HTML/CSS", "Node.js", "Next.js", "Tailwind CSS"],
    },
    {
      id: "db",
      category: "Bases de données",
      name: "Gestion de la Donnée",
      description: "Modélisation et requêtage de bases de données relationnelles et NoSQL.",
      focus: "MongoDB, MySQL, PostgreSQL",
      items: ["MongoDB", "MySQL", "PostgreSQL"],
    },
    {
      id: "cms-design",
      category: "CMS & Design",
      name: "Conception & E-commerce",
      description: "Création de maquettes et intégration sur des CMS populaires.",
      focus: "WordPress, PrestaShop, Figma",
      items: ["WordPress", "PrestaShop", "Figma", "Canva"],
    },
    {
      id: "marketing-ai",
      category: "Webmarketing & IA",
      name: "Visibilité & Automatisation",
      description: "Optimisation SEO, analyse de trafic et intégration de l'Intelligence Artificielle.",
      focus: "SEO technique, Core Web Vitals, ChatGPT",
      items: ["SEO technique", "Core Web Vitals", "Google Analytics", "ChatGPT", "Copilot"],
    },
  ],
  projects: [
    {
      id: "woocommerce-stories",
      title: "Plugin WooCommerce (Stories immersives)",
      description: "Création d'une expérience vidéo type TikTok/Instagram pour l'e-commerce.",
      role: "Développeur Full-Stack",
      technologies: ["JavaScript", "CSS mobile-first", "API YouTube", "PHP", "WordPress"],
      githubUrl: "https://github.com/Lucas-tsl/woocommerce-stories",
      liveUrl: "",
    },
    {
      id: "image-processing-app",
      title: "Web App de Traitement d'Images",
      description: "Outil de conversion (WebP, AVIF) développé pour optimiser les performances web.",
      role: "Développeur Back-End",
      technologies: ["Node.js", "Express", "Sharp"],
      githubUrl: "https://github.com/Lucas-tsl/image-processing",
      liveUrl: "",
    },
    {
      id: "client-review-plugin",
      title: "Plugin Client Review",
      description: "Solution sur-mesure de gestion d'avis clients pour améliorer l'expérience utilisateur et le SEO.",
      role: "Développeur Full-Stack",
      technologies: ["PHP", "JavaScript", "MySQL"],
      githubUrl: "https://github.com/Lucas-tsl/client-review",
      liveUrl: "",
    },
  ],
};

export const profile = portfolioData.profile;
export const skillGroups = portfolioData.skills;
export const projects = portfolioData.projects;
