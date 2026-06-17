# Règles de travail — Portfolio Lucas Troteseil

## Workflow Git obligatoire

**Ne jamais développer sur `main` directement.**

Pour chaque feature ou fix :
1. `git checkout -b feat/nom` ou `git checkout -b fix/nom`
2. Développer + vérifier en preview
3. **`npm run build`** — build prod complet, zéro erreur avant tout merge
4. `git checkout main && git merge --no-ff feat/nom && git push origin main && git branch -d feat/nom`

> Des bugs de prod ont été introduits car des merges partaient sans vérification du build Vercel. Le dev server masque des erreurs que `next build` détecte.

## Contraintes Next.js connues

- `export const runtime` doit être une **string littérale** : `"edge"` ou `"nodejs"`. Jamais une variable importée.
- Les fichiers `opengraph-image.tsx` avec `runtime = "edge"` ne peuvent pas importer `node:fs` ou `node:path`.
- Les fichiers qui lisent le filesystem (via `src/lib/content.ts`) doivent rester en runtime Node.js (pas d'export `runtime`, ou `runtime = "nodejs"`).

## Stack

- Next.js 15 App Router, TypeScript strict, Tailwind CSS v4
- Framer Motion pour les animations
- Vercel pour le déploiement (CI/CD automatique sur push main)
- Resend pour les emails
- next-themes pour le thème sombre/clair

## Structure

- `src/app/` — pages App Router (Server Components par défaut)
- `src/components/` — composants partagés et sections
- `src/data/portfolio-data.ts` — toutes les données du portfolio
- `src/lib/content.ts` — lecture des fichiers Markdown (blog, docs)
- `content/blog/` et `content/docs/` — contenu Markdown
- `src/lib/og-image.tsx` — template partagé pour les OG images
