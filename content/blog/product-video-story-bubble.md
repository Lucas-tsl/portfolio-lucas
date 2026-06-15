---
title: "Pourquoi j'ai développé un plugin WooCommerce Stories — et ce que ça m'a appris"
summary: "La genèse, les contraintes techniques et les décisions prises pour intégrer une expérience vidéo immersive dans les fiches produits WooCommerce, sans dépendance JavaScript externe."
category: "WordPress / WooCommerce"
tags: ["wordpress", "woocommerce", "plugin", "javascript", "youtube-api"]
publishedAt: "2026-03-15"
status: "Publié"
---

L'idée vient d'une observation : sur les boutiques e-commerce que je gère, les pages produits avec une vidéo YouTube intégrée ont un taux de conversion nettement supérieur aux pages sans vidéo. Mais l'expérience standard — une iframe YouTube posée dans le contenu, avec son interface complète — est loin d'être idéale sur mobile.

J'ai commencé à développer WooCommerce Stories en me demandant : est-ce qu'on peut proposer une expérience vidéo immersive, type Stories, directement dans une fiche produit, sans charger une librairie externe ?

## Le besoin de départ

Les marchands avec qui je travaille publient régulièrement des vidéos produits courtes sur YouTube (démonstrations, tutos, unboxing). Ils veulent que ces vidéos soient visibles directement sur la fiche produit WooCommerce, dans une expérience mobile-friendly.

Les solutions existantes posent deux problèmes :

1. **Elles ajoutent du poids** : un plugin vidéo classique charge ses propres librairies JS, ses propres styles, et souvent des ressources tierces. Sur des boutiques déjà chargées, c'est rédhibitoire pour les Core Web Vitals.
2. **L'UX n'est pas adaptée au mobile** : une iframe YouTube standard avec ses contrôles et sa barre de progression ne correspond pas aux habitudes de navigation des utilisateurs mobiles en 2025.

## Les contraintes techniques retenues

Dès le départ, j'ai posé trois règles :

- **Zéro dépendance JavaScript externe** : tout le JS doit être vanilla, minifié et conditionnel (chargé uniquement sur les pages produits).
- **Utiliser l'API YouTube IFrame Player**, pas d'embed standard : ça permet de contrôler précisément la lecture, de masquer les contrôles YouTube, et d'éviter la suggestion de vidéos extérieures à la fin.
- **Ne pas bloquer le LCP** : le player ne doit pas charger d'iframe avant l'interaction de l'utilisateur. On charge une image de couverture statique, l'iframe YouTube n'est instanciée qu'au tap.

## L'architecture du plugin

Le plugin suit la structure standard d'un plugin WordPress :

```
woocommerce-stories/
├── woocommerce-stories.php        # Bootstrap, déclaration hooks
├── includes/
│   ├── class-stories-admin.php    # Méta-box dans l'éditeur produit
│   ├── class-stories-frontend.php # Injection dans la gallery produit
│   └── class-stories-api.php      # Utilitaires YouTube (extract ID, thumbnail)
├── assets/
│   ├── js/stories-player.js       # Player JS vanilla (<8 Ko minifié)
│   └── css/stories.css            # Styles du player + animations
└── templates/
    └── stories-modal.php          # Template du player plein écran
```

### La méta-box côté admin

Un encart dans l'éditeur produit WooCommerce permet au marchand de coller une liste d'URLs YouTube (une par ligne). Le plugin extrait l'ID de chaque vidéo, récupère la miniature via l'API YouTube et stocke les données dans les métadonnées produit.

```php
add_action('woocommerce_product_options_general_product_data', function() {
  woocommerce_wp_textarea_input([
    'id'          => '_stories_youtube_urls',
    'label'       => 'URLs YouTube Stories',
    'description' => 'Une URL par ligne. Ces vidéos s\'afficheront en mode Stories sur mobile.',
    'desc_tip'    => true,
    'rows'        => 5,
  ]);
});
```

### Le player frontend

Côté frontend, les stories s'affichent comme une rangée de bulles circulaires au-dessus de la galerie produit. Au tap sur une bulle, un modal plein écran s'ouvre avec la vidéo en lecture automatique.

La navigation entre stories se fait par swipe horizontal (via les events `touchstart`/`touchend`) ou par les chevrons sur desktop.

Le défi principal a été la gestion des états de l'API YouTube : la vidéo suivante ne doit s'afficher qu'une fois la précédente réellement arrêtée, pas seulement quand on tape "suivant". J'utilise l'event `onStateChange` de l'IFrame API pour gérer ça proprement.

```js
player.addEventListener('onStateChange', (event) => {
  if (event.data === YT.PlayerState.ENDED) {
    goToNextStory();
  }
});
```

### Lazy loading de l'iframe

C'est le point le plus important pour les performances. L'iframe YouTube n'est pas dans le DOM au chargement de la page. Elle est créée dynamiquement au moment où l'utilisateur tape sur une bulle :

```js
function createPlayer(containerId, videoId) {
  return new YT.Player(containerId, {
    videoId,
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
    },
    events: {
      onReady: (e) => e.target.playVideo(),
      onStateChange: handleStateChange,
    },
  });
}
```

Résultat : la page produit ne charge aucune ressource YouTube tant que l'utilisateur n'a pas interagi. Le LCP n'est pas impacté.

## Ce que ce projet m'a appris

### Sur le développement WordPress

Écrire un plugin "propre" — sans conflits avec les autres plugins, sans surcharger le frontend, avec une désinstallation propre — demande plus de rigueur qu'un plugin "qui marche". Les hooks WordPress sont puissants mais il est facile de les utiliser de façon qui crée des conflits.

### Sur l'API YouTube

L'API IFrame Player a des comportements non documentés. Sur iOS, `autoplay` ne fonctionne pas sans `playsinline: 1`. Le chargement de l'API YouTube elle-même (`youtube.com/iframe_api`) peut être bloqué par certains adblockers, ce qui nécessite un fallback gracieux.

### Sur les priorités de chargement

Ce projet a renforcé ma conviction que les performances ne sont pas une optimisation qu'on fait "après" — elles doivent être intégrées dans l'architecture dès le départ. Rajouter du lazy loading après coup est toujours plus difficile que de l'avoir prévu dès la conception.

---

Le plugin est en cours de développement et disponible sur [GitHub](https://github.com/Lucas-tsl/woocommerce-stories). Les contributions et retours sont les bienvenus.
