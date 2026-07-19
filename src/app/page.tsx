import { ContactSection } from "@/components/sections/contact-section";
import { CurrentFocusSection } from "@/components/sections/current-focus-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { IntroductionSection } from "@/components/sections/introduction-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StackSection } from "@/components/sections/stack-section";
import { ArchitectureSpotlightSection } from "@/components/sections/architecture-spotlight-section";
import { PageShell } from "@/components/motion/page-shell";

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <IntroductionSection />
      <ProjectsSection />
      <ArchitectureSpotlightSection />
      <StackSection />
      <ExperienceSection />
      <CurrentFocusSection />
      <ContactSection />
    </PageShell>
  );
}
