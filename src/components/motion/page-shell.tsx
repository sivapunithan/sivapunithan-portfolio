"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.main
      id="main"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}
