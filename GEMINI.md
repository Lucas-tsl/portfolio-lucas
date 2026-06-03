# Instructions Projet : Portfolio

Ce fichier `GEMINI.md` définit les règles et le workflow à suivre pour garantir un développement propre, une intégration continue fluide et un déploiement Vercel stable. L'agent Gemini CLI s'y conformera lors de ses interventions.

## 1. Workflow Git & Branches
- **Branches par défaut** : La branche principale est `main` (ou `master`).
- **Nommage des branches** : Créez une nouvelle branche pour chaque tâche ou issue.
  - Fonctionnalité : `feat/nom-de-la-fonctionnalite`
  - Correction de bug : `fix/description-du-bug`
  - Documentation : `docs/mise-a-jour-doc`
  - Refactoring : `refactor/nom-du-refactoring`
- **Ne jamais commiter directement sur `main`**.

## 2. Commits & Messages (Conventional Commits)
- Utilisez la spécification des "Conventional Commits".
- Format : `<type>[optional scope]: <description>`
  - `feat:` : Nouvelle fonctionnalité
  - `fix:` : Correction de bug
  - `docs:` : Changement de documentation
  - `style:` : Formatage (sans impact sur la logique)
  - `refactor:` : Refactorisation du code
  - `test:` : Ajout ou modification de tests
  - `chore:` : Mise à jour des dépendances, configuration, etc.
- Exemple : `feat(ui): ajouter le mode sombre`

## 3. Pull Requests (PR) & Issues
- **Lien avec les Issues** : Toute PR doit faire référence à une Issue existante (ex: `Fixes #12` ou `Closes #34` dans la description).
- **Description claire** : Fournissez un résumé des changements, de la raison de ces changements, et des instructions pour les tester.
- **Validation** : Une PR doit être relue et validée (Review) avant d'être fusionnée.
- **Fusion** : Privilégiez un historique propre (ex: "Squash and merge") lors de l'intégration dans la branche principale.

## 4. CI/CD & Déploiement Vercel
- **Tests locaux obligatoires avant push** : 
  - Exécutez le linter (ex: `npm run lint`) pour éviter les erreurs de style ou de syntaxe.
  - Vérifiez que le build passe (ex: `npm run build`).
- **Déploiements Vercel** :
  - Chaque push sur une branche (ex: `feat/xxx`) génère un **Preview Deployment**. Celui-ci doit être testé avant la fusion.
  - La fusion sur `main` déclenche le **Production Deployment**. La branche `main` doit TOUJOURS être dans un état déployable et fonctionnel.
- **Variables d'environnement** : Ne commitez **jamais** de secrets (clés d'API, mots de passe). Utilisez un fichier `.env.example` pour lister les clés requises et configurez les vraies valeurs directement dans l'interface de Vercel.

## 5. Bonnes Pratiques de Code
- **Typage Strict** : Utilisez TypeScript de manière rigoureuse. Évitez l'utilisation de `any` ou des directives comme `@ts-ignore`.
- **Propreté** : Retirez les `console.log`, commentaires morts ou code commenté inutilisé avant de créer un commit.
- **Architecture** : Gardez les composants modulaires, petits et réutilisables. Maintenez une séparation claire entre la logique métier et l'interface utilisateur.
