"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

interface ScrollRotateProps {
  children: ReactNode;
  className?: string;
  /** Degrees of rotation per pixel scrolled; negative values turn the other way. */
  ratio?: number;
}

/**
 * Turns its child as the page scrolls — the site's signature: the gears in the
 * margins are driven by the reader, so the page behaves like a machine.
 */
export function ScrollRotate({ children, className, ratio = 0.06 }: ScrollRotateProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, (value) => (reduceMotion ? 0 : value * ratio));

  return (
    <motion.div aria-hidden="true" className={className} style={{ rotate }}>
      {children}
    </motion.div>
  );
}
