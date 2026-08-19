export type ProjectStatus = "Actif" | "Disponible" | "Déployé" | "En production";

export type ProjectCategory = "WordPress" | "Next.js" | "Node.js" | "Full-stack" | "Portfolio" | "Automatisation" | "Mobile";

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  about: string;
  email: string;
  github: string;
  linkedin: string;
  wordpress: string;
  location: string;
  available: boolean;
  /** Note affichée sous le badge de disponibilité (ex. échéance d'alternance, recherche de CDI) */
  availabilityNote?: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  name: string;
  description: string;
  focus: string;
  items: string[];
  /** Niveau de maîtrise 0-100, affiché dans le radar chart */
  level: number;
}

export interface ProjectPhase {
  date: string;
  label: string;
  description?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  /** Dimensions réelles du fichier — nécessaires à next/image, et préservent le ratio propre à chaque capture (portrait ou paysage) */
  width: number;
  height: number;
  caption?: string;
}

/** Déclinaison d'un même projet sur une autre plateforme (ex. WordPress / PrestaShop) */
export interface ProjectVariant {
  label: string;
  githubUrl: string;
  liveUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  status: ProjectStatus;
  year: string;
  category: ProjectCategory;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  highlights: string[];
  challenge?: string;
  result?: string;
  timeline?: ProjectPhase[];
  images?: ProjectImage[];
  /** Outil interne à usage professionnel, dépôt privé — n'affiche ni bouton Repository ni Voir en ligne */
  internal?: boolean;
  /** Quand un même projet existe en plusieurs versions (ex. plugin WordPress + module PrestaShop) */
  variants?: ProjectVariant[];
}

export interface ContactSubject {
  value: string;
  label: string;
  description: string;
  skills: string[];
}
