import Link from "next/link";
import { ProjectLinks } from "@/components/project/project-links";
import { ProjectVisual } from "@/components/project/project-visual";
import { SectionReveal } from "@/components/motion/section-reveal";
import { StatusLabel } from "@/components/ui/status-label";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ProjectFeatureProps {
  project: Project;
}

function ProjectDetails({ project }: ProjectFeatureProps) {
  const details = [
    ["Problem", project.problem],
    ["Responsibility", project.responsibility],
    ["Engineering decision", project.decision],
  ];

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        {project.category}
      </p>
      <h3 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-0.03em] text-primary sm:text-4xl">
        <Link href={`/projects/${project.slug}`} className="transition-colors hover:text-accent-orange">
          {project.title}
        </Link>
      </h3>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary">{project.summary}</p>

      <dl className="mt-8 space-y-5">
        {details.map(([term, description]) => (
          <div key={term} className="grid gap-2 sm:grid-cols-[9rem_1fr]">
            <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent-orange">
              {term}
            </dt>
            <dd className="max-w-2xl text-sm leading-relaxed text-secondary">{description}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 border-t border-edge-subtle pt-5">
        <p className="font-mono text-[10px] leading-relaxed tracking-[0.08em] text-muted">
          {project.stack.join(" / ")}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <StatusLabel label={project.status.label} tone={project.status.tone} />
          <ProjectLinks project={project} />
          <Link
            href={`/projects/${project.slug}`}
            className="link-underline font-mono text-[10px] uppercase tracking-[0.16em] text-primary"
          >
            View case study →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ProjectFeature({ project }: ProjectFeatureProps) {
  const visualFirst = project.layout === "imageLeft";

  return (
    <article className="border-t border-edge py-14 md:py-20">
      <SectionReveal>
        <div className="mb-8 flex items-center gap-4">
          <span className="font-display text-5xl font-semibold text-primary/15 sm:text-6xl">
            {project.index}
          </span>
          <span className="h-px flex-1 bg-edge-subtle" aria-hidden="true" />
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div
            className={cn(
              "lg:col-span-7",
              visualFirst ? "lg:col-start-6" : "lg:col-start-1",
              project.layout === "wide" && "lg:col-span-8",
            )}
          >
            <ProjectDetails project={project} />
          </div>
          {project.layout !== "wide" && (
            <ProjectVisual
              project={project}
              className={cn(
                "lg:row-start-1 lg:col-span-5",
                visualFirst ? "lg:col-start-1" : "lg:col-start-8",
              )}
            />
          )}
          {project.layout === "wide" && (
            <div className="hidden border-l border-edge-subtle pl-8 lg:col-span-3 lg:col-start-10 lg:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Private system
              </p>
              <p className="mt-4 text-sm leading-relaxed text-secondary">
                The case study communicates the engineering shape while withholding client, schema and endpoint details.
              </p>
            </div>
          )}
        </div>
      </SectionReveal>
    </article>
  );
}
