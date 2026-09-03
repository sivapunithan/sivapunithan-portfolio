import type { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Content-first wrapper. The narrative intro carries the site's primary motion. */
export function FadeUp({ children, className }: FadeUpProps) {
  return <div className={className}>{children}</div>;
}
