---
title: "ChatGPT et GitHub Copilot dans mon workflow : ce qui marche vraiment"
summary: "Après un an à intégrer l'IA dans mon quotidien de développeur web, voici ce qui m'a fait gagner du temps, ce qui m'a fait perdre du temps, et comment j'ai fini par trouver un équilibre."
category: "IA / Productivité"
tags: ["ia", "chatgpt", "github-copilot", "workflow", "productivite"]
publishedAt: "2026-04-28"
status: "Publié"
---

Il y a un an, j'utilisais ChatGPT comme un moteur de recherche glorifié. Aujourd'hui, il fait partie de la majorité de mes sessions de développement — pas comme un oracle, mais comme un outil parmi d'autres, avec ses forces et ses angles morts.

Voici un bilan honnête après plus d'un an d'usage intensif, entre mes projets personnels et mon travail chez Groupe NOVI.

## Les cas d'usage qui ont vraiment changé ma vitesse

### Rédiger les regex et les transformations de données

Je ne suis pas fan des regex. Je les lis, je comprends ce qu'elles font, mais les écrire de mémoire est lent et source d'erreurs. Copilot les génère en contexte, et ChatGPT les explique si le résultat est opaque.

Exemple concret : nettoyer 250 fiches produits exportées d'un ERP avec des formats d'unités incohérents (`"500 ml"`, `"500ml"`, `"0.5 L"`). Une regex + une fonction de normalisation écrites en 3 minutes au lieu de 20.

### Générer les boilerplates de composants React

Créer un nouveau composant Next.js avec les bons imports, la bonne structure TypeScript et les bonnes classes Tailwind à partir d'une description en langage naturel est devenu instantané avec Copilot.

Je décris ce que je veux dans un commentaire :
```tsx
// Section hero avec titre animé, sous-titre, deux boutons CTA et une carte latérale
```

Copilot propose une structure complète que je corrige et affine. Je gagne le temps de la structure, je garde le contrôle sur la logique.

### Écrire les requêtes SQL d'analyse

Sur des projets data, transformer un besoin métier ("quels produits ont un taux de retour > 5 % sur les 3 derniers mois ?") en requête SQL propre avec les bons JOIN et les bons filtres est nettement plus rapide avec ChatGPT. Je renseigne le schéma, il propose la requête, je l'adapte et je la teste.

### Comprendre du code hérité

Sur du code PHP WordPress de 2017 sans commentaires, Copilot Chat (dans VS Code) peut décrire ce qu'une fonction fait en quelques secondes. C'est particulièrement utile quand on reprend un projet d'un autre développeur.

## Ce qui ne marche pas, ou mal

### Faire confiance aux réponses sans vérifier

L'hallucination reste le problème principal. ChatGPT invente des fonctions qui n'existent pas, cite des versions de packages incorrectes, et donne des réponses qui semblent plausibles mais sont fausses.

Règle que j'ai adoptée : **tout ce que Copilot génère passe par les tests ou par une lecture critique avant d'être considéré comme valide**. L'IA accélère l'écriture, pas la validation.

### Générer de l'architecture ou des décisions techniques complexes

"Quelle est la meilleure façon de structurer ce projet ?" n'est pas une bonne question pour ChatGPT. La réponse sera générique et rarement adaptée au contexte réel (contraintes de l'équipe, dette technique existante, priorités business).

Pour les décisions d'architecture, je préfère lire de la documentation ou des retours d'expérience humains.

### Remplacer la réflexion sur le problème

L'erreur classique du développeur débutant avec l'IA : donner le symptôme à ChatGPT avant même d'avoir compris le problème. Résultat : une solution au mauvais problème. L'IA est bien meilleure en outil d'exécution qu'en outil de diagnostic.

## Comment j'organise maintenant mon workflow

**Phase 1 — Comprendre le besoin** : je ne touche pas à l'IA. Je lis, je réfléchis, j'esquisse sur papier si besoin.

**Phase 2 — Écrire le code** : Copilot actif dans VS Code. Je l'utilise pour les structures répétitives, les imports, les types TypeScript. Je désactive les suggestions sur les parties critiques qui demandent de la concentration.

**Phase 3 — Debug** : ChatGPT en cas de blocage de plus de 10 minutes. Je colle le code, l'erreur et le contexte. Souvent, reformuler le problème pour l'expliquer à ChatGPT suffit à trouver la solution soi-même.

**Phase 4 — Review** : je relis tout ce que Copilot a généré comme si c'était du code d'un collègue junior. Bonne posture pour attraper les problèmes de performance ou de sécurité.

## Le vrai gain : la réduction de la friction

Le bénéfice le plus difficile à quantifier, mais le plus réel : l'IA réduit la friction sur les tâches pénibles. Les tâches pénibles sont celles qu'on reporte, qu'on bâcle ou qu'on évite.

Écrire un test unitaire pour une fonction qu'on sait correcte mais qu'on n'a pas envie de tester, ça devient moins rebutant si Copilot génère la structure de base. Documenter une API pour un collègue, pareil.

Ce n'est pas de la magie — c'est juste enlever les raisons de ne pas faire les choses bien.

---

Je ne pense pas que l'IA remplace le développeur. Elle change les tâches qui demandent du temps : les tâches mécaniques sont accélérées, le temps libéré va vers la réflexion et la résolution de problèmes complexes. C'est un rééquilibrage, pas une substitution.
