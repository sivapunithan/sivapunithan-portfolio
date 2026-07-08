"use client";

import { motion, useReducedMotion } from "motion/react";
import type { FocusItem, FocusStatus } from "@/types/portfolio";
import { cn } from "@/lib/utils";

// Maps focus status to IntelliJ TODO-panel keyword style
const TODO_KEYWORD: Record<FocusStatus, string> = {
  LEARNING: "TODO",
  PRACTISING: "NOTE",
  BUILDING: "WIP ",
};

const TODO_TONE: Record<FocusStatus, string> = {
  LEARNING: "text-accent-yellow",
  PRACTISING: "text-accent-blue",
  BUILDING: "text-accent-green",
};

const TODO_BG: Record<FocusStatus, string> = {
  LEARNING: "bg-accent-yellow/8",
  PRACTISING: "bg-accent-blue/8",
  BUILDING: "bg-accent-green/8",
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

interface FocusItemsProps {
  items: FocusItem[];
}

function TodoRow({ item }: { item: FocusItem }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-edge-subtle py-3.5">
      <p className="flex items-baseline gap-3">
        {/* Line number column — IDE TODO panel style */}
        <span
          aria-hidden="true"
          className="font-mono text-[10px] text-muted/40 select-none w-5 text-right"
        >
          {item.index}
        </span>
        {/* TODO keyword badge */}
        <span
          className={cn(
            "font-mono text-[10px] tracking-[0.18em] px-1.5 py-0.5 rounded-[0.25rem]",
            TODO_TONE[item.status],
            TODO_BG[item.status],
          )}
        >
          {TODO_KEYWORD[item.status]}
        </span>
        {/* Description rendered as a comment body */}
        <span className="font-mono text-[12px] text-secondary">{item.title}</span>
      </p>
      <p
        className={cn(
          "font-mono text-[10px] tracking-[0.18em] whitespace-nowrap",
          TODO_TONE[item.status],
        )}
      >
        {item.status}
      </p>
    </div>
  );
}

/**
 * IntelliJ-inspired TODO tool window panel.
 * Rows reveal with stagger; keyword badges mirror TODO / NOTE / WIP markers.
 */
export function FocusItems({ items }: FocusItemsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-[0.9rem] border border-edge bg-background-deep">
      {/* Tool-window title bar */}
      <div className="flex h-9 items-center justify-between border-b border-edge bg-surface/40 px-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-accent-yellow shadow-[0_0_8px_var(--accent-yellow)]"
          />
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted/70 uppercase">
            TODO · CurrentFocus.java
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted/50">{items.length} items</span>
      </div>

      {/* Column headers */}
      <div className="flex items-center gap-3 border-b border-edge-subtle bg-surface/20 px-4 py-2">
        <span className="w-5 font-mono text-[9px] tracking-[0.18em] text-muted/40 uppercase text-right select-none">
          #
        </span>
        <span className="font-mono text-[9px] tracking-[0.18em] text-muted/40 uppercase w-10">
          Type
        </span>
        <span className="font-mono text-[9px] tracking-[0.18em] text-muted/40 uppercase">
          Description
        </span>
        <span className="ml-auto font-mono text-[9px] tracking-[0.18em] text-muted/40 uppercase">
          Status
        </span>
      </div>

      {/* Rows */}
      <div className="px-4">
        {shouldReduceMotion ? (
          items.map((item) => <TodoRow key={item.title} item={item} />)
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
          >
            {items.map((item) => (
              <motion.div key={item.title} variants={rowVariants}>
                <TodoRow item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
