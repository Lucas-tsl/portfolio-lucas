export const portfolioData = {
  profile: {
    name: "Lucas Troteseil",
    title: "Chef de projet Data / IA & Développeur Web",
    catchphrase: "À la recherche de nouveaux défis, de projets créatifs et de collaborations inspirantes.",
    about: "Profil hybride, mêlant la vision technique du développement et la gestion de projet stratégique. Passionné par les nouvelles technologies, l'apprentissage continu (japonais, Swift), le surf et l'escalade.",
    email: "contact@lucastroteseil.com",
    github: "https://github.com/Lucas-tsl",
    linkedin: "https://www.linkedin.com/in/lucas-tsl/",
  },
  skills: [
    {
      category: "Développement",
      items: ["JavaScript", "TypeScript", "PHP", "HTML/CSS", "Node.js", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Bases de données",
      items: ["MongoDB", "MySQL", "PostgreSQL"],
    },
    {
      category: "CMS & Design",
      items: ["WordPress", "PrestaShop", "Figma", "Canva"],
    },
    {
      category: "Webmarketing & IA",
      items: ["SEO technique", "Core Web Vitals", "Google Analytics", "ChatGPT", "Copilot"],
    },
  ],
  projects: [
    {
      id: "woocommerce-stories",
      title: "Plugin WooCommerce (Stories immersives)",
      description: "Création d'une expérience vidéo type TikTok/Instagram pour l'e-commerce.",
      technologies: ["JavaScript", "CSS mobile-first", "API YouTube", "PHP", "WordPress"],
      githubUrl: "https://github.com/Lucas-tsl/woocommerce-stories",
    },
    {
      id: "image-processing-app",
      title: "Web App de Traitement d'Images",
      description: "Outil de conversion (WebP, AVIF) développé pour optimiser les performances web.",
      technologies: ["Node.js", "Express", "Sharp"],
      githubUrl: "https://github.com/Lucas-tsl/image-processing",
    },
    {
      id: "client-review-plugin",
      title: "Plugin Client Review",
      description: "Solution sur-mesure de gestion d'avis clients pour améliorer l'expérience utilisateur et le SEO.",
      technologies: ["PHP", "JavaScript", "MySQL"],
      githubUrl: "https://github.com/Lucas-tsl/client-review",
    },
  ],
};

export const profile = portfolioData.profile;
export const technologyItems = portfolioData.skills;