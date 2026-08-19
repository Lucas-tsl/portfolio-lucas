---
title: "Navi : d'un correctif ponctuel à un hub d'engagement WordPress et PrestaShop"
summary: "Comment trois hubs site-spécifiques développés dans l'urgence sont devenus Navi, un plugin unique à architecture modulaire, puis un module PrestaShop — et ce que le portage d'un écosystème à l'autre m'a appris sur le consentement cookies."
category: "WordPress / PrestaShop"
tags: ["wordpress", "prestashop", "plugin", "rgpd", "consent-mode", "accessibilite"]
publishedAt: "2026-07-22"
status: "Publié"
---

Navi n'a pas commencé comme un plugin. Il a commencé comme trois correctifs séparés — `hub-lsg`, `hub-pe`, `hub-jozz` — développés à la volée pour régler, boutique par boutique, les mêmes trois demandes : la gestion des cookies n'était pas conforme, l'accessibilité numérique manquait, et les visiteurs mobiles perdaient le fil entre la fiche produit et le panier.

Le problème est apparu au moment de maintenir les trois en parallèle : chaque hub avait sa propre logique, ses propres couleurs codées en dur, son propre bouton flottant. Un bug corrigé sur l'un ne l'était pas sur les deux autres. Navi est né de cette fusion — et a fini, quelques mois plus tard, par exister aussi en version PrestaShop.

## Un seul bouton, un noyau qui ne connaît rien de ses modules

La contrainte de départ était simple à énoncer et plus difficile à tenir : ajouter un module (cookies, accessibilité, panier, stories) ne doit jamais obliger à toucher au noyau.

La solution retenue est un registre de modules. Le noyau ne connaît que ce que chaque module déclare de lui-même — une icône, une condition d'activation — et rien de sa logique interne :

```php
Navi_Module_Registry::register('mon-module', [
  'icon'            => 'dashicons-video-alt2',
  'fab_action'      => 'mon-module',
  'available'       => true,
  'visibility_selector' => true,
]);
```

Quand un visiteur clique une icône du bouton flottant, le noyau se contente d'émettre un événement générique :

```js
document.dispatchEvent(new CustomEvent('navi:action', { detail: item }));
```

Chaque module écoute cet événement et réagit s'il reconnaît l'action qui le concerne. Ce découplage total est ce qui a permis d'ajouter le module Stories bien après les trois premiers, sans casser quoi que ce soit.

## Le consentement cookies, ou pourquoi l'ordre des scripts compte plus que le code du bandeau

Le module le plus délicat n'a pas été celui qu'on imagine. Le bandeau RGPD lui-même — case à cocher, bouton "Tout accepter" — est trivial. Ce qui est difficile, c'est de garantir qu'aucun script de tracking ne démarre avant que l'utilisateur ait fait un choix.

Navi pose un [Google Consent Mode V2](https://developers.google.com/tag-platform/security/guides/consent) par défaut — tout refusé — dans un `<script>` injecté en tout début de `<head>`, avant même que la bannière ne soit visible :

```js
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
});
```

Mais ce signal ne sert à rien s'il arrive après le script Google Analytics ou Tag Manager. Sur WordPress, l'ordre des hooks `wp_head` est prévisible ; sur PrestaShop, **l'ordre des hooks `displayHeader` n'est garanti par rien**. Un module Analytics enregistré avant Navi dans la liste des positions suffit à rendre le blocage inutile — le tracking a déjà eu l'occasion de démarrer.

La leçon, valable sur les deux plateformes : le consentement n'est pas qu'une question de bandeau visuel, c'est une question d'ordre de chargement, à vérifier manuellement après chaque installation (*Back Office > Modules > Positions > `displayHeader`* sur PrestaShop, l'ordre des actions sur `wp_head` côté WordPress).

Pour les outils qui ne respectent pas nativement le Consent Mode (Meta Pixel, TikTok Pixel, Hotjar…), Navi pousse un événement dédié dans le `dataLayer` à chaque changement de consentement :

```js
document.addEventListener('DOMContentLoaded', function () {
  window.dataLayer = window.dataLayer || [];
  // écouter navi_cookie_consent_updated, vérifier le cookie navi_consent_mkt
  // avant d'injecter le script tiers concerné
});
```

## Porter l'architecture, pas seulement le code

Le portage vers PrestaShop n'a pas été une traduction ligne à ligne. La logique du bouton flottant à 3 états (`data-state="closed|menu|detail"`) a été reprise à l'identique, avec la même petite API JS (`showDetail`, `backToMenu`, `hideDetail`) — mais l'intégration du module Stories a dû être repensée entièrement.

Sur PrestaShop, la sauvegarde d'une story ne passe par **aucun contrôleur front dédié** : elle est déclenchée uniquement par un enregistrement produit réel côté back-office (`actionObjectProductAddAfter`/`UpdateAfter`). Ce choix, qui peut sembler une contrainte, élimine en fait toute surface d'attaque : sans contrôleur front exposé, il n'y a rien à sécuriser côté CSRF ou permissions qui ne le soit déjà par le formulaire produit standard de PrestaShop.

Le panier sticky a posé un défi inverse. Sur WordPress, WooCommerce expose une structure DOM assez stable. Sur PrestaShop, le panneau doit détecter le prix, le nom et l'image du produit en essayant plusieurs emplacements courants (blocs Gutenberg, WooCommerce classique, variantes de thèmes) — et, en dernier recours, laisser le marchand préciser un sélecteur CSS exact depuis le Back Office quand la détection automatique échoue.

## Ce que ce projet m'a appris

**La généralisation coûte plus cher que le développement initial.** Fusionner trois hubs site-spécifiques en un seul plugin a demandé d'identifier ce qui était vraiment générique (l'architecture, le bouton, le registre) et ce qui ne l'était pas (les couleurs de marque, certains sélecteurs CSS liés à un thème précis) — et de sortir proprement le second du premier.

**Le consentement cookies est un problème d'infrastructure, pas de composant.** Le bandeau lui-même est la partie facile. La garantie que rien ne se charge avant le choix de l'utilisateur dépend de l'ordre de chargement global de la page, qui change d'une plateforme à l'autre et parfois d'une installation à l'autre.

**Une architecture bien découplée se porte, un thème codé en dur ne se porte pas.** Le registre de modules et le bouton à 3 états ont traversé l'écosystème PrestaShop sans changer de forme. Tout ce qui était accroché en dur à un thème ou un sélecteur WordPress a dû être repensé de zéro.

---

Navi est développé pour le Groupe NOVI, en version [WordPress](https://github.com/Lucas-tsl/navi-wordpress) et [PrestaShop](https://github.com/Lucas-tsl/navi-prestashop), déployé sur Les Senteurs Gourmandes, Jozz Beauty, Pure Eden et Physiomins.
