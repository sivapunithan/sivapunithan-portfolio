import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ArrowLink, ButtonLink } from "@/components/ui/button-link";
import { ChipList, StatusBadge } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { FlowDiagram } from "@/components/ui/flow-diagram";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { RepoPulse } from "@/components/ui/repo-pulse";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { projects } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";
import { isPlaceholder, padIndex } from "@/lib/utils";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const position = projects.findIndex((entry) => entry.slug === project.slug);
  const next = projects[(position + 1) % projects.length];
  const repository = project.links.find((link) => !isPlaceholder(link.href));

  const chapters = [
    { label: "The problem", body: project.problem },
    { label: "What I built", body: project.responsibility },
    { label: "The call I made", body: project.decision },
  ];

  return (
    <main id="main">
      <Container className="pb-20 pt-36 md:pb-28 md:pt-48">
        <Reveal trigger="intro" delay={0.4} y={12}>
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 text-[0.9375rem] text-secondary transition-colors duration-300 hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-accent transition-transform duration-500 ease-expo group-hover:-translate-x-1.5" />
            All work
          </Link>
        </Reveal>

        <Reveal trigger="intro" delay={0.5} y={12} className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="label text-accent">
            {padIndex(position + 1)} / {padIndex(projects.length)}
          </p>
          <p className="label text-muted">{project.category}</p>
          <StatusBadge status={project.status} />
        </Reveal>

        <SplitText
          as="h1"
          text={project.title}
          trigger="intro"
          delay={0.55}
          className="display-xl mt-8 max-w-[16ch] text-primary"
        />
        <Reveal trigger="intro" delay={0.9}>
          <p className="mt-6 max-w-3xl font-display text-2xl font-light italic leading-snug text-accent md:text-3xl">
            {project.tagline}
          </p>
          <p className="mt-9 max-w-2xl text-lg leading-relaxed text-secondary">{project.summary}</p>
        </Reveal>

        <Reveal trigger="intro" delay={1} className="mt-8">
          <RepoPulse repoUrl={repository?.href} />
        </Reveal>

        <Reveal trigger="intro" delay={1.05} className="mt-10 flex flex-wrap items-center gap-5">
          {repository && (
            <ButtonLink href={repository.href} external>
              View the repository
            </ButtonLink>
          )}
          {project.confidential && (
            <p className="max-w-sm border-l border-line-strong pl-5 text-[0.9375rem] leading-relaxed text-secondary">
              Private codebase. Client, endpoint and schema details are intentionally withheld.
            </p>
          )}
        </Reveal>
      </Container>

      <Container className="pb-24 md:pb-32">
        <Reveal y={40}>
          <SpotlightCard>
            <div className="p-6 md:p-10">
              <p className="label flex items-center justify-between text-muted">
                <span>Request path</span>
                <span className="text-accent">{padIndex(project.flow.length)} steps</span>
              </p>
              <FlowDiagram nodes={project.flow} direction="horizontal" className="mt-8" />
            </div>
          </SpotlightCard>
        </Reveal>
      </Container>

      <section className="border-t border-line">
        <Container className="py-8 md:py-12">
          {chapters.map((chapter, index) => (
            <article
              key={chapter.label}
              className="grid gap-6 border-b border-line py-14 last:border-b-0 md:py-20 lg:grid-cols-[0.42fr_1fr] lg:gap-16"
            >
              <Reveal className="flex items-baseline gap-5 lg:block">
                <p className="font-display text-6xl font-light italic leading-none text-accent/45 md:text-7xl">
                  {padIndex(index + 1)}
                </p>
                <h2 className="label text-muted lg:mt-6">{chapter.label}</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-3xl font-display text-[clamp(1.4rem,2.5vw,2.1rem)] font-light leading-[1.4] tracking-[-0.012em] text-primary">
                  {chapter.body}
                </p>
              </Reveal>
            </article>
          ))}
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="grid gap-8 py-16 md:py-24 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="label text-muted">Built with</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ChipList items={project.stack} />
            {repository && (
              <ArrowLink href={repository.href} external className="mt-9">
                {repository.label} on GitHub
              </ArrowLink>
            )}
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line">
        <Link
          href={`/projects/${next.slug}`}
          className="work-row group relative block"
          aria-label={`Next project: ${next.title}`}
        >
          <Container className="relative flex items-center justify-between gap-8 py-16 md:py-24">
            <span className="block transition-transform duration-700 ease-expo group-hover:translate-x-4">
              <span className="label text-muted">Next project</span>
              <span className="mt-5 block font-display text-[clamp(2.25rem,6vw,5rem)] font-light leading-[1.02] tracking-[-0.03em] text-primary transition-colors duration-500 group-hover:text-accent-bright">
                {next.title}
              </span>
            </span>
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent transition-all duration-700 ease-expo group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent md:h-24 md:w-24">
              <ArrowRight className="h-5 w-5 md:h-7 md:w-7" />
            </span>
          </Container>
        </Link>
      </section>
    </main>
  );
}
