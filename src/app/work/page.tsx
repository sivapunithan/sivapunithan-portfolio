import type { Metadata } from "next";
import { ProjectsSection, StackSection } from "@/components/sections/work-sections";
import { PageHero } from "@/components/ui/page-hero";
import { workHero } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Work",
  description: workHero.body,
};

export default function WorkPage() {
  return (
    <main id="main">
      <PageHero {...workHero} />
      <ProjectsSection />
      <StackSection />
    </main>
  );
}
