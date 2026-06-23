"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

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
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
