"use client";

import { motion, useReducedMotion } from "motion/react";

const BOOT_LINES = [
  "javac Sivapunithan.java",
  "Loading Spring Boot modules...",
  "Connecting REST APIs...",
  "Indexing SQL queries...",
  "Running backend services...",
  "Java Developer initialized.",
] as const;

export function NeonTerminal() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="terminal-surface scanline-overlay neon-border max-w-xl overflow-hidden shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent-lavender)_10%,transparent),0_20px_46px_rgba(0,0,0,0.32)]">
      <div className="flex h-9 items-center justify-between border-b border-edge-subtle px-4">
        <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
          backend-profile.run
        </p>
        <span className="font-mono text-[10px] text-accent-green">ONLINE</span>
      </div>

      <div className="space-y-2 px-4 py-4 font-mono text-xs leading-relaxed sm:text-sm">
        {BOOT_LINES.map((line, index) => (
          <motion.p
            key={line}
            className="text-secondary"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: shouldReduceMotion ? 0 : index * 0.16 }}
          >
            <span className="text-accent-lavender">&gt; </span>
            {line}
          </motion.p>
        ))}

        <motion.p
          className="pt-3 text-base font-semibold text-primary sm:text-lg"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: shouldReduceMotion ? 0 : 1.1 }}
        >
          <span className="neon-text">Java Backend Developer</span>
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-5 w-2 translate-y-1 rounded-[1px] bg-accent-lavender shadow-[0_0_10px_var(--accent-lavender)] motion-safe:animate-[ide-blink_1s_step-end_infinite]"
          />
        </motion.p>
      </div>
    </div>
  );
}
