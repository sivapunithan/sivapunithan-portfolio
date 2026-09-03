import type { ReactNode } from "react";
import { MaskReveal } from "@/components/motion/mask-reveal";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
}

/** Project visual wrapper retained as a semantic component boundary. */
export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  return (
    <MaskReveal className={className} delay={delay} direction="up">
      {children}
    </MaskReveal>
  );
}
