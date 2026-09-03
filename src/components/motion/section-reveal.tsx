import type { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Keeps section HTML visible even when JavaScript or observers are unavailable. */
export function SectionReveal({ children, className }: SectionRevealProps) {
  return <div className={className}>{children}</div>;
}
