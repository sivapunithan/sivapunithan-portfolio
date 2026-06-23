import Image from "next/image";
import type { Project } from "@/types/portfolio";
import { ImageReveal } from "@/components/motion/image-reveal";
import { ProjectPlaceholder } from "@/components/project/project-placeholder";
import { isPlaceholder } from "@/lib/utils";

interface ProjectVisualProps {
  project: Project;
  className?: string;
}

/**
 * Renders the real screenshot via next/image when one exists; otherwise
 * falls back to the designed IDE-inspired placeholder. Both arrive with
 * a one-time mask reveal.
 */
export function ProjectVisual({ project, className }: ProjectVisualProps) {
  const hasScreenshot = !isPlaceholder(project.image.src);

  return (
    <ImageReveal className={className}>
      {hasScreenshot ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={1280}
          height={800}
          loading="lazy"
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="border border-edge"
        />
      ) : (
        <ProjectPlaceholder index={project.index} title={project.title} accent={project.accent} />
      )}
    </ImageReveal>
  );
}
