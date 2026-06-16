---
name: project-portfolio-lucas
description: Context on the portfolio-lucas project — stack, architecture, recent refactoring done
metadata:
  type: project
---

Portfolio de Lucas Troteseil — Next.js 15 App Router + TypeScript strict + Tailwind v4 + Framer Motion.

**Why:** Personal portfolio for job applications, deployed at lucastroteseil.com via Vercel.

**How to apply:** When suggesting changes, keep the stack and design system consistent. Tailwind v4 with CSS custom properties for theming.

## Architecture post-refactoring (June 2026)

New directories added:
- `src/types/portfolio.types.ts` — Profile, SkillGroup, Project, ContactSubject, ProjectStatus, ProjectCategory
- `src/types/content.types.ts` — ContentFrontmatter (strict), ContentDocument<T> generic
- `src/hooks/use-contact-form.ts` — Contact form state extracted from component
- `src/hooks/use-filter.ts` — Generic reusable filter/search hook
- `src/hooks/use-reduced-motion.ts` — prefers-reduced-motion hook
- `src/lib/utils.ts` — cn(), formatDate(), slugify()
- `src/app/projects/page.tsx` — Dedicated projects page with SSG metadata
- `src/components/sections/projects-browser.tsx` — Interactive projects browser (filter by category/year/status + search)

## Key data notes
- `portfolio-data.ts` now imports types from `@/types/portfolio.types` and re-exports them
- Projects array uses `satisfies Project[]` for strict typing
- Each project has a `category: ProjectCategory` field (WordPress | Next.js | Node.js | Full-stack | Portfolio)
- Navbar links to `/projects` (dedicated page) instead of `/#projects` hash

## Content system
- Markdown files in `content/blog/` and `content/docs/`
- Frontmatter parsed by `src/lib/content.ts` (generic typed, now uses ContentFrontmatter from types/)
- Email via Resend at `/api/contact`, Zod validation on server

## Remaining roadmap
- Command Palette ⌘K (feature 2)
- Skills Radar Chart with Recharts (feature 3)
- Vitest unit tests for lib/content.ts and validations
- Error Boundary global
- DOMPurify for dangerouslySetInnerHTML in markdown-reader.tsx (content is own files so low risk, but good practice)
