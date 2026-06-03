import { profile } from "@/data/portfolio-data";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 py-14">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">A propos</h2>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{profile.about}</p>
    </section>
  );
}
