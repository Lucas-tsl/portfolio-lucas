---
title: "Trois automatisations internes, trois contraintes non négociables"
summary: "Un bot qui publie des avis clients, un monitoring qui surveille un tunnel de commande en production, une extension qui affiche des fiches produit — retour sur trois outils internes développés pour le Groupe NOVI, et la règle de sécurité qui a guidé chacun."
category: "Automatisation"
tags: ["automatisation", "playwright", "python", "typescript", "outillage-interne"]
publishedAt: "2026-08-14"
status: "Publié"
---

Trois automatisations, trois besoins différents — publier des avis clients, surveiller un tunnel de commande, afficher une fiche produit — mais un même point commun dans la façon dont je les ai conçues : chacune part d'une contrainte de sécurité ou de fiabilité posée *avant* d'écrire la première ligne de logique métier, pas ajoutée après coup.

## Review Automator : un contexte de navigation par avis, pas un seul pour tous

Le besoin de départ était simple : des avis clients programmés dans un Google Sheet devaient être publiés sur Physiomins le jour dit, sans que quelqu'un ait à le faire à la main chaque matin. Le CMS n'exposait aucune API d'avis — la seule option était de piloter le vrai formulaire du site avec [Playwright](https://playwright.dev/).

La première version utilisait un seul navigateur pour traiter tous les avis du jour à la suite. Elle fonctionnait, jusqu'à ce que des avis se mélangent entre eux — un cookie de session resté actif d'un avis au suivant faussait parfois le formulaire suivant.

La contrainte retenue ensuite : **un contexte incognito Playwright par avis**, sans exception.

```python
for review in reviews_to_publish:
    with browser.new_context()  # contexte isolé, aucun état partagé
        page = context.new_page()
        # remplissage + soumission du formulaire, propre à cet avis
```

Chaque avis démarre dans un environnement vierge — aucun cookie, aucun état de formulaire résiduel ne peut fuiter d'un avis au suivant. Le reste de la fiabilisation (fermeture automatique des popups bloquants, gestion du champ email requis) est venu ensuite, en observant les échecs réels en production plutôt qu'en anticipant tous les cas possibles.

Le script lit le planning via Pandas, ne traite que les lignes `status=TODO` dont la date correspond au jour, et **reprend automatiquement** là où il s'était arrêté si on le relance — les codes déjà marqués `POSTED` ne sont jamais retraités.

## LSG Checkout Monitor : la règle qui a défini toute l'architecture avant le premier test

Ce projet a commencé par une question inhabituelle, posée avant tout code : *peut-on tester un tunnel de commande en production sans jamais risquer un vrai paiement ?*

La réponse a déterminé toute l'architecture. Le compte marchand Sogecommerce de lessenteursgourmandes.fr n'a pas de mode test séparé de la clé de production — le site tourne en production pour de vrais clients. Un scénario de monitoring qui irait jusqu'au bout du paiement mettrait donc en jeu de l'argent réel à chaque exécution automatisée.

La règle posée dès le départ, non négociable : **le monitoring automatisé s'arrête volontairement à la redirection vers la passerelle de paiement**, jamais après.

```typescript
// Le test réussit si la redirection Sogecommerce a bien lieu —
// preuve que panier, checkout, livraison et Colissimo fonctionnent.
// Aucun champ de carte n'est rempli ni soumis.
await page.waitForURL(/sogecommerce/);
```

Avant d'écrire le moindre sélecteur, une reconnaissance en lecture seule du site a permis de confirmer, sans jamais saisir de donnée personnelle ni passer commande, que le checkout utilisait le WooCommerce Blocks Checkout (React) plutôt que le shortcode classique, que le point relais Colissimo s'affichait dans une modale avec une carte Leaflet plutôt qu'un iframe tiers, et que l'identifiant de la passerelle de paiement était `sogecommercestd`.

Deux scénarios (point relais, livraison à domicile) tournent chaque jour ouvré via GitHub Actions. Après chaque run, la commande "en attente de paiement" que WooCommerce a créée juste avant la redirection est retrouvée par l'email de test fixe et **annulée automatiquement** via l'API REST, avec une note explicative — le tunnel de commande de production n'accumule jamais de commandes de test orphelines. Un email de statut part à chaque exécution, succès ou échec.

Une vérification manuelle complète, avec une vraie carte temporaire, reste possible via `npm run recon` — mais c'est une action humaine et occasionnelle, jamais quelque chose que le cron fait pour moi.

## Fiche Produit Dotations : ne jamais distribuer une clé API à toute une équipe

Le besoin ici était différent : donner à l'équipe dotations un accès instantané à la fiche complète d'un produit (marque, type, contenance, description, image) depuis l'outil de gestion interne, sans naviguer vers dix onglets différents.

La solution évidente — une extension Chrome qui interroge une API à chaque clic — posait un problème immédiat : elle aurait exigé de distribuer une clé API individuelle à chaque personne de l'équipe, avec tout ce que ça implique en gestion des accès et en coût par requête.

La contrainte retenue : **une seule génération, une base statique distribuée à tous**.

```bash
ANTHROPIC_API_KEY=sk-ant-... node generate-database.js catalogue.csv products.json
```

Un script Node.js, exécuté une fois par trimestre par une seule personne avec sa propre clé, interroge l'API Anthropic avec recherche web pour chaque produit du catalogue et écrit le résultat au fur et à mesure dans un fichier `products.json`. Ce fichier est ensuite distribué à toute l'équipe — l'extension l'embarque directement, sans aucun appel réseau à l'usage.

Le script est idempotent : relancé sur un catalogue mis à jour, il ignore les codes déjà présents dans `products.json` et ne traite que les nouveaux produits du trimestre. Une interruption en cours de route n'oblige jamais à tout recommencer.

## Le fil commun

Ces trois outils n'ont presque rien en commun techniquement — Python et Playwright pour l'un, TypeScript et GitHub Actions pour l'autre, une extension Chrome et l'API Anthropic pour le dernier. Ce qu'ils partagent, c'est la méthode : identifier la contrainte qui ne doit jamais céder — l'isolation entre avis, l'arrêt avant paiement, l'absence de clé API distribuée — et concevoir toute l'architecture autour, avant d'optimiser quoi que ce soit d'autre.

---

Ces trois projets sont des outils internes développés pour le Groupe NOVI, à dépôt privé.
