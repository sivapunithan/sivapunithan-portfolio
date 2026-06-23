import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  segments: string[];
  className?: string;
}

/** IDE-style pseudo-path, e.g. "src / portfolio / Sivapunithan.java". */
export function Breadcrumb({ segments, className }: BreadcrumbProps) {
  return (
    <p className={cn("font-mono text-xs text-muted", className)}>
      {segments.map((segment, index) => (
        <Fragment key={segment}>
          {index > 0 && (
            <span aria-hidden="true" className="mx-1.5 text-muted/60">
              /
            </span>
          )}
          <span>{segment}</span>
        </Fragment>
      ))}
    </p>
  );
}
