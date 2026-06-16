# Lucas Troteseil — Portfolio

> Portfolio de Lucas Troteseil — Chef de projet Data / IA & Développeur Web en alternance chez Groupe NOVI à Bordeaux.

**Live :** [lucastroteseil.com](https://lucastroteseil.com)

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 15 (App Router, SSG/ISR) |
| Langage | TypeScript 5 (strict) |
| Style | Tailwind CSS v4 |
| Animations | Framer Motion 11 |
| Dark mode | next-themes |
| Email | Resend |
| Validation | Zod |
| Charts | Recharts |
| Icônes tech | simple-icons |
| Icônes UI | Lucide React |
| Déploiement | Vercel |
| Analytiques | Vercel Analytics |

---

## Architecture

```
src/
├── app/
│   ├── page.tsx                  # Accueil (Hero, Stats, About, Skills, Projects…)
│   ├── about/                    # Parcours avec bottom nav Expérience / Formation
│   ├── projects/                 # Browser projets avec filtres
│   ├── technologies/             # Stack browser interactif
│   ├── blog/[slug]/              # Blog (Markdown)
│   ├── docs/[slug]/              # Docs Notion intégrées + Markdown
│   ├── opengraph-image.tsx       # OG image dynamique (edge, emerald)
│   └── api/
│       ├── contact/              # Email Resend + validation Zod
│       └── notion-image/         # Proxy images Notion (S3 + notionusercontent)
├── components/
│   ├── shared/                   # Navbar, Footer, CommandPalette
│   ├── sections/                 # Hero, Stats, About, Skills, Projects, Contact…
│   └── ui/                       # TechIcon (simple-icons), TagList
├── data/
│   └── portfolio-data.ts         # Source unique des données
├── lib/
│   ├── content.ts                # Parser Markdown frontmatter
│   └── notion-renderer.ts        # Renderer blocs Notion → JSX
└── content/
    ├── blog/                     # Articles .md
    ├── docs/                     # Documentation .md
    └── CV_2026-06-16_Lucas_Troteseil.pdf
```

---

## Features

- **Hero** : nom, titre, tagline, CTA "Me contacter" + "Voir mon GitHub" + téléchargement CV
- **Stats banner** : 4 métriques animées (5 projets · 4 marques · +40 % trafic · 98/100 Lighthouse)
- **Compétences** : cards par domaine + radar chart interactif (Recharts) avec barres colorées
- **Projets** : filtres stack / année / statut avec selects natifs
- **À propos** : bottom nav flottante Expérience ↔ Formation (apparaît au scroll)
- **Docs Notion** : intégration via API Notion + proxy images S3/notionusercontent
- **Blog & Documentation** : Markdown avec frontmatter, recherche, filtres, catégories
- **Formulaire de contact** : validation Zod + envoi email Resend
- **Open Graph** : image dynamique edge 1200×630, design emerald, stats row
- **Twitter Card** : summary_large_image avec creator handle
- **TechIcon** : 40+ icônes simple-icons avec abréviations et aria-labels
- **Dark mode** natif avec détection système
- **Accessibilité** : landmarks ARIA, skip link, navigation clavier, reduced-motion
- **SEO** : sitemap dynamique, robots.txt, JSON-LD, Open Graph, canonical

---

## Installation locale

### Prérequis

- Node.js 18+
- npm ou pnpm

### 1. Cloner le repo

```bash
git clone https://github.com/Lucas-tsl/portfolio-lucas.git
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
NOTION_API_KEY=secret_xxxxxxxxxxxx        # optionnel, pour les docs Notion
NOTION_DATABASE_ID=xxxxxxxxxxxx           # optionnel
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

Les variables d'environnement sont à configurer dans le dashboard Vercel.

---

## Contact

Lucas Troteseil — [lucastroteseil.com](https://lucastroteseil.com) — [LinkedIn](https://linkedin.com/in/lucas-troteseil) — [GitHub](https://github.com/Lucas-tsl)

---

*Next.js 15 · TypeScript · Tailwind CSS v4 · Vercel*
