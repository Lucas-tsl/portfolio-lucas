# Cahier des Charges Technique — Portfolio Lucas Troteseil

Résumé

Projet: Portfolio personnel déployé sur Vercel via GitHub.
Stack cible: Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion.
Backend mail: Resend. Validation: Zod. ORM optionnel: Prisma + Vercel Postgres si besoin.

Objectifs fonctionnels
- Présenter la double casquette "Chef de projet Data / IA & Développeur Web".
- Mettre en valeur 2-3 projets phares avec pages détails et liens GitHub/démo.
- Fournir un formulaire de contact envoyé via Resend.
- Offrir thème clair/sombre et responsive design.

Architecture & structure attendues
- Génération: `npx create-next-app@latest portfolio-lucas` avec options:
  - TypeScript: Yes
  - ESLint: Yes
  - Tailwind CSS: Yes
  - src/ directory
  - App Router

- Dossiers principaux (`src/`):
  - app/: pages (page.tsx, layout.tsx) et route handlers (app/api/)
  - components/: ui/ (shadcn), sections/ (Hero, About, Projects, Contact), shared/ (Nav/Footer)
  - data/: `portfolio-data.ts` (bio, compétences, projets)
  - lib/: utilitaires (formatters, tw-merge)

Gestion des données
- Pour commencer: fichiers statiques TypeScript sous `src/data/portfolio-data.ts`.
- Si besoin futur: migration vers Vercel Postgres + Prisma.

API & Formulaire de contact
- Route: `app/api/contact/route.ts`
- Validation: `zod` pour `name`, `email`, `message`.
- Envoi: `resend` client — variable d'env `RESEND_API_KEY` et `CONTACT_EMAIL`.

DevOps & Qualité
- Linter: ESLint + Prettier.
- Hooks Git: Husky (pre-commit pour lint/staged).
- Déploiement: Vercel connecté au repo GitHub (déploiement automatique sur push).

Sécurité & bonnes pratiques
- Ne pas committer de clés dans le repo — utiliser `.env.local` et `.env.example`.
- Utiliser CSP et balises OpenGraph pour SEO.

Commandes d'initialisation recommandées
```
npx create-next-app@latest portfolio-lucas --typescript --eslint --tailwind --app --src-dir
cd portfolio-lucas
npm install resend react-email zod prisma @prisma/client
npx shadcn-ui@latest init
```
