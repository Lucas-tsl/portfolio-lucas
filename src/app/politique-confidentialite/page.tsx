export const metadata = {
  title: "Politique de confidentialité | Lucas Troteseil",
  description: "Politique de confidentialité et traitement des données personnelles.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
        RGPD
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
        Politique de confidentialité
      </h1>
      <p className="mt-4 text-sm text-zinc-500">Dernière mise à jour : 19 novembre 2026</p>

      <div className="mt-10 space-y-10 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Responsable du traitement</h2>
          <p className="mt-3">
            <strong className="text-zinc-800 dark:text-zinc-200">Lucas Troteseil</strong><br />
            Email : <a href="mailto:contact@lucas-troteseil.fr" className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100">contact@lucas-troteseil.fr</a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Données collectées</h2>
          <p className="mt-3">
            Ce site collecte uniquement les données saisies volontairement dans le formulaire de contact :
          </p>
          <ul className="mt-3 space-y-1 list-disc pl-5">
            <li><strong className="text-zinc-700 dark:text-zinc-300">Nom</strong> — pour personnaliser la réponse</li>
            <li><strong className="text-zinc-700 dark:text-zinc-300">Adresse email</strong> — pour répondre à la demande</li>
            <li><strong className="text-zinc-700 dark:text-zinc-300">Message</strong> — contenu de la demande</li>
          </ul>
          <p className="mt-3">Aucune donnée n&apos;est collectée à des fins de prospection, de profilage ou de revente.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Finalité et base légale</h2>
          <p className="mt-3">
            Les données sont collectées dans le but exclusif de répondre aux demandes envoyées via le formulaire de contact,
            sur la base de l&apos;intérêt légitime (article 6.1.f du RGPD).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Destinataires</h2>
          <p className="mt-3">
            Les données transmises via le formulaire sont acheminées par le service{" "}
            <strong className="text-zinc-800 dark:text-zinc-200">Resend</strong> (Resend, Inc. — États-Unis),
            utilisé comme prestataire d&apos;envoi d&apos;emails. Elles ne sont communiquées à aucun autre tiers.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Durée de conservation</h2>
          <p className="mt-3">
            Les données personnelles sont conservées pendant une durée maximale de <strong>3 ans</strong> à compter
            de la dernière interaction, puis supprimées.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Vos droits</h2>
          <p className="mt-3">
            Conformément au RGPD, vous disposez des droits suivants sur vos données :
          </p>
          <ul className="mt-3 space-y-1 list-disc pl-5">
            <li>Droit d&apos;<strong>accès</strong></li>
            <li>Droit de <strong>rectification</strong></li>
            <li>Droit à l&apos;<strong>effacement</strong> (droit à l&apos;oubli)</li>
            <li>Droit à la <strong>limitation</strong> du traitement</li>
            <li>Droit d&apos;<strong>opposition</strong></li>
          </ul>
          <p className="mt-3">
            Pour exercer ces droits, contactez :{" "}
            <a href="mailto:contact@lucas-troteseil.fr" className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100">
              contact@lucas-troteseil.fr
            </a>
          </p>
          <p className="mt-3">
            Vous pouvez également introduire une réclamation auprès de la{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100">
              CNIL
            </a>{" "}
            (Commission Nationale de l&apos;Informatique et des Libertés).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Cookies</h2>
          <p className="mt-3">
            Ce site n&apos;utilise aucun cookie de traçage, de mesure d&apos;audience ou de ciblage publicitaire.
            Seul un cookie technique peut être déposé par le navigateur pour mémoriser la préférence de thème (clair/sombre).
          </p>
          <p className="mt-3">
            La fréquentation du site est mesurée avec Cloudflare Web Analytics, un outil sans cookie qui ne collecte
            aucune donnée personnelle identifiante et ne suit pas les visiteurs d&apos;un site à l&apos;autre.
          </p>
          <p className="mt-3">
            Le formulaire de contact est protégé contre les robots par Cloudflare Turnstile. Ce service analyse des
            signaux techniques du navigateur (sans cookie publicitaire ni suivi entre sites) dans le seul but de
            distinguer un visiteur humain d&apos;un programme automatisé.
          </p>
        </section>
      </div>
    </main>
  );
}
