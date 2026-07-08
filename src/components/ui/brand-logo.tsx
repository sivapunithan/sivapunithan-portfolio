import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  href?: string;
  label?: string;
  showTooltip?: boolean;
}

function BrandLogoMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-7 w-7 items-center justify-center rounded-[0.35rem] border border-accent-lavender/40 bg-surface-raised font-mono text-[10px] font-bold tracking-wider text-primary"
    >
      SP
    </span>
  );
}

export function BrandLogo({
  className,
  href = "#intro",
  label = "Sivapunithan S portfolio home",
  showTooltip = true,
}: BrandLogoProps) {
  return (
    <a
      href={href}
      aria-label={label}
      title={showTooltip ? "class SP" : undefined}
      className={cn(
        "group inline-flex items-center gap-3 text-primary transition duration-200 motion-reduce:transition-none",
        "hover:-translate-y-px hover:text-accent-lavender focus-visible:-translate-y-px focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-lavender/60",
        className,
      )}
    >
      <BrandLogoMark />
      <span className="hidden font-mono text-[10px] tracking-[0.16em] text-muted uppercase sm:inline">
        Sivapunithan.java
      </span>
    </a>
  );
}
