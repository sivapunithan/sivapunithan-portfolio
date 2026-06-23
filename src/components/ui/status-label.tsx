import type { AccentTone } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface StatusLabelProps {
  label: string;
  tone?: AccentTone;
  className?: string;
}

const DOT_TONE: Record<AccentTone, string> = {
  blue: "bg-accent-blue",
  green: "bg-accent-green",
  orange: "bg-accent-orange",
  yellow: "bg-accent-yellow",
  lavender: "bg-accent-lavender",
  neutral: "bg-muted",
};

/**
 * Small mono status line with a single muted dot. The text carries the
 * meaning; the colour is supplementary (never colour-only communication).
 */
export function StatusLabel({ label, tone = "neutral", className }: StatusLabelProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-secondary uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", DOT_TONE[tone])} />
      {label}
    </p>
  );
}
