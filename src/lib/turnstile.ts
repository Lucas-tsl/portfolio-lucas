// Clé de SITE Cloudflare Turnstile (publique, visible dans le HTML : pas un secret).
// Vide = Turnstile désactivé côté client ET serveur (seuls pot de miel + délai restent actifs).
// La clé SECRÈTE se configure dans Cloudflare : Worker > Settings > Variables and Secrets > TURNSTILE_SECRET_KEY
export const TURNSTILE_SITE_KEY = "0x4AAAAAAGI0kTt7lnFD6f_P";

// En dessous de ce délai entre l'affichage du formulaire et l'envoi, on considère que c'est un robot
export const MIN_FILL_TIME_MS = 3000;
