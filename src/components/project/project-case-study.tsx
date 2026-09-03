import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ProjectLinks } from "@/components/project/project-links";
import { StatusLabel } from "@/components/ui/status-label";
import type { Project } from "@/types/portfolio";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const sections = [
    { label: "Problem", body: project.problem },
    { label: "Responsibility", body: project.responsibility },
    { label: "Engineering decision", body: project.decision },
  ];

  return (
    <main id="main" className="min-h-screen">
      <Container className="py-16 md:py-24">
        <Link
          href="/#work"
          className="link-underline font-mono text-[10px] uppercase tracking-[0.16em] text-secondary"
        >
          ← Back to selected work
        </Link>

        <header className="mt-12 border-b border-edge pb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-orange">
            {project.index} / {project.category}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-primary sm:text-6xl md:text-7xl">
            {project.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-secondary">{project.summary}</p>
          <div className="mt-7 flex flex-wrap items-center gap-6">
            <StatusLabel label={project.status.label} tone={project.status.tone} />
            <ProjectLinks project={project} />
          </div>
        </header>

        <div className="grid gap-12 py-14 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
          <aside>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Stack</p>
            <p className="mt-4 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-secondary">
              {project.stack.join(" / ")}
            </p>
            {project.confidential && (
              <p className="mt-7 border-l border-accent-orange pl-4 text-sm leading-relaxed text-muted">
                Client, endpoint and schema details are intentionally withheld.
              </p>
            )}
          </aside>

          <article className="border-t border-edge">
            {sections.map((section) => (
              <section key={section.label} className="border-b border-edge-subtle py-9">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-orange">
                  {section.label}
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-secondary">
                  {section.body}
                </p>
              </section>
            ))}
          </article>
        </div>
      </Container>
    </main>
  );
}
