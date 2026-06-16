export type ProjectStatus = "Actif" | "Disponible" | "Déployé" | "En production";

export type ProjectCategory = "WordPress" | "Next.js" | "Node.js" | "Full-stack" | "Portfolio";

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
}

export interface SkillGroup {
  id: string;
  category: string;
  name: string;
  description: string;
  focus: string;
  items: string[];
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
}

export interface ContactSubject {
  value: string;
  label: string;
  description: string;
  skills: string[];
}
