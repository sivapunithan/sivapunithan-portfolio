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
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-[0.4rem] border border-accent-lavender/70",
        "bg-[linear-gradient(180deg,var(--surface-raised),var(--background-deep))] text-[11px] font-semibold",
        "tracking-[0.08em] text-primary shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent-lavender)_20%,transparent),0_0_14px_color-mix(in_srgb,var(--accent-lavender)_18%,transparent)]",
      )}
    >
      <span className="relative inline-flex leading-none">
        <span>SP</span>
        <span
          aria-hidden="true"
          className="absolute -right-2 -top-1 h-1.5 w-1.5 rounded-full bg-accent-orange shadow-[0_0_10px_var(--accent-orange)]"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-px w-full bg-accent-lavender/60"
        />
      </span>
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
