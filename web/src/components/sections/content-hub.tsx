const spaces = [
  {
    title: "Documentations",
    href: "/docs",
    description:
      "Ressources internes, guides de fonctionnement et checklists pour l'équipe et les collaborateurs.",
    label: "Espace lecture",
  },
  {
    title: "Blog",
    href: "/blog",
    description:
      "Articles de fond, retours d'expérience et sujets utiles autour du web, du SEO et de l'IA.",
    label: "Publication",
  },
  {
    title: "Technologies",
    href: "/technologies",
    description:
      "La stack que j'utilise pour construire vite, proprement et de manière maintenable.",
    label: "Stack",
  },
];

export function ContentHubSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
            Contenus complémentaires
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">
            Un portfolio qui vit au-delà de la vitrine
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          L'idée est de proposer un espace où les personnes de l'entreprise peuvent
          lire des documentations, et où les visiteurs peuvent suivre mes retours
          d'expérience et la stack que j'utilise.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {spaces.map((space) => (
          <a
            key={space.title}
            href={space.href}
            className="group rounded-3xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{space.label}</p>
            <h3 className="mt-3 text-xl font-bold text-zinc-950 dark:text-zinc-50">{space.title}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{space.description}</p>
            <span className="mt-6 inline-flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Ouvrir l'espace
              <span className="ml-2 transition group-hover:translate-x-1">→</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
