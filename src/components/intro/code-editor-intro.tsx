"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EditorProfile } from "@/components/intro/editor-profile";
import { introContent } from "@/data/portfolio";
import { useIntroSession } from "@/components/intro/use-intro-session";

const STAGE_DELAYS = [700, 2300, 3500, 4600] as const;

export function CodeEditorIntro() {
  const { isReady, shouldShow, complete } = useIntroSession();
  const [stage, setStage] = useState(0);
  const hasOpened = useRef(false);

  const closeIntro = useCallback(() => complete(), [complete]);

  useEffect(() => {
    if (!shouldShow) return;

    hasOpened.current = true;
    document.body.classList.add("intro-visible");

    const timers = STAGE_DELAYS.map((delay, index) =>
      window.setTimeout(() => {
        if (index === STAGE_DELAYS.length - 1) closeIntro();
        else setStage(index + 1);
      }, delay),
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeIntro();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      timers.forEach(window.clearTimeout);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("intro-visible");
    };
  }, [closeIntro, shouldShow]);

  const focusHero = () => {
    if (!hasOpened.current) return;
    document.getElementById("hero-heading")?.focus({ preventScroll: true });
  };

  if (!isReady) return null;

  return (
    <AnimatePresence onExitComplete={focusHero}>
      {shouldShow && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background-deep p-3 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          aria-label="Engineer profile introduction"
        >
          <button
            type="button"
            onClick={closeIntro}
            className="absolute right-3 top-3 z-10 min-h-11 border border-edge px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-secondary transition-colors hover:border-accent-orange hover:text-primary sm:right-8 sm:top-8"
          >
            {introContent.skipLabel}
          </button>

          <motion.div
            className="relative flex h-[min(41rem,calc(100svh-1.5rem))] w-full max-w-5xl flex-col overflow-hidden border border-edge bg-background"
            animate={
              stage >= 3
                ? { width: "100vw", maxWidth: "100vw", height: "100svh", borderColor: "transparent" }
                : { width: "100%", maxWidth: "64rem" }
            }
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-11 shrink-0 items-end border-b border-edge-subtle">
              <div className="flex h-full items-center border-r border-edge-subtle border-t-2 border-t-accent-orange px-4 font-mono text-[10px] tracking-[0.08em] text-primary sm:px-5 sm:text-xs">
                <span className="mr-2 text-accent-orange">J</span>
                {introContent.tab}
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <motion.p
                className="px-4 py-3 font-mono text-[10px] text-muted sm:px-5 sm:text-xs"
                animate={{ opacity: stage === 0 ? 1 : 0.45 }}
              >
                {introContent.openingMessage}
              </motion.p>
              <EditorProfile isVisible={stage >= 1} />
            </div>

            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-background/95 px-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  <div>
                    <p className="font-display text-5xl font-semibold tracking-[-0.04em] text-primary sm:text-7xl">
                      {introContent.revealName}
                    </p>
                    <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-accent-orange sm:text-sm">
                      {introContent.revealRole}
                    </p>
                    <p className="mt-5 text-lg text-secondary sm:text-2xl">
                      {introContent.revealStatement}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
