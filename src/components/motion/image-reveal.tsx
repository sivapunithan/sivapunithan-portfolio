"use client";

import type { ReactNode } from "react";
import { MaskReveal } from "@/components/motion/mask-reveal";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
}

/** Controlled mask reveal tuned for project visuals (bottom-up wipe). */
export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  return (
    <MaskReveal className={className} delay={delay} direction="up">
      {children}
    </MaskReveal>
  );
}
