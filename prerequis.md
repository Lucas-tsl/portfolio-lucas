# Pré-requis & Checklist Environnement de Développement

Environnement local
- Node.js LTS (16+ ou 18+ recommandé)
- npm ou pnpm
- Git (configurer ton utilisateur et email)

Outils & dépendances
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui + Framer Motion + lucide-react
- Resend + react-email
- Zod pour validation
- (Optionnel) Prisma + Vercel Postgres

CI / CD
- Hébergement: Vercel (connecter au repo GitHub)
- Lint & Format: ESLint + Prettier
- Husky + lint-staged (pré-commit checks)

Base de données
- Démarrage: fichiers statiques (`src/data/`) — pas de BDD.
- Si évolution: Vercel Postgres + Prisma.

Données sensibles & variables d'environnement
- `.env.local` pour les clés privées.
- Inclure `.env.example` dans le repo avec les noms de variables.

Service d'emails
- Resend: obtenir `RESEND_API_KEY` et définir `CONTACT_EMAIL`.

Gestion de projet
- GitHub Projects ou Notion pour le suivi.
- Utiliser des branches feature/xxx et PRs pour chaque user story.

Accès & autorisations
- Lier Vercel au repo GitHub et activer les Preview Deploys.
