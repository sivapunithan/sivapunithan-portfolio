import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: readonly string[];
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
}

/**
 * Endless horizontal band of words. The list is rendered twice and the track slides
 * by exactly half its width, so the loop has no seam. Pauses on hover; the second
 * copy is hidden from assistive tech.
 */
export function Marquee({ items, reverse = false, duration = 48, className }: MarqueeProps) {
  const renderHalf = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <li key={item} className="flex items-center">
          <span
            className={cn(
              "px-6 font-display text-[clamp(2.5rem,6.2vw,5.25rem)] font-light italic leading-[1.3] tracking-[-0.02em] md:px-9",
              index % 2 === 0 ? "text-primary/90" : "text-outline",
            )}
          >
            {item}
          </span>
          <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-accent/70" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("marquee", className)}>
      <div
        className="marquee-track"
        data-reverse={reverse}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {renderHalf(false)}
        {renderHalf(true)}
      </div>
    </div>
  );
}
