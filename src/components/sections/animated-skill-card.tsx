"use client";

import { motion, useReducedMotion } from "motion/react";

interface AnimatedSkillCardProps {
  item: string;
  index: number;
}

export function AnimatedSkillCard({ item, index }: AnimatedSkillCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li
      className="group flex min-h-11 items-center justify-between gap-3 border-b border-edge-subtle py-2.5 text-sm text-secondary transition-colors duration-200 last:border-b-0 hover:text-primary"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.36, delay: shouldReduceMotion ? 0 : index * 0.035 }}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
    >
      <span className="flex min-w-0 items-center gap-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-green shadow-[0_0_10px_var(--accent-green)]" />
        <span className="font-mono text-[10px] tracking-[0.12em] text-accent-lavender/80">
          [BUILD SUCCESS]
        </span>
      </span>
      <span className="min-w-0 flex-1 truncate text-right" title={item}>
        {item}
      </span>
      <span
        aria-hidden="true"
        className="hidden h-3 w-px shrink-0 bg-accent-lavender/70 motion-safe:animate-[ide-blink_0.9s_step-end_infinite] sm:block"
      />
    </motion.li>
  );
}
