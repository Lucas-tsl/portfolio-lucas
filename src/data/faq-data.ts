export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Tu es disponible pour de nouvelles missions ?",
    answer:
      "Oui, je suis actuellement disponible pour des missions freelance en développement web (Next.js, WordPress) et en pilotage de projets Data / IA. N'hésite pas à me contacter via le formulaire ci-dessous pour qu'on échange.",
  },
  {
    question: "Tu travailles en remote ou en présentiel ?",
    answer:
      "Je travaille principalement en remote depuis Bordeaux, ce qui me permet d'intervenir sur des projets partout en France. Des déplacements ponctuels sont possibles selon les besoins du projet.",
  },
  {
    question: "Quels types de projets acceptes-tu ?",
    answer:
      "Refonte de sites WordPress, développement d'applications web avec Next.js, intégration de pipelines de données, automatisation IA, ou encore conseil SEO technique. Je suis particulièrement à l'aise sur des projets qui mêlent développement et stratégie digitale.",
  },
  {
    question: "Comment se déroule une collaboration ?",
    answer:
      "On commence par un échange pour cerner le besoin, je propose une estimation et un cadrage. Ensuite on travaille en itérations courtes avec des points réguliers. Tu as accès à l'avancement en continu et on ajuste ensemble selon les retours.",
  },
  {
    question: "Tu proposes de la maintenance après livraison ?",
    answer:
      "Oui, je propose des contrats de maintenance pour les projets livrés : mises à jour, corrections, évolutions mineures et monitoring de performance. Les conditions sont définies selon le périmètre du projet.",
  },
  {
    question: "Quels sont tes délais habituels ?",
    answer:
      "Ça dépend de la complexité du projet. Un site WordPress sur-mesure se livre généralement en 3 à 6 semaines, une application Next.js en 4 à 10 semaines. Je fournis toujours une estimation détaillée avant de démarrer.",
  },
];
