import { ProjectFeature } from "@/components/project/project-feature";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { projects, sectionCopy } from "@/data/portfolio";

export function ProjectsSection() {
  const copy = sectionCopy.projects;

  return (
    <section id="work" className="scroll-mt-24 border-t border-edge-subtle">
      <Container className="py-24 md:py-32">
        <SectionReveal className="mb-16 grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
          <SectionLabel index={copy.index} label={copy.label} />
          <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-0.03em] text-primary sm:text-5xl">
            {copy.heading}
          </h2>
        </SectionReveal>
        <div>
          {projects.map((project) => (
            <ProjectFeature key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
