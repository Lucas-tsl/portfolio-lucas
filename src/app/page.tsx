import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { ContentHubSection } from "@/components/sections/content-hub";
import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { StatsSection } from "@/components/sections/stats";

const BASE_URL = "https://lucastroteseil.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Lucas Troteseil",
      jobTitle: "Chef de projet Data / IA & Développeur Web",
      url: BASE_URL,
      email: "troteseil.lucas@gmail.com",
      sameAs: [
        "https://github.com/Lucas-tsl",
        "https://www.linkedin.com/in/lucas-tsl/",
        "https://profiles.wordpress.org/lucastsl/",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bordeaux",
        addressCountry: "FR",
      },
      knowsAbout: ["Next.js", "WordPress", "SEO technique", "Intelligence Artificielle", "TypeScript", "WooCommerce"],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Lucas Troteseil — Portfolio",
      description: "Chef de projet Data / IA & Développeur Web basé à Bordeaux.",
      inLanguage: "fr-FR",
      publisher: { "@id": `${BASE_URL}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-[radial-gradient(1200px_600px_at_10%_-10%,#fcd34d22,transparent),radial-gradient(900px_500px_at_100%_0%,#34d39922,transparent)] dark:bg-[radial-gradient(1200px_600px_at_10%_-10%,#f59e0b1f,transparent),radial-gradient(900px_500px_at_100%_0%,#10b9811a,transparent)]">
        <main className="flex-1">
          <HeroSection />
          <StatsSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContentHubSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}
