import type { Project } from "@/types/portfolio";
import { TextLink } from "@/components/ui/text-link";
import { isPlaceholder } from "@/lib/utils";

interface ProjectLinksProps {
  project: Project;
}

/**
 * Confidential work never renders outbound actions. Placeholder URLs are
 * skipped entirely so a missing link can never become a broken one.
 */
export function ProjectLinks({ project }: ProjectLinksProps) {
  if (project.confidential) {
    return (
      <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
        Private codebase — details available in conversation
      </p>
    );
  }

  const visibleLinks = project.links.filter((link) => !isPlaceholder(link.href));

  if (visibleLinks.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap items-center gap-6">
      {visibleLinks.map((link) => (
        <li key={link.label}>
          <TextLink href={link.href} mono arrow external>
            {link.label}
          </TextLink>
        </li>
      ))}
    </ul>
  );
}
