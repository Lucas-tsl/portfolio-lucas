export const metadata = {
  title: "Mentions légales",
  description: "Mentions légales du portfolio de Lucas Troteseil.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
        Informations légales
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
        Mentions légales
      </h1>

      <div className="mt-10 space-y-10 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Éditeur du site</h2>
          <p className="mt-3">
            <strong className="text-zinc-800 dark:text-zinc-200">Lucas Troteseil</strong><br />
            Chef de projet Data / IA &amp; Développeur Web<br />
            Bordeaux, France<br />
            Email : <a href="mailto:contact@lucas-troteseil.fr" className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100">contact@lucas-troteseil.fr</a>
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            Ce site est un portfolio personnel. Lucas Troteseil n&apos;est pas assujetti à la TVA au titre de cette activité de présentation.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Hébergeur</h2>
          <p className="mt-3">
            <strong className="text-zinc-800 dark:text-zinc-200">Cloudflare, Inc.</strong><br />
            101 Townsend Street<br />
            San Francisco, CA 94107 — États-Unis<br />
            <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100">cloudflare.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Propriété intellectuelle</h2>
          <p className="mt-3">
            L&apos;ensemble des contenus présents sur ce site (textes, images, code source, structure) est la propriété
            exclusive de Lucas Troteseil, sauf mention contraire. Toute reproduction, représentation, modification
            ou exploitation, totale ou partielle, sans autorisation préalable et écrite est strictement interdite.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Liens hypertextes</h2>
          <p className="mt-3">
            Ce site contient des liens vers des sites tiers (GitHub, LinkedIn, WordPress.org). Lucas Troteseil n&apos;est pas
            responsable du contenu de ces sites et ne saurait être tenu pour responsable des dommages résultant de leur utilisation.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Données personnelles</h2>
          <p className="mt-3">
            Les données collectées via le formulaire de contact sont traitées conformément à la{" "}
            <a href="/politique-confidentialite" className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100">
              politique de confidentialité
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Droit applicable</h2>
          <p className="mt-3">
            Le présent site est soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </section>
      </div>
    </main>
  );
}
