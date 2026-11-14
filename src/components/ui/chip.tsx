import type { ProjectStatus } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ChipListProps {
  items: readonly string[];
  className?: string;
}

/** Quiet hairline tags for stacks and tools. */
export function ChipList({ items, className }: ChipListProps) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line px-3.5 py-1.5 text-[0.8125rem] leading-none text-secondary transition-colors duration-300 hover:border-line-strong hover:text-primary"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Project status. The label carries the meaning; the dot only reinforces it. */
export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <p className={cn("label inline-flex items-center gap-3 text-secondary", className)}>
      {status.tone === "active" && <span aria-hidden="true" className="pulse-dot" />}
      {status.tone === "building" && (
        <span aria-hidden="true" className="h-2 w-2 rounded-full border border-accent" />
      )}
      {status.tone === "private" && (
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-muted" />
      )}
      {status.label}
    </p>
  );
}
