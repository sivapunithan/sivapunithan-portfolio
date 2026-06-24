"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useRevealFallback } from "@/components/motion/use-reveal-fallback";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
}

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * One-time masked line reveal: the line rises out of an overflow-hidden
 * wrapper. The wrapper (not the clipped line) is observed for visibility —
 * the translated line itself never intersects the viewport, so observing
 * it directly would never trigger the animation.
 */
export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(wrapperRef, { once: true });
  const shouldReduceMotion = useReducedMotion();
  const shouldReveal = useRevealFallback();

  if (shouldReduceMotion) {
    return <span className={cn("block", className)}>{children}</span>;
  }

  return (
    <span ref={wrapperRef} className={cn("block overflow-hidden", className)}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={isInView || shouldReveal ? { y: "0%" } : undefined}
        transition={{ duration: 0.7, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}
