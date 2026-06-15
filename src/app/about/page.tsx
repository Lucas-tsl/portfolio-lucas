import { profile } from "@/data/portfolio-data";

export const metadata = {
  title: "À propos | Lucas Troteseil",
  description: "Découvrez mon parcours, mes expériences et mes passions.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
        Mon parcours
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
        À propos de moi
      </h1>
      
      <div className="mt-10 space-y-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
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