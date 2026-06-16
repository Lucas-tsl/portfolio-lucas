---
title: "Core Web Vitals e-commerce : retour sur l'optimisation de 250 fiches produits"
summary: "Retour d'expérience concret sur l'amélioration des Core Web Vitals pour plusieurs boutiques WooCommerce et PrestaShop — ce qui impacte vraiment le score, ce qui ne sert à rien."
category: "SEO / Performance"
tags: ["core-web-vitals", "seo", "woocommerce", "performance", "e-commerce"]
publishedAt: "2026-05-12"
status: "Publié"
---

Quand on optimise les Core Web Vitals d'un site vitrine perso, le défi est limité. Quand on le fait sur plusieurs boutiques e-commerce avec 250 fiches produits chacune, des dizaines de variantes d'images, des plugins tiers et des thèmes WordPress qui datent de 2019, c'est une autre histoire.

Voici ce que j'ai retenu après plusieurs mois à travailler sur les performances web de marques comme Les Senteurs Gourmandes, Jozz Beauty et Pure Eden chez Groupe NOVI.

## Les trois métriques qui comptent vraiment

Google mesure trois indicateurs dans les Core Web Vitals :

- **LCP (Largest Contentful Paint)** : temps d'affichage du plus grand élément visible. Objectif : < 2,5 s.
- **INP (Interaction to Next Paint)** : temps de réponse à une interaction. Objectif : < 200 ms. *(A remplacé le FID en 2024.)*
- **CLS (Cumulative Layout Shift)** : stabilité visuelle. Objectif : < 0,1.

Sur e-commerce, le LCP est presque toujours l'image principale du produit ou le carousel hero. C'est là que se joue 80 % du travail.

## Ce qui a eu le plus d'impact

### 1. Précharger l'image LCP

L'erreur la plus commune : l'image qui détermine le LCP est chargée en lazy loading, comme toutes les autres. Le navigateur ne la découvre qu'une fois le DOM partiellement analysé.

La solution : identifier l'image principale de la fiche produit (en général `woocommerce-product-gallery__image`) et lui ajouter un `<link rel="preload">` dans le `<head>`.

```html
<link rel="preload" as="image" href="/wp-content/uploads/produit-hero.webp" fetchpriority="high" />
```

Sur WooCommerce, ça se fait proprement via un hook PHP :

```php
add_action('wp_head', function() {
  if (is_product()) {
    global $product;
    $img_id = $product->get_image_id();
    $img_url = wp_get_attachment_image_url($img_id, 'woocommerce_single');
    if ($img_url) {
      echo '<link rel="preload" as="image" href="' . esc_url($img_url) . '" fetchpriority="high">';
    }
  }
});
```

Résultat observé : **-0,8 s à -1,2 s sur le LCP** selon les pages.

### 2. Convertir toutes les images en WebP

Les images JPEG ou PNG en haute résolution sont le principal facteur de LCP dégradé. Sur des fiches produits avec 4 à 8 photos par article, l'économie est significative.

Avec le plugin **Imagify** ou **ShortPixel** côté WordPress, ou via un script Node.js utilisant `sharp` pour les conversions en lot, on descend en moyenne à **-60 % de poids** sans perte perceptible.

Points d'attention :
- Définir les bons `sizes` sur les images WooCommerce pour éviter de charger une image 1200px sur un mobile.
- Configurer un `.htaccess` pour servir WebP aux navigateurs compatibles si le plugin ne le fait pas automatiquement.

### 3. Réduire le JavaScript inutile au chargement

Sur des boutiques avec Elementor, Contact Form 7, un plugin d'avis, un chat live et un pixel Facebook, le JS bloquant s'accumule vite. PageSpeed Insights le signale dans "Évitez les ressources bloquant le rendu".

Actions concrètes :
- Passer les scripts non-critiques en `defer` ou `async`.
- Utiliser le plugin **Asset CleanUp** pour désactiver les scripts page par page (inutile de charger WooCommerce cart sur une page de blog).
- Supprimer les scripts des plugins désactivés qui laissent quand même des traces dans le DOM.

Sur une boutique test, on est passé de **18 requêtes JS bloquantes à 4**, ce qui a réduit le Total Blocking Time de 890 ms à 210 ms.

### 4. Corriger le CLS sur les galleries produits

Le CLS naît souvent des images sans dimensions explicites. Le navigateur réserve la place une fois l'image chargée, décalant tout le contenu.

Fix simple : toujours définir `width` et `height` sur les `<img>`, même si elles sont gérées en CSS. Le navigateur calcule le ratio avant le chargement.

Sur WooCommerce, les images de gallery n'ont pas toujours ces attributs par défaut selon le thème. Un filtre PHP corrige ça :

```php
add_filter('woocommerce_single_product_image_thumbnail_html', function($html) {
  return preg_replace('/<img /', '<img width="800" height="800" ', $html, 1);
});
```

## Ce qui n'a presque aucun effet

- **Activer le cache navigateur** : améliore les visites répétées, mais n'impacte pas les métriques Core Web Vitals des nouveaux visiteurs (qui n'ont pas de cache).
- **Minifier le CSS** : gain marginal, rarement supérieur à 50 ms.
- **Un CDN sans optimisation des images** : le CDN accélère la livraison, mais si l'image fait 2 Mo en JPEG, elle arrivera vite et quand même trop tard.

## Les outils à utiliser

| Outil | Usage |
|---|---|
| PageSpeed Insights | Diagnostic par URL, données de terrain (CrUX) |
| Chrome DevTools — Performance | Timeline d'enregistrement en live |
| WebPageTest | Test multi-région, filmstrip du chargement |
| Google Search Console — Rapport CWV | Vue agrégée sur tout le site |

## Le point souvent oublié : les données de terrain vs. laboratoire

PageSpeed Insights affiche deux colonnes : les données du lab (Lighthouse) et les données de terrain (CrUX). Ce sont les données de terrain que Google utilise pour le ranking.

Un site peut scorer 95 en lab et avoir un LCP "Mauvais" dans les données CrUX parce que ses vrais utilisateurs sont sur 4G avec des appareils Android d'entrée de gamme. Ce décalage est courant sur les boutiques dont la cible est le grand public.

Tester avec Chrome DevTools en simulant un réseau 4G lent et un CPU ×4 throttling donne une image bien plus proche de la réalité que le score Lighthouse sur desktop.

---

Ces optimisations ne sont pas spectaculaires à décrire, mais elles ont un impact direct : meilleur positionnement, taux de rebond plus faible, et sessions plus longues sur mobile. Sur une boutique e-commerce, chaque dixième de seconde se traduit en conversion.
