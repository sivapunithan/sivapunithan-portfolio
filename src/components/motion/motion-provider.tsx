"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global motion boundary. reducedMotion="user" disables transform-based
 * animation for users with prefers-reduced-motion while keeping opacity
 * transitions, so content never disappears.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
