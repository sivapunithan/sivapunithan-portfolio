import type { Metadata } from "next";
import {
  EducationFocusSection,
  ExperienceSection,
  IntroductionSection,
  ThinkingSection,
} from "@/components/sections/about-sections";
import { PageHero } from "@/components/ui/page-hero";
import { aboutHero } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "About",
  description: aboutHero.body,
};

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero {...aboutHero} />
      <IntroductionSection />
      <ThinkingSection />
      <ExperienceSection />
      <EducationFocusSection />
    </main>
  );
}
