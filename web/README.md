# Portfolio Lucas Troteseil (Web)

Application Next.js (App Router) pour le portfolio, avec:

- TypeScript + Tailwind CSS
- Sections: Hero, A propos, Competences, Projets, Contact
- Theme clair/sombre (`next-themes`)
- API contact (`/api/contact`) avec `zod` + `resend`

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Variables d'environnement

Copie `.env.example` vers `.env.local` et renseigne:

- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `NEXT_PUBLIC_SITE_URL`

## Structure principale

- `src/app/page.tsx`: page portfolio
- `src/app/api/contact/route.ts`: route d'envoi email
- `src/data/portfolio-data.ts`: profil, competences, projets
- `src/components/sections/*`: sections UI
- `src/components/shared/*`: navbar, footer, theme toggle

