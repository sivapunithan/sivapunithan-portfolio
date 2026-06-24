import { projects } from "@/data/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { ProjectFeature } from "@/components/project/project-feature";
import { Container } from "@/components/ui/container";
import { CodeCommentLabel } from "@/components/ui/code-comment-label";
import { SectionLabel } from "@/components/ui/section-label";

/** 02 / SELECTED WORK — editorial project rows, no card grid. */
export function ProjectsSection() {
  return (
    <section id="work" className="scroll-mt-24">
      <Container className="pb-10 md:pb-14">
        <SectionReveal className="mb-12 space-y-5 md:mb-16">
          <SectionLabel index="02" label="SELECTED WORK" />
          <CodeCommentLabel>{"// projects compiled"}</CodeCommentLabel>
          <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Work that favours reliability over decoration.
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
