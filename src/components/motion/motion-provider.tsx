"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { IntroProvider } from "@/components/motion/intro-context";

/**
 * Global motion boundary: inertia scrolling (Lenis), reduced-motion handling
 * (transforms are skipped for users who ask for less motion), and intro state.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1, stopInertiaOnNavigate: true }}>
        <IntroProvider>{children}</IntroProvider>
      </ReactLenis>
    </MotionConfig>
  );
}
