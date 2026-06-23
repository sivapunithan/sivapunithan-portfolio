import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

/** Mono section index, e.g. "02 / SELECTED WORK". */
export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <p className={cn("font-mono text-xs tracking-[0.18em] text-muted", className)}>
      <span className="text-secondary">{index}</span>
      <span aria-hidden="true"> / </span>
      {label}
    </p>
  );
}
