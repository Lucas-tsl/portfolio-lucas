import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MarkdownReader } from "./markdown-reader";

const SAMPLE_MARKDOWN = `
## Introduction

Cet article explore les meilleures pratiques pour optimiser les **Core Web Vitals** en 2024.

### Largest Contentful Paint (LCP)

Le LCP mesure le temps de chargement du plus grand élément visible. Objectif : **< 2,5 s**.

\`\`\`bash
npx next build && npx next start
\`\`\`

### Conseils clés

- Utiliser \`next/image\` avec \`priority\` sur les images above-the-fold
- Précharger les polices Google avec \`next/font\`
- Activer le streaming avec les Server Components

> "La performance n'est pas une fonctionnalité, c'est un pré-requis."

| Métrique | Seuil bon | Seuil à améliorer |
|----------|-----------|-------------------|
| LCP      | < 2.5s    | < 4s              |
| FID      | < 100ms   | < 300ms           |
| CLS      | < 0.1     | < 0.25            |
`;

const meta = {
  title: "Sections/MarkdownReader",
  component: MarkdownReader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    title: { control: "text" },
    summary: { control: "text" },
    body: { control: "text" },
  },
} satisfies Meta<typeof MarkdownReader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BlogPost: Story = {
  args: {
    title: "Optimiser les Core Web Vitals en Next.js",
    summary:
      "Guide complet pour améliorer le LCP, FID et CLS de vos applications Next.js et atteindre un score Lighthouse > 90.",
    body: SAMPLE_MARKDOWN,
    metadata: [
      ["Catégorie", "Performance"],
      ["Publié le", "15 janvier 2024"],
      ["Lecture", "5 min"],
      ["Tags", ["Next.js", "Performance", "Core Web Vitals"]],
    ],
  },
};

export const NoSummary: Story = {
  args: {
    title: "Notes techniques",
    body: "## Introduction\n\nUn contenu sans résumé.",
    metadata: [["Catégorie", "Docs"]],
  },
};

export const NoMetadata: Story = {
  args: {
    title: "Article simple",
    summary: "Un article sans métadonnées.",
    body: SAMPLE_MARKDOWN,
    metadata: [],
  },
};
