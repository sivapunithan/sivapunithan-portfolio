"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useIntro } from "@/components/motion/intro-context";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Rise distance in pixels. */
  y?: number;
  /** "view" plays when scrolled into view; "intro" plays once the preloader/curtain clears. */
  trigger?: "view" | "intro";
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Soft fade-and-rise used for everything that isn't a headline. */
export function Reveal({ children, className, delay = 0, y = 26, trigger = "view" }: RevealProps) {
  const { done } = useIntro();
  const hidden = { opacity: 0, y };
  const shown = { opacity: 1, y: 0 };

  const playback =
    trigger === "view"
      ? { whileInView: shown, viewport: { once: true, margin: "0px 0px -10% 0px" } }
      : { animate: done ? shown : hidden };

  return (
    <motion.div
      className={className}
      initial={hidden}
      transition={{ duration: 1, delay, ease: EASE }}
      {...playback}
    >
      {children}
    </motion.div>
  );
}
