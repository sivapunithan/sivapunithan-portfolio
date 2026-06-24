"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useRevealFallback } from "@/components/motion/use-reveal-fallback";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
}

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * One-time reveal for whole section blocks: a slightly longer, calmer
 * variant of FadeUp with a deeper viewport margin so sections settle in
 * before they reach the middle of the screen.
 */
export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const shouldReveal = useRevealFallback();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={
        shouldReveal || shouldReduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
