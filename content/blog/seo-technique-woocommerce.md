---
title: "SEO technique WooCommerce : structure, balisage et maillage pour un e-commerce qui se positionne"
summary: "Au-delà des Core Web Vitals, le SEO technique d'un site WooCommerce repose sur des fondamentaux souvent négligés : structure des URLs, balisage des fiches produits, maillage interne, sitemap et gestion du contenu dupliqué. Retour d'expérience concret."
category: "SEO / E-commerce"
tags: ["seo-technique", "woocommerce", "wordpress", "e-commerce", "balisage", "maillage-interne"]
publishedAt: "2026-06-10"
status: "Publié"
---

Quand on parle de SEO WooCommerce, la conversation tourne vite autour des plugins (Yoast, Rank Math) ou des performances. C'est nécessaire, mais insuffisant. Après plusieurs mois à travailler sur le référencement de boutiques e-commerce — certaines avec plus de 250 fiches produits — voici ce qui fait vraiment la différence au niveau technique.

## La structure des URLs : une décision qu'on regrette tard

WooCommerce génère par défaut des URLs dans ce style : `/produit/nom-du-produit/`. Le problème vient quand les catégories s'accumulent, que les filtres de WooCommerce créent des variantes d'URL (`?color=rouge&size=m`) et que le contenu finit indexé plusieurs fois.

Deux règles à poser dès le départ :

- **Activer l'URL de base de la boutique** dans les réglages de permaliens : `/boutique/categorie/produit/` est plus propre pour le maillage et l'arborescence sémantique.
- **Canoniquer les pages filtrées** : les URLs générées par les filtres de layered navigation (couleur, taille, prix) ne doivent pas être indexées. Soit on les exclut via `robots.txt`, soit on injecte un `<link rel="canonical">` qui pointe vers la catégorie parente.

Sur un site avec 250+ produits, ne pas gérer ce point, c'est exposer 500 à 1 000 pages dupliquées à Google.

## Le balisage des fiches produits : ce que Google lit vraiment

Les balises `<title>` et `<meta description>` sont le minimum. Mais pour les fiches produits, trois points vont plus loin :

### Les données structurées Product

WooCommerce + Yoast ou Rank Math génèrent un schéma `Product` basique. Le problème : il manque souvent les champs qui déclenchent les rich results dans les SERP — notamment `aggregateRating`, `offers` avec disponibilité (`InStock`, `OutOfStock`) et `sku`.

Vérifier dans Google Search Console > Améliorations > Fiches produits que les champs requis sont bien remontés. Les erreurs les plus fréquentes : `offers.price` absent ou `offers.priceCurrency` incorrect.

### Les balises Hn dans les descriptions

Les descriptions WooCommerce sont souvent rédigées dans l'éditeur visuel avec des titres H2/H3 intégrés. C'est bien pour la lisibilité, mais il faut s'assurer que le H1 de la page est bien le nom du produit (géré par le thème) et que les Hn dans la description commencent bien en H2 — pas en H1 ou H3 directement.

### Les attributs image

Sur 250 fiches produits, les balises `alt` sont rarement remplies. C'est une perte double : accessibilité et référencement image. Un script Python ou une requête SQL directe sur la base WooCommerce peut auditer et pré-remplir les `alt` manquants à partir du nom du produit et de la catégorie.

## Le maillage interne : l'arme sous-utilisée

Le maillage interne, c'est la façon dont les pages se passent de l'autorité entre elles. Sur un WooCommerce, plusieurs patterns fonctionnent bien :

**Catégories → Sous-catégories → Produits**
La hiérarchie naturelle doit être reflétée dans les breadcrumbs (WooCommerce les génère nativement) et dans les liens internes des descriptions de catégories. Une description de catégorie de 150 mots avec 3-4 liens vers des sous-catégories ou des produits phares, c'est suffisant.

**Produits → Produits liés**
WooCommerce propose nativement les sections "Produits liés" et "Upsells". Au-delà de l'aspect commercial, ces sections créent des liens internes pertinents. L'idéal : les configurer manuellement sur les produits les plus importants, et laisser WooCommerce gérer le reste par catégorie.

**Pages CMS → Boutique**
Les pages "À propos", "Blog", "Livraison" sont souvent des culs-de-sac. Ajouter des liens contextuels vers des catégories ou des produits phares dans ces pages renforce leur pertinence sémantique.

## Sitemap et robots.txt : ce qu'il faut exclure

Par défaut, WooCommerce + Yoast génèrent un sitemap qui inclut tout : pages produits, pages de compte, pages de panier, pages de commande. C'est une erreur.

**À exclure du sitemap :**
- `/mon-compte/` et sous-pages
- `/panier/`, `/commander/`, `/commande-reçue/`
- Les pages de politique de confidentialité et CGV (faible valeur SEO)
- Les pages d'étiquettes produits si elles ne contiennent pas de contenu éditorial

**Dans `robots.txt` :**
```
Disallow: /mon-compte/
Disallow: /panier/
Disallow: /commander/
Disallow: /?add-to-cart=
Disallow: /wp-admin/
```

La règle `?add-to-cart=` est souvent oubliée. Elle bloque l'indexation des URLs générées quand un utilisateur ajoute un produit au panier depuis une page catégorie.

## Le contenu dupliqué : un problème structurel de WooCommerce

WooCommerce génère nativement plusieurs types de contenu dupliqué :

- **Variations de produits** : si chaque variation (taille, couleur) a sa propre URL, Google peut les indexer séparément avec un contenu quasi-identique.
- **Pages de tags** : les tags produits créent des pages d'archives qui peuvent dupliquer le contenu des catégories.
- **Pagination** : les catégories avec beaucoup de produits génèrent des pages `?page=2`, `?page=3` qui diluent l'autorité.

Solutions : canonical sur les variations vers le produit parent, `noindex` sur les pages de tags si elles n'apportent pas de valeur, et `rel="next"` / `rel="prev"` sur la pagination (même si Google dit ne plus en avoir besoin, ça reste une bonne pratique).

## Ce qu'un audit SEO technique WooCommerce doit couvrir

En synthèse, un audit sérieux d'un WooCommerce doit vérifier :

1. Structure des URLs et gestion des paramètres de filtrage
2. Données structurées Product complètes (Schema.org)
3. Balises Hn cohérentes sur toutes les fiches
4. Attributs alt des images produits
5. Maillage interne : catégories, produits liés, breadcrumbs
6. Sitemap propre (pages inutiles exclues)
7. `robots.txt` avec les exclusions WooCommerce spécifiques
8. Gestion du contenu dupliqué (variations, tags, pagination)

C'est ce travail de fond, invisible pour les visiteurs mais déterminant pour les crawlers, qui permet à un e-commerce WooCommerce de se positionner durablement sur des requêtes commerciales — et pas seulement de bien scorer sur PageSpeed.
