"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface CodeCommentLabelProps {
  children: string;
  className?: string;
}

export function CodeCommentLabel({ children, className }: CodeCommentLabelProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.p
      className={cn("font-mono text-[11px] tracking-[0.16em] text-accent-lavender/65", className)}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.p>
  );
}
