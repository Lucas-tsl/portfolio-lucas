import { skillGroups } from "@/data/portfolio-data";

export function SkillsSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">Competences</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <article key={group.title} className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{group.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
