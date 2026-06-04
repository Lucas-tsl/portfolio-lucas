import { profile } from "@/data/portfolio-data";

export const metadata = {
  title: "À propos | Lucas Troteseil",
  description: "Découvrez mon parcours, mes expériences et mes passions.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      <p className="mb-4 inline-block rounded-full border border-amber-200/50 bg-amber-100/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 dark:border-amber-800/30 dark:bg-amber-900/20 dark:text-amber-400">
        Mon parcours
      </p>
      <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
        À propos de moi
      </h1>
      
      <div className="mt-12 space-y-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        <p>
          Je m&apos;appelle Lucas Troteseil et je suis <strong>{profile.title}</strong>, basé à Bordeaux.
        </p>
        <p>
          J&apos;ai développé un profil hybride au croisement de la technique et de la stratégie. 
          En tant que Chef de projet chez <strong>Groupe NOVI</strong>, j&apos;accompagne le développement d&apos;outils web 
          et l&apos;intégration de solutions basées sur la Data et l&apos;Intelligence Artificielle pour répondre à des besoins métiers concrets.
        </p>
        <p>
          Côté développement, je conçois des applications web modernes, rapides et maintenables. J&apos;accorde une importance 
          particulière aux performances (Core Web Vitals), au SEO technique et à l&apos;expérience utilisateur, du développement 
          jusqu&apos;à la mise en production.
        </p>
        
        <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Au-delà du code
        </h2>
        <p>
          Je suis un passionné d&apos;apprentissage continu. Actuellement, je me forme au <strong>japonais</strong> et je découvre 
          l&apos;écosystème mobile avec <strong>Swift</strong>.
        </p>
        <p>
          Quand je ne suis pas derrière un écran, vous me trouverez probablement dans l&apos;océan avec mon <strong>surf</strong>, 
          ou en train de grimper sur des blocs d&apos;<strong>escalade</strong>.
        </p>
      </div>
    </main>
  );
}