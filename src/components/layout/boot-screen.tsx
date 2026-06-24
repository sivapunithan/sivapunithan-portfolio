"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const LINES = [
  { text: "$ init portfolio", color: "var(--text-primary)" },
  { text: "loading workspace...", color: "var(--text-secondary)" },
  { text: "indexing projects...", color: "var(--text-secondary)" },
  { text: "mounting experience...", color: "var(--text-secondary)" },
  { text: "ready.", color: "var(--accent-green)" },
] as const;

const LINE_MS = 220;
const FADE_START_MS = LINES.length * LINE_MS + 150;
const DONE_MS = FADE_START_MS + 320;
const SESSION_KEY = "portfolio-boot-complete";

/**
 * Terminal-style boot overlay. Shows once per browser session.
 * Covers the page until the sequence ends, then fades away.
 * Skipped entirely when prefers-reduced-motion is set.
 */
export function BootScreen() {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [fading, setFading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setShow(true), 0));

    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setCount(i + 1), i * LINE_MS + 40));
    });

    timers.push(setTimeout(() => setFading(true), FADE_START_MS));

    timers.push(
      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem(SESSION_KEY, "1");
      }, DONE_MS),
    );

    return () => timers.forEach(clearTimeout);
  }, [shouldReduceMotion]);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "var(--background-deep)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: fading ? "opacity 320ms ease" : "none",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          lineHeight: "1.85",
          minWidth: "240px",
        }}
      >
        {LINES.slice(0, count).map((line, i) => (
          <div key={line.text} style={{ color: line.color }}>
            {line.text}
            {i === count - 1 && (
              <span
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 13,
                  background: "var(--accent-blue)",
                  marginLeft: 3,
                  verticalAlign: "text-bottom",
                  animation: "ide-blink 0.75s step-end infinite",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
