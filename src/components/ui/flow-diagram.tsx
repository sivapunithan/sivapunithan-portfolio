import { Fragment } from "react";
import { Reveal } from "@/components/motion/reveal";
import type { FlowNode } from "@/types/portfolio";
import { cn, padIndex } from "@/lib/utils";

interface FlowDiagramProps {
  nodes: readonly FlowNode[];
  /** "horizontal" lays the path out in a row from the lg breakpoint; it stacks below that. */
  direction?: "vertical" | "horizontal";
  className?: string;
}

/**
 * A request path drawn as plates joined by hairlines. A glint travels from the first
 * node to the last on a loop, one connector at a time (see `.flow-pulse` in globals.css).
 */
export function FlowDiagram({ nodes, direction = "vertical", className }: FlowDiagramProps) {
  return (
    <ol className={cn("flow", className)} data-direction={direction}>
      {nodes.map((node, index) => (
        <Fragment key={node.label}>
          <li className="flow-node">
            <Reveal delay={index * 0.09} y={14} className="h-full">
              <div className="flow-plate flex h-full items-start gap-4 rounded-2xl border border-line bg-surface-raised px-4 py-3.5">
                <span className="label mt-0.5 text-accent">{padIndex(index + 1)}</span>
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] font-medium leading-snug text-primary">
                    {node.label}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">
                    {node.detail}
                  </span>
                </span>
              </div>
            </Reveal>
          </li>
          {index < nodes.length - 1 && (
            <li aria-hidden="true" className="flow-link">
              <span className="flow-pulse" style={{ animationDelay: `${index * 0.9}s` }} />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  );
}
