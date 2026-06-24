"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useRevealFallback } from "@/components/motion/use-reveal-fallback";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  /** Vertical travel in pixels. */
  y?: number;
}

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/** One-time fade-and-rise reveal for small content blocks. */
export function FadeUp({ children, className, delay = 0, y = 16 }: FadeUpProps) {
  const shouldReveal = useRevealFallback();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={shouldReveal ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
