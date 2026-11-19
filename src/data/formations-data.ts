// Catalogue des formations — tout le contenu de la page /formations se modifie ici.
// Tarifs sur devis : le bouton de chaque formation ouvre le formulaire de contact pré-rempli.

export type FormationModule = {
  title: string;
  items: string[];
};

export type Formation = {
  id: string;
  title: string;
  tagline: string;
  audience: string;
  duration: string;
  prerequisites: string;
  objectives: string[];
  modules: FormationModule[];
};

export const FORMATIONS: Formation[] = [
  {
    id: "wordpress-woocommerce",
    title: "WordPress & WooCommerce : gérer son site en autonomie",
    tagline:
      "Prendre la main sur son site ou sa boutique, sans dépendre d'un prestataire pour chaque modification.",
    audience:
      "Indépendants, commerçants, associations et équipes marketing qui ont (ou vont avoir) un site WordPress.",
    duration: "1 à 2 jours, ou modules de 3 h",
    prerequisites: "Savoir utiliser un navigateur web. Un site existant est un plus, pas une obligation.",
    objectives: [
      "Publier et mettre à jour pages et articles en toute autonomie",
      "Gérer produits, commandes et stocks avec WooCommerce",
      "Choisir les bonnes extensions sans alourdir le site",
      "Sauvegarder, mettre à jour et sécuriser son site",
    ],
    modules: [
      {
        title: "Prise en main",
        items: [
          "Tableau de bord, rôles et utilisateurs",
          "Pages, articles et médias",
          "Éditeur de blocs et mise en page",
        ],
      },
      {
        title: "Boutique WooCommerce",
        items: [
          "Produits simples et variables",
          "Commandes, paiements et livraison",
          "Codes promo et e-mails clients",
        ],
      },
      {
        title: "Maintenance & sécurité",
        items: [
          "Mettre à jour sans rien casser",
          "Sauvegardes et restauration",
          "Bonnes pratiques de sécurité",
        ],
      },
    ],
  },
  {
    id: "seo-performance",
    title: "SEO & performance : être trouvé sur Google",
    tagline:
      "Comprendre comment Google classe les sites et appliquer les actions qui ont un vrai impact.",
    audience:
      "Dirigeants, indépendants et chargés de communication qui veulent plus de visibilité, sans jargon.",
    duration: "1 jour, ou 2 modules de 3 h",
    prerequisites: "Avoir un site en ligne (WordPress, Wix, Shopify… peu importe l'outil).",
    objectives: [
      "Comprendre les fondamentaux du référencement naturel",
      "Choisir ses mots-clés et rédiger des pages qui se positionnent",
      "Utiliser Google Search Console et la fiche Google Business",
      "Mesurer et améliorer la vitesse de son site",
    ],
    modules: [
      {
        title: "Les bases",
        items: [
          "Comment fonctionne un moteur de recherche",
          "Mots-clés et intention de recherche",
          "Structure d'une page bien référencée",
        ],
      },
      {
        title: "Les outils",
        items: [
          "Google Search Console pas à pas",
          "Fiche Google Business et référencement local",
          "Suivre ses résultats dans le temps",
        ],
      },
      {
        title: "La performance",
        items: [
          "Mesurer avec PageSpeed Insights",
          "Images, cache, extensions : les gains rapides",
          "Plan d'action priorisé pour votre site",
        ],
      },
    ],
  },
  {
    id: "ia-appliquee",
    title: "IA appliquée : gagner du temps au quotidien",
    tagline:
      "Utiliser ChatGPT, Claude et les outils d'IA de façon efficace et responsable dans son travail.",
    audience:
      "Professionnels de tous secteurs qui veulent intégrer l'IA concrètement, sans compétence technique.",
    duration: "1 jour, ou 2 modules de 3 h",
    prerequisites: "Aucun. Venir avec ses propres cas d'usage est recommandé.",
    objectives: [
      "Rédiger des consignes (prompts) qui donnent des résultats fiables",
      "Identifier les tâches à confier à l'IA dans son activité",
      "Connaître les limites : erreurs, confidentialité, RGPD",
      "Repartir avec une boîte à outils adaptée à son métier",
    ],
    modules: [
      {
        title: "Comprendre",
        items: [
          "Ce que l'IA générative sait (et ne sait pas) faire",
          "Panorama des outils : ChatGPT, Claude, Gemini, Copilot",
          "Confidentialité, RGPD et bonnes pratiques",
        ],
      },
      {
        title: "Pratiquer",
        items: [
          "Une méthode simple pour rédiger un bon prompt",
          "Rédaction, synthèses, e-mails, comptes rendus",
          "Analyse de documents et de données simples",
        ],
      },
      {
        title: "Automatiser",
        items: [
          "Repérer les tâches répétitives",
          "Premiers automatismes sans code",
          "Plan d'adoption pour votre équipe",
        ],
      },
    ],
  },
];

export const FORMATION_FORMATS = [
  {
    title: "À distance",
    description: "En visio, avec partage d'écran et exercices sur vos propres outils.",
  },
  {
    title: "En présentiel",
    description: "Dans vos locaux, à Bordeaux et ses environs.",
  },
  {
    title: "Sur mesure",
    description: "En individuel ou pour une équipe, avec un programme adapté à vos besoins.",
  },
];

export const FORMATION_STEPS = [
  { title: "Premier échange", description: "On fait le point sur votre besoin, votre niveau et vos objectifs." },
  { title: "Programme adapté", description: "Je vous propose un programme et un devis ajustés à votre situation." },
  { title: "Formation", description: "Des sessions concrètes, centrées sur la pratique et vos cas réels." },
  { title: "Après la formation", description: "Vous repartez avec les supports et pouvez revenir vers moi pour vos questions." },
];

export const FORMATION_FAQ = [
  {
    question: "Faut-il des connaissances techniques ?",
    answer:
      "Non. Les formations sont pensées pour des professionnels non techniques : on part de votre niveau et on avance pas à pas, sur des exemples concrets.",
  },
  {
    question: "Le programme peut-il être adapté ?",
    answer:
      "Oui. Chaque programme est une base de travail : durée, contenus et exemples sont ajustés à votre activité et à vos objectifs lors du premier échange.",
  },
  {
    question: "Les formations sont-elles finançables (CPF, OPCO) ?",
    answer:
      "Pas pour le moment : les formations sont facturées directement, sur devis. Contactez-moi pour en discuter selon votre situation.",
  },
  {
    question: "Comment se déroule une formation à distance ?",
    answer:
      "En visio, avec partage d'écran. Vous pratiquez directement sur vos outils (votre site, vos documents), ce qui rend les acquis immédiatement utiles.",
  },
];
