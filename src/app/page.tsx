import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { ContentHubSection } from "@/components/sections/content-hub";
import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";

export default function Home() {
  return (
    <div className="bg-[radial-gradient(1200px_600px_at_10%_-10%,#fcd34d22,transparent),radial-gradient(900px_500px_at_100%_0%,#34d39922,transparent)] dark:bg-[radial-gradient(1200px_600px_at_10%_-10%,#f59e0b1f,transparent),radial-gradient(900px_500px_at_100%_0%,#10b9811a,transparent)]">
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContentHubSection />
        <ContactSection />
      </main>
    </div>
  );
}
