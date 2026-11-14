import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

/** Section marker: brass index, a short rule, then the section name. */
export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <p className={cn("label flex items-center gap-4 text-muted", className)}>
      <span className="text-accent">{index}</span>
      <span aria-hidden="true" className="h-px w-10 bg-line-strong" />
      <span>{label}</span>
    </p>
  );
}
