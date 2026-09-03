import type { ReactNode } from "react";

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "up";
}

/** Stable visual wrapper; project imagery never depends on hydration to appear. */
export function MaskReveal({ children, className }: MaskRevealProps) {
  return <div className={className}>{children}</div>;
}
