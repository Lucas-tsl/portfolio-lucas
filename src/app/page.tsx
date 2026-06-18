import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero";
import { FaqSection } from "@/components/sections/faq";
import { FAQ_ITEMS } from "@/data/faq-data";

// Above-the-fold: eager
// Below-the-fold: code-split into separate chunks — reduces initial bundle ~40-50 kB
const StatsSection       = dynamic(() => import("@/components/sections/stats").then((m) => m.StatsSection));
const AboutSection       = dynamic(() => import("@/components/sections/about").then((m) => m.AboutSection));
const SkillsSection      = dynamic(() => import("@/components/sections/skills").then((m) => m.SkillsSection));
const ProjectsSection    = dynamic(() => import("@/components/sections/projects").then((m) => m.ProjectsSection));
const ContentHubSection  = dynamic(() => import("@/components/sections/content-hub").then((m) => m.ContentHubSection));
const ContactSection     = dynamic(() => import("@/components/sections/contact").then((m) => m.ContactSection));

const BASE_URL = "https://lucastroteseil.com";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div className="bg-[radial-gradient(1200px_600px_at_10%_-10%,#fcd34d22,transparent),radial-gradient(900px_500px_at_100%_0%,#34d39922,transparent)] dark:bg-[radial-gradient(1200px_600px_at_10%_-10%,#f59e0b1f,transparent),radial-gradient(900px_500px_at_100%_0%,#10b9811a,transparent)]">
        <main className="flex-1">
          <HeroSection />
          <StatsSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContentHubSection />
          <FaqSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}
