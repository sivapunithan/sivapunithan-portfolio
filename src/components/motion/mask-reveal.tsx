"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type MaskDirection = "left" | "up";

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  direction?: MaskDirection;
}

const EASE = [0.22, 0.61, 0.36, 1] as const;

const HIDDEN_CLIP: Record<MaskDirection, string> = {
  left: "inset(0 100% 0 0)",
  up: "inset(100% 0 0 0)",
};

/**
 * One-time clip-path reveal. clip-path is not covered by MotionConfig's
 * reducedMotion handling, so this component checks the preference itself.
 */
export function MaskReveal({ children, className, delay = 0, direction = "up" }: MaskRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: HIDDEN_CLIP[direction] }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
