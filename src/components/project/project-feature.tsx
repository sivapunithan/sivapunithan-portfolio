import type { Project } from "@/types/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { ProjectLinks } from "@/components/project/project-links";
import { ProjectVisual } from "@/components/project/project-visual";
import { StatusLabel } from "@/components/ui/status-label";
import { TerminalBlock } from "@/components/ui/terminal-block";
import { cn } from "@/lib/utils";

interface ProjectFeatureProps {
  project: Project;
}

function ProjectHeader({ project }: ProjectFeatureProps) {
  return (
    <div className="space-y-4">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted">
        <span className="text-secondary">{project.index}</span>
        <span aria-hidden="true"> — </span>
        {project.category}
      </p>
      <h3
        className={cn(
          "font-display text-2xl font-semibold tracking-tight text-primary md:text-3xl",
          "transition-transform duration-200 motion-reduce:transform-none lg:group-hover:translate-x-1.5",
        )}
      >
        {project.title}
      </h3>
      <p className="max-w-prose leading-relaxed text-secondary">{project.summary}</p>
    </div>
  );
}

function ProjectHighlights({ project }: ProjectFeatureProps) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted">
        {project.highlightsLabel}
      </p>
      <ul className="space-y-2">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-secondary">
            <span aria-hidden="true" className="font-mono text-muted/70 select-none">
              –
            </span>
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectMeta({ project }: ProjectFeatureProps) {
  return (
    <div className="space-y-5">
      <p className="font-mono text-xs leading-relaxed tracking-wide text-muted">
        {project.stack.join(" · ")}
      </p>
      <StatusLabel label={project.status.label} tone={project.status.tone} />
      <ProjectLinks project={project} />
    </div>
  );
}

/**
 * Editorial project row. Three layout variants keep the section from
 * collapsing into an identical card grid:
 *   imageLeft   visual 5 cols · content 6 cols
 *   imageRight  content 6 cols · visual 5 cols
 *   wide        text-only row, content + highlights side by side
 *
 * The whole row is a hover group: the divider brightens and the title
 * nudges 6px to the right on desktop.
 */
export function ProjectFeature({ project }: ProjectFeatureProps) {
  const isWide = project.layout === "wide";

  return (
    <article className="group">
      <div
        aria-hidden="true"
        className="h-px bg-edge-subtle transition-colors duration-300 group-hover:bg-edge"
      />

      <SectionReveal className="py-12 md:py-16">
        {isWide ? (
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="space-y-8 lg:col-span-7">
              <ProjectHeader project={project} />
              <ProjectMeta project={project} />
            </div>
            <div className="space-y-8 lg:col-span-4 lg:col-start-9">
              <ProjectHighlights project={project} />
              {project.terminalBlock && project.terminalBlock.length > 0 && (
                <TerminalBlock lines={project.terminalBlock} />
              )}
            </div>
          </div>
        ) : (
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
            <div
              className={cn(
                "space-y-8",
                project.layout === "imageLeft"
                  ? "lg:col-span-6 lg:col-start-7"
                  : "lg:col-span-6 lg:col-start-1",
              )}
            >
              <ProjectHeader project={project} />
              <ProjectHighlights project={project} />
              <ProjectMeta project={project} />
            </div>
            <ProjectVisual
              project={project}
              className={cn(
                "lg:row-start-1",
                project.layout === "imageLeft"
                  ? "lg:col-span-5 lg:col-start-1"
                  : "lg:col-span-5 lg:col-start-8",
              )}
            />
          </div>
        )}
      </SectionReveal>
    </article>
  );
}
