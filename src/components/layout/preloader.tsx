"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { INTRO_STORAGE_KEY, useIntro } from "@/components/motion/intro-context";
import { introContent, siteConfig } from "@/data/portfolio";
import { useScrollLock } from "@/hooks/use-scroll-lock";

const EXIT_EASE = [0.76, 0, 0.24, 1] as const;

/**
 * First-visit opener: a brass ring winds up to 100, then the panel lifts off the page.
 * It is server-rendered so the first paint is already covered; a head script hides it
 * for repeat visits in the same session and for reduced-motion users.
 */
export function Preloader() {
  const { seen, finish } = useIntro();
  const [phase, setPhase] = useState<"loading" | "leaving" | "gone">("loading");
  const progress = useMotionValue(0);
  const percent = useTransform(progress, (value) => String(Math.round(value * 100)).padStart(2, "0"));
  const active = !seen && phase !== "gone";

  useScrollLock(active);

  useEffect(() => {
    if (document.documentElement.dataset.intro === "seen") return;

    let left = false;
    let goneTimer = 0;

    // Leaving is driven by timers, not by animation callbacks: if the browser pauses
    // animation frames (background tab, power saving), the visitor is still let in.
    const leave = () => {
      if (left) return;
      left = true;
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
      } catch {
        // Storage can be unavailable in privacy modes; the intro simply replays next load.
      }
      progress.set(1);
      setPhase("leaving");
      finish();
      goneTimer = window.setTimeout(() => {
        document.documentElement.dataset.intro = "seen";
        setPhase("gone");
      }, 1050);
    };

    const controls = animate(progress, 1, { duration: 2.2, ease: [0.65, 0, 0.35, 1] });
    const leaveTimer = window.setTimeout(leave, 2350);

    window.addEventListener("keydown", leave);
    window.addEventListener("pointerdown", leave);

    return () => {
      controls.stop();
      window.clearTimeout(leaveTimer);
      window.clearTimeout(goneTimer);
      window.removeEventListener("keydown", leave);
      window.removeEventListener("pointerdown", leave);
    };
  }, [progress, finish]);

  if (!active) return null;

  return (
    <motion.div
      className="preloader fixed inset-0 z-[100] flex flex-col bg-background-deep"
      role="status"
      aria-label={`Loading ${siteConfig.name}'s portfolio`}
      initial={false}
      animate={{ y: phase === "leaving" ? "-100%" : "0%" }}
      transition={{ duration: 1, ease: EXIT_EASE }}
    >
      <motion.div
        className="flex flex-1 flex-col"
        animate={{ opacity: phase === "leaving" ? 0 : 1, y: phase === "leaving" ? -40 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between px-6 pt-7 sm:px-10">
          <p className="label text-muted">{introContent.role}</p>
          <p className="label text-muted">{siteConfig.domain}</p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="relative h-28 w-28">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="50" cy="50" r="47" fill="none" stroke="var(--line)" strokeWidth="1" />
              <motion.circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ pathLength: progress }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-light italic text-primary">
              {siteConfig.brandMark}
            </span>
          </div>
          <p className="mt-9 font-display text-[clamp(2rem,5vw,3.25rem)] font-light leading-none tracking-[-0.02em] text-primary">
            {introContent.name}
          </p>
        </div>

        <div className="flex items-end justify-between px-6 pb-7 sm:px-10">
          <p className="label text-muted">
            {introContent.note}
            <span className="ml-4 hidden text-muted/70 sm:inline">· Press any key to skip</span>
          </p>
          <motion.span className="font-display text-[clamp(3.5rem,11vw,8rem)] font-light leading-[0.8] tracking-[-0.04em] text-accent tabular-nums">
            {percent}
          </motion.span>
        </div>
      </motion.div>
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-accent" />
    </motion.div>
  );
}
