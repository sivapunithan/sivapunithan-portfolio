"use client";

import { motion, useReducedMotion } from "motion/react";

const SNIPPETS = [
  "@RestController",
  "@Service",
  "@Repository",
  "@Transactional",
  "public class Developer {}",
  "ResponseEntity.ok()",
  '@GetMapping("/api/projects")',
  "SpringApplication.run()",
] as const;

const POSITIONS = [
  "left-[6%] top-[18%]",
  "right-[8%] top-[16%]",
  "left-[12%] top-[58%]",
  "right-[14%] top-[54%]",
  "left-[38%] top-[12%]",
  "right-[28%] top-[72%]",
  "left-[54%] top-[42%]",
  "left-[24%] top-[78%]",
] as const;

export function FloatingCodeSnippets() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {SNIPPETS.map((snippet, index) => (
        <motion.span
          key={snippet}
          className={`absolute hidden font-mono text-[11px] tracking-[0.12em] text-accent-lavender/25 blur-[0.1px] drop-shadow-[0_0_14px_var(--accent-lavender)] sm:block ${
            POSITIONS[index]
          } ${index > 4 ? "lg:block sm:hidden" : ""}`}
          initial={{ opacity: 0, y: 8 }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.18, y: 0 }
              : { opacity: [0.12, 0.34, 0.16], y: [0, -12, 0] }
          }
          transition={{
            duration: 7 + index,
            delay: index * 0.18,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          {snippet}
        </motion.span>
      ))}
    </div>
  );
}
