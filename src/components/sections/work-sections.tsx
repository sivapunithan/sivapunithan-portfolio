import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ArrowLink } from "@/components/ui/button-link";
import { ChipList, StatusBadge } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { FlowDiagram } from "@/components/ui/flow-diagram";
import { SectionLabel } from "@/components/ui/section-label";
import { RepoPulse } from "@/components/ui/repo-pulse";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { projects, sectionCopy, stackGroups } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";
import { cn, isPlaceholder, padIndex } from "@/lib/utils";

function ProjectBlock({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;
  const repository = project.links.find((link) => !isPlaceholder(link.href));

  return (
    <article className="grid items-start gap-12 border-t border-line py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
      <div className={cn("lg:col-span-7", flipped && "lg:order-2")}>
        <Reveal className="flex items-center gap-6">
          <span className="font-display text-6xl font-light italic leading-none text-accent/45 md:text-7xl">
            {padIndex(index + 1)}
          </span>
          <span className="label text-muted">{project.category}</span>
        </Reveal>

        <SplitText
          as="h3"
          text={project.title}
          className="display-lg mt-8 text-primary"
        />
        <Reveal delay={0.1}>
          <p className="mt-4 font-display text-xl font-light italic leading-snug text-accent md:text-2xl">
            {project.tagline}
          </p>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-secondary">
            {project.summary}
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-9">
          <StatusBadge status={project.status} />
          <ChipList items={project.stack} className="mt-6" />
          <RepoPulse repoUrl={repository?.href} className="mt-6" />
        </Reveal>

        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-4">
          <ArrowLink href={`/projects/${project.slug}`}>Read the case study</ArrowLink>
          {repository && (
            <ArrowLink href={repository.href} external>
              {repository.label}
            </ArrowLink>
          )}
          {project.confidential && (
            <span className="text-[0.9375rem] text-muted">Private codebase</span>
          )}
        </Reveal>
      </div>

      <Reveal y={40} className={cn("lg:col-span-5", flipped && "lg:order-1")}>
        <SpotlightCard>
          <div className="p-6 md:p-8">
            <p className="label flex items-center justify-between text-muted">
              <span>Request path</span>
              <span className="text-accent">{padIndex(project.flow.length)} steps</span>
            </p>
            <FlowDiagram nodes={project.flow} className="mt-7" />
          </div>
        </SpotlightCard>
      </Reveal>
    </article>
  );
}

/** Every project, each with the path a request takes through it. */
export function ProjectsSection() {
  const copy = sectionCopy.projects;

  return (
    <section>
      <Container className="pt-24 md:pt-36">
        <Reveal>
          <SectionLabel index={copy.index} label={copy.label} />
        </Reveal>
        <SplitText
          as="h2"
          text={copy.heading}
          className="display-lg mt-8 max-w-[20ch] text-primary"
        />

        <div className="mt-16">
          {projects.map((project, index) => (
            <ProjectBlock key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/** The toolbox, laid out as five drawers. */
export function StackSection() {
  const copy = sectionCopy.stack;

  return (
    <section className="border-t border-line">
      <Container className="py-24 md:py-36">
        <Reveal>
          <SectionLabel index={copy.index} label={copy.label} />
        </Reveal>
        <SplitText
          as="h2"
          text={copy.heading}
          className="display-lg mt-8 max-w-[20ch] text-primary"
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {stackGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08} className="h-full">
              <SpotlightCard className="h-full">
                <div className="p-7">
                  <p className="label text-accent">{group.index}</p>
                  <h3 className="mt-5 font-display text-2xl font-light tracking-[-0.01em] text-primary">
                    {group.title}
                  </h3>
                  <ul className="mt-7 space-y-3 border-t border-line pt-6">
                    {group.items.map((item) => (
                      <li key={item} className="text-[0.9375rem] text-secondary">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
