---
name: add-portfolio-project
description: Add a new project card to this portfolio from a GitHub repo (public or private). Fetches repo metadata/README via gh, drafts a Project entry matching this codebase's exact data shape, optionally builds a screenshot carousel, and follows the repo's required git workflow (branch → build → merge → push). Use when the user gives one or more GitHub repo URLs and asks to add them as portfolio projects.
---

# Add a portfolio project

This repo's `CLAUDE.md` mandates: never commit to `main` directly, and
always run `npm run build` before merging. Follow that for every step
below — it's not optional here (see "Des bugs de prod ont été
introduits car des merges partaient sans vérification du build
Vercel").

## 1. Gather source material

For each repo URL given, fetch metadata and README with `gh` (works
for private repos too, as long as the authenticated account has
access — no need for the repo to be public):

```bash
gh repo view <owner>/<repo> --json name,description,isPrivate,repositoryTopics,primaryLanguage
gh api repos/<owner>/<repo>/readme --jq .content | base64 -d
```

Read the README fully before writing anything — highlights, challenge,
result and timeline entries must be grounded in what the README
actually says, not invented. If the repo has no README or it's too
thin to write a credible project card, ask the user for more context
rather than filling gaps with generic filler.

## 2. Decide public vs internal

Check `isPrivate` from step 1:

- **Public repo** → `githubUrl` is the real repo URL. If there's a
  known live/demo URL, set `liveUrl` too; otherwise `""`.
- **Private repo** → set `githubUrl: ""` and `liveUrl: ""`, and add
  `internal: true`. Never link a private repo — visitors who aren't
  collaborators get a 404, which reads as a broken portfolio. The
  `internal: true` flag renders a "🔒 Interne" badge (see
  `src/components/sections/projects-browser.tsx`,
  `src/components/sections/projects.tsx`, and
  `src/app/projects/[slug]/page.tsx` — the same `project.internal`
  check is duplicated in these three places, so if you add a new
  rendering surface for projects, replicate the check there too).
  Mention "Dépôt privé" in the description so it reads as intentional.

## 3. Match the data shape exactly

Types live in `src/types/portfolio.types.ts`:

- `ProjectStatus`: `"Actif" | "Disponible" | "Déployé" | "En production"`
- `ProjectCategory`: check the current union before adding a new
  value — reuse an existing category if it genuinely fits, only
  extend the union for a real gap (e.g. `"Automatisation"` and
  `"Mobile"` were added because nothing else fit a Playwright bot or
  a React Native app).
- `Project` fields: `id, title, description, role, status, year,
  category, technologies[], githubUrl, liveUrl, highlights[],
  challenge?, result?, timeline?: ProjectPhase[], images?:
  ProjectImage[], internal?, variants?: ProjectVariant[]`.
- `ProjectImage` requires `width`/`height` (real pixel dimensions,
  not guesses) — next/image needs them, and the gallery carousel
  relies on them to preserve each screenshot's natural aspect ratio
  instead of distorting or cropping it.
- `ProjectVariant` is for one project shipped as multiple platform
  builds (see `id: "navi"` in `src/data/portfolio-data.ts` — WordPress
  + PrestaShop as two variants of one card rather than two separate
  projects). Only use this when it's genuinely the same project, not
  for unrelated projects that happen to share a technology.

Write `highlights` (bullet list), `challenge` (the constraint/problem
that made this non-trivial), `result` (concrete outcome — numbers,
production status, adoption), and `timeline` (2–4 phases) in the same
tone as existing entries: concrete, no marketing fluff, French.

## 4. Insert into the data file

Add the new project object to the `projects` array inside
`portfolioData` in `src/data/portfolio-data.ts`. Place it near
thematically related projects (e.g. group internal Groupe NOVI tools
together) rather than always appending at the end.

If you added a new `ProjectCategory` value, update the union in
`src/types/portfolio.types.ts` first.

## 5. Screenshots (optional, only if the user provides images)

Never invent screenshots. If the user gives a folder of raw browser
screenshots:

1. Crop each one with `sharp` down to the actual UI element (modal,
   panel, admin screen) — raw screenshots include browser chrome and
   unrelated page content that don't belong in a portfolio gallery.
   Get real pixel dimensions of each crop (`sharp(...).metadata()`)
   for the `width`/`height` fields.
2. Save crops under `public/images/projects/<project-id>/`.
3. Add them to the project's `images` array with a descriptive `alt`
   and a short `caption`.
4. Rendering is already wired: `src/app/projects/[slug]/page.tsx`
   renders any `images` array through
   `src/components/sections/project-gallery.tsx`, a horizontal
   scroll-snap carousel (flex row, `items-start` — don't remove that
   class, it stops short cards from stretching to match a taller
   neighbor, which was a real bug the first time this was built).
   Nothing else needs wiring for a new project's gallery to work.

## 6. Build and visually verify before merging

```bash
npm run build
```

Then start the built app and check the new card + detail page render
correctly (no missing images, badges in the right place, action
buttons present/absent as expected for public/internal):

```bash
npm run start -- -p <free-port>
```

Use Playwright (already a project dependency) from a throwaway script
run inside the repo directory (module resolution needs it there, not
in a temp dir) to screenshot `/projects` and
`/projects/<project-id>`, and read the screenshots back before
declaring the work done. Delete the throwaway script afterward — don't
commit it. Kill the dev server (`lsof -ti:<port> -sTCP:LISTEN | xargs
-r kill`) when finished.

## 7. Git workflow

```bash
git checkout -b feat/<project-id>
# ...edits, npm run build, verify...
git add -A
git commit -m "..."
git checkout main
git merge --no-ff feat/<project-id> -m "Merge branch 'feat/<project-id>'"
git push origin main
git branch -d feat/<project-id>
```

Confirm with the user before the merge/push step unless they've
already told you to proceed autonomously for this session — pushing
to `main` deploys to production via Vercel's CI/CD.
