"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/** Panel with a soft brass glow that follows the pointer across its surface. */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      onPointerMove={handleMove}
      className={cn(
        "spotlight relative overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-500 hover:border-line-strong",
        className,
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
}
