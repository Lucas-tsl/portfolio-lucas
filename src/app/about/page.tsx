import { AboutContent } from "@/components/sections/about-tabs";

export const metadata = {
  title: "À propos",
  description:
    "Parcours professionnel et académique de Lucas Troteseil — Chef de projet Data / IA en alternance chez Groupe NOVI, étudiant en Master Data & IA à Nexa Digital School.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "À propos — Lucas Troteseil",
    description:
      "Parcours professionnel et académique — Chef de projet Data / IA en alternance, Master Data & IA, Bordeaux.",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
