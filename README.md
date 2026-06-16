# Lucas Troteseil — Portfolio

> Développeur web passionné par le Web, les interfaces soignées et l'open source. Ce portfolio présente mes projets, compétences et parcours.

**Live :** [lucastroteseil.com](https://lucastroteseil.com)

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| Langage | TypeScript 5 (strict) |
| Style | Tailwind CSS v4 |
| Animations | Framer Motion 11 |
| Dark mode | next-themes |
| Email | Resend |
| Validation | Zod |
| Déploiement | Vercel |
| Analytiques | Vercel Analytics |
| Icônes | Lucide React |

---

## Architecture

```
src/
├── app/                    # Routes Next.js App Router
│   ├── page.tsx            # Page d'accueil
│   ├── about/              # Parcours & timeline
│   ├── technologies/       # Stack browser
│   ├── blog/[slug]/        # Blog (Markdown)
│   ├── docs/[slug]/        # Documentation (Markdown)
│   └── api/contact/        # API email (Resend + Zod)
├── components/
│   ├── shared/             # Navbar, Footer, ThemeToggle
│   ├── sections/           # Hero, Skills, Projects, Contact…
│   └── providers/          # ThemeProvider
├── data/
│   └── portfolio-data.ts   # Source unique des données
├── lib/
│   └── content.ts          # Parser Markdown frontmatter
└── content/
    ├── blog/               # Articles .md
    └── docs/               # Documentation .md
```

---

## Features

- **Dark mode** natif avec détection système
- **Blog & Documentation** en Markdown avec frontmatter (recherche, filtres, catégories)
- **Stack browser** interactif avec recherche
- **Formulaire de contact** validé (Zod) avec envoi email (Resend)
- **SEO complet** : sitemap dynamique, robots.txt, Open Graph, JSON-LD, Twitter cards
- **Accessibilité RGAA 4.1.2** : landmarks ARIA, skip link, navigation clavier
- **Animations Framer Motion** avec `whileInView` et `once: true`
- **SSG** sur toutes les pages publiques (`generateStaticParams`)

---

## Screenshots

| Page d'accueil | À propos | Blog |
|---|---|---|
| ![Home](docs/screenshots/home.png) | ![About](docs/screenshots/about.png) | ![Blog](docs/screenshots/blog.png) |

---

## Installation locale

### Prérequis

- Node.js 18+
- npm ou pnpm

### 1. Cloner le repo

```bash
git clone https://github.com/lucasTrotesel/portfolio-lucas.git
cd portfolio-lucas
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Variables d'environnement

```bash
cp .env.example .env.local
```

Renseigner dans `.env.local` :

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=ton@email.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Lancer en développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### 5. Build de production

```bash
npm run build
npm run start
```

---

## Contenu Markdown

Les articles de blog et les pages de documentation sont des fichiers `.md` dans `content/`.

**Format frontmatter :**

```md
---
title: Titre de l'article
summary: Description courte
publishedAt: 2024-01-15
category: Next.js
tags: [react, typescript]
readTime: 5
---

Contenu en Markdown...
```

---

## Déploiement

Le projet est déployé automatiquement sur **Vercel** à chaque push sur `main`.

Aucune configuration supplémentaire n'est nécessaire. Les variables d'environnement sont à configurer dans le dashboard Vercel.

---

## Roadmap

- [ ] Page `/projects` dédiée avec filtres (stack / type / année)
- [ ] Command Palette `⌘K` pour navigation rapide
- [ ] Skills Radar Chart interactif (Recharts)
- [ ] `prefers-reduced-motion` sur toutes les animations
- [ ] Tests unitaires (Vitest) sur `lib/content.ts` et validations Zod
- [ ] Error Boundary global
- [ ] Storybook pour les composants UI
- [ ] Conformité RGAA 4.1.2 complète

---

## Contact

Lucas Troteseil — [lucastroteseil.com](https://lucastroteseil.com) — [LinkedIn](https://linkedin.com/in/lucas-troteseil) — [GitHub](https://github.com/lucasTrotesel)

---

*Portfolio — Next.js 15 + TypeScript + Tailwind CSS v4*
