import Link from "next/link";
import { projects } from "@/data/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { ProjectFeature } from "@/components/project/project-feature";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export function ProjectsSection() {
  return (
    <section id="work" className="scroll-mt-24">
      <Container className="pb-10 md:pb-14">
        <SectionReveal className="mb-12 space-y-5 md:mb-16">
          <SectionLabel index="02" label="SELECTED WORK" />
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Systems thinking, production discipline and clear technical choices.
          </h2>
        </SectionReveal>

        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectFeature key={project.slug} project={project} />
          ))}
        </div>

        <SectionReveal className="mt-8 flex justify-start">
          <Link href="/projects/enterprise-procurement-workflow" className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-orange transition hover:text-primary">
            Open the case study route →
          </Link>
        </SectionReveal>
      </Container>
    </section>
  );
}
