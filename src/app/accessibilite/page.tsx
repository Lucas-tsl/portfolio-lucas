export const metadata = {
  title: "Déclaration d'accessibilité | Lucas Troteseil",
  description: "Déclaration d'accessibilité du portfolio lucastroteseil.com conformément au RGAA 4.1.2.",
};

export default function AccessibilitePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
        RGAA 4.1.2
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
        Déclaration d&apos;accessibilité
      </h1>
      <p className="mt-4 text-sm text-zinc-500">
        Établie le 15 juin 2026 — Mise à jour le 15 juin 2026
      </p>

      <div className="mt-10 space-y-10 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Introduction</h2>
          <p className="mt-3">
            Lucas Troteseil s&apos;engage à rendre son site internet accessible, conformément à l&apos;article 47
            de la loi n° 2005-102 du 11 février 2005.
          </p>
          <p className="mt-3">
            La présente déclaration d&apos;accessibilité s&apos;applique au site{" "}
            <strong className="text-zinc-800 dark:text-zinc-200">lucastroteseil.com</strong>. Elle a été établie
            le 15 juin 2026 sur la base d&apos;une évaluation interne réalisée le 15 juin 2026 selon le
            Référentiel général d&apos;amélioration de l&apos;accessibilité (RGAA), version 4.1.2.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">État de conformité</h2>
          <p className="mt-3">
            Le site <strong className="text-zinc-800 dark:text-zinc-200">lucastroteseil.com</strong> est{" "}
            <strong className="text-zinc-800 dark:text-zinc-200">partiellement conforme</strong> au RGAA.
            Cette conformité partielle s&apos;explique par l&apos;existence de non-conformités résiduelles et de
            contenus en cours d&apos;amélioration.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Contenus conformes</h2>
          <ul className="mt-3 space-y-1.5 list-disc pl-5">
            <li>Présence de titres de page et d&apos;une structure sémantique HTML sur toutes les pages.</li>
            <li>Navigation clavier disponible sur les menus, liens et actions principales.</li>
            <li>Libellés explicites sur les liens de navigation et boutons d&apos;action.</li>
            <li>Structuration des contenus favorisant la compréhension et l&apos;orientation.</li>
            <li>Gestion du mode sombre / clair sans dépendance aux seules couleurs.</li>
            <li>Attributs <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">alt</code> présents sur les éléments visuels significatifs.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Contenus non conformes</h2>
          <ul className="mt-3 space-y-1.5 list-disc pl-5">
            <li>Certains contrastes de couleurs peuvent être insuffisants selon les contextes d&apos;affichage.</li>
            <li>Des composants interactifs (filtres, formulaires) nécessitent une harmonisation ARIA complémentaire.</li>
            <li>Les animations (Framer Motion) ne sont pas encore systématiquement désactivées via <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">prefers-reduced-motion</code>.</li>
            <li>L&apos;absence d&apos;un lien d&apos;évitement vers le contenu principal.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Stratégie d&apos;amélioration</h2>
          <ul className="mt-3 space-y-1.5 list-disc pl-5">
            <li>Audit régulier des pages prioritaires (Accueil, Blog, Contact, À propos).</li>
            <li>Correction progressive des contrastes, labels et associations de champs.</li>
            <li>Intégration de <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">prefers-reduced-motion</code> sur toutes les animations.</li>
            <li>Ajout d&apos;un lien d&apos;évitement vers le contenu principal.</li>
            <li>Vérification clavier avant chaque mise en production.</li>
            <li>Mise à jour de la présente déclaration à chaque évolution significative.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Retour d&apos;information et contact</h2>
          <p className="mt-3">
            Si vous ne parvenez pas à accéder à un contenu ou à un service, vous pouvez me contacter pour être
            orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.
          </p>
          <p className="mt-3">
            <strong className="text-zinc-800 dark:text-zinc-200">Email :</strong>{" "}
            <a href="mailto:contact@lucastroteseil.com" className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100">
              contact@lucastroteseil.com
            </a>
          </p>
          <p className="mt-2">
            <a
              href="/#contact"
              className="inline-flex items-center gap-1 font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-100"
            >
              Accéder au formulaire de contact →
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Environnement de test</h2>
          <ul className="mt-3 space-y-1.5 list-disc pl-5">
            <li>Système d&apos;exploitation : macOS.</li>
            <li>Site testé en environnement de production : lucastroteseil.com.</li>
            <li>Évaluation basée sur un parcours utilisateur représentatif (navigation, formulaire, pages légales, blog).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Technologies utilisées</h2>
          <ul className="mt-3 space-y-1.5 list-disc pl-5">
            <li><strong className="text-zinc-700 dark:text-zinc-300">Framework :</strong> Next.js 15.5 (React 18)</li>
            <li><strong className="text-zinc-700 dark:text-zinc-300">Langage :</strong> TypeScript</li>
            <li><strong className="text-zinc-700 dark:text-zinc-300">Styles :</strong> Tailwind CSS v4</li>
            <li><strong className="text-zinc-700 dark:text-zinc-300">Animations :</strong> Framer Motion</li>
            <li><strong className="text-zinc-700 dark:text-zinc-300">Gestion des thèmes :</strong> next-themes</li>
            <li><strong className="text-zinc-700 dark:text-zinc-300">Déploiement :</strong> Vercel</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Technologies d&apos;assistance et navigateurs</h2>
          <ul className="mt-3 space-y-1.5 list-disc pl-5">
            <li>Lecteur d&apos;écran : VoiceOver (macOS).</li>
            <li>Navigation clavier seule (tabulation, focus visible, activation des contrôles).</li>
            <li>Navigateurs : Safari, Chrome, Firefox, Edge.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Outils de vérification</h2>
          <ul className="mt-3 space-y-1.5 list-disc pl-5">
            <li>Colour Contrast Analyser</li>
            <li>WCAG Contrast Checker</li>
            <li>Validateur HTML du W3C</li>
            <li>HeadingsMap</li>
            <li>Outils de développement navigateurs (inspection ARIA, ordre de tabulation)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Voies de recours</h2>
          <p className="mt-3">
            Si vous constatez un défaut d&apos;accessibilité qui vous empêche d&apos;accéder à un contenu ou à une
            fonctionnalité, et que vous n&apos;obtenez pas de réponse satisfaisante, vous pouvez saisir le{" "}
            <strong className="text-zinc-800 dark:text-zinc-200">Défenseur des droits</strong>.
          </p>
          <ul className="mt-3 space-y-1.5 list-disc pl-5">
            <li>
              Formulaire en ligne :{" "}
              <a href="https://formulaire.defenseurdesdroits.fr/" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100">
                formulaire.defenseurdesdroits.fr
              </a>
            </li>
            <li>
              Délégué territorial :{" "}
              <a href="https://www.defenseurdesdroits.fr/saisir/delegues" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100">
                defenseurdesdroits.fr/saisir/delegues
              </a>
            </li>
            <li>
              Courrier postal (sans affranchissement) :<br />
              Défenseur des droits — Libre réponse 71120 — 75342 Paris CEDEX 07
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
