"use client";

import { motion, useReducedMotion } from "motion/react";
import type { FocusItem, FocusStatus } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const STATUS_MARKER: Record<FocusStatus, string> = {
  LEARNING: "▷",
  PRACTISING: "◆",
  BUILDING: "▶",
};

const STATUS_TONE: Record<FocusStatus, string> = {
  LEARNING: "text-accent-yellow/90",
  PRACTISING: "text-accent-blue/70",
  BUILDING: "text-accent-green/80",
};

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE },
  },
};

const markerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 1, 0.25, 1],
    transition: { duration: 0.45, times: [0, 0.25, 0.6, 1] },
  },
};

interface FocusItemsProps {
  items: FocusItem[];
}

/**
 * Staggered focus item list — rows reveal one by one, markers flicker once
 * as each row enters. Client component required for motion variants.
 */
export function FocusItems({ items }: FocusItemsProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <ul className="border-t border-edge">
        {items.map((item) => (
          <li
            key={item.title}
            className="flex items-baseline justify-between gap-6 border-b border-edge-subtle py-4.5"
          >
            <p className="flex items-baseline gap-3">
              <span
                aria-hidden="true"
                className={cn("font-mono text-[11px] select-none", STATUS_TONE[item.status])}
              >
                {STATUS_MARKER[item.status]}
              </span>
              <span className="font-mono text-[11px] text-muted">{item.index}</span>
              <span className="text-base text-primary">{item.title}</span>
            </p>
            <p
              className={cn(
                "font-mono text-[11px] tracking-[0.18em] whitespace-nowrap",
                STATUS_TONE[item.status],
              )}
            >
              {item.status}
            </p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      className="border-t border-edge"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {items.map((item) => (
        <motion.li
          key={item.title}
          variants={rowVariants}
          className="flex items-baseline justify-between gap-6 border-b border-edge-subtle py-4.5"
        >
          <p className="flex items-baseline gap-3">
            <motion.span
              aria-hidden="true"
              variants={markerVariants}
              className={cn("font-mono text-[11px] select-none", STATUS_TONE[item.status])}
            >
              {STATUS_MARKER[item.status]}
            </motion.span>
            <span className="font-mono text-[11px] text-muted">{item.index}</span>
            <span className="text-base text-primary">{item.title}</span>
          </p>
          <p
            className={cn(
              "font-mono text-[11px] tracking-[0.18em] whitespace-nowrap",
              STATUS_TONE[item.status],
            )}
          >
            {item.status}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
