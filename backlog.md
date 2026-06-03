# Backlog Produit — Epics et User Stories

Epic 1 — Présentation & Marque Personnelle (Hero & About)

US 1.1 — Hero Section
- En tant que visiteur, je veux voir immédiatement le nom et l'intitulé de poste afin de comprendre l'expertise proposée.

US 1.2 — Call to Action (CTA)
- En tant que recruteur ou prospect, je veux avoir accès à deux boutons d'action clairs ("Me contacter" et "Voir le GitHub").

US 1.3 — Section À propos
- En tant que visiteur, je veux lire une présentation concise de la vision stratégique et technique.

US 1.4 — Compétences
- En tant que recruteur technique, je veux visualiser les compétences organisées par catégories.

Epic 2 — Showcase des Projets (Portfolio)

US 2.1 — Grille de Projets
- En tant que visiteur, je veux voir une galerie des projets phares sous forme de cartes visuelles.

US 2.2 — Détail d'un Projet
- En tant que visiteur, je veux cliquer sur un projet pour lire une description, les technos et mon rôle.

US 2.3 — Liens Externes
- En tant que développeur pair, je veux un lien direct vers le repo GitHub ou la démo en ligne.

US 2.4 — Filtrage (Optionnel)
- En tant qu'utilisateur, je veux filtrer les projets par tags (Front-End, Back-End, UX).

Epic 3 — Prise de Contact & Réseaux

US 3.1 — Formulaire de contact
- En tant que prospect, je veux remplir un formulaire simple (Nom, Email, Message) pour envoyer une proposition.

US 3.2 — Validation du formulaire
- En tant qu'utilisateur, je veux voir des messages d'erreur si je remplis mal le formulaire et une confirmation en cas de succès.

US 3.3 — Liens Sociaux
- En tant que professionnel, je veux trouver facilement LinkedIn et GitHub.

Epic 4 — Technique, DevOps & SEO

US 4.1 — Responsive Design
- En tant qu'utilisateur mobile, je veux que l'interface s'adapte parfaitement à mon écran.

US 4.2 — Mode Sombre/Clair
- En tant que visiteur, je veux basculer entre thème clair et sombre.

US 4.3 — SEO & Core Web Vitals
- En tant que moteur de recherche, je veux des balises meta optimisées et un site rapide.

US 4.4 — CI/CD Vercel
- En tant que développeur, je veux que chaque push déclenche un build et un déploiement automatique sur Vercel.

Tâches techniques (exemples)
- Créer `src/data/portfolio-data.ts` avec le modèle TypeScript du projet.
- Implémenter `app/api/contact/route.ts` avec Zod + Resend.
- Configurer `tailwind.config.ts` et `metadata` global dans `layout.tsx`.
