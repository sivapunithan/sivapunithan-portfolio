"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IDE/terminal-style custom cursor — desktop (pointer:fine) only.
 * Automatically disabled for prefers-reduced-motion users.
 *
 * Three modes:
 *   default     — 14px outlined square with faint blue fill
 *   interactive — 20px square, brighter border
 *   text        — 2px × 18px vertical blue caret (I-beam)
 *
 * Position: driven by requestAnimationFrame, written directly to
 * style.transform — zero lag, no CSS transition on movement.
 * Shape: transitions via CSS transition on size/radius/background only.
 *
 * Trail: separate element lerped toward mouse at 0.15 factor.
 */

type CursorMode = "default" | "interactive" | "text";

const INTERACTIVE =
  'a, button, [role="button"], select, .cursor-interactive, [data-cursor="interactive"]';
const TEXT = 'input, textarea, [contenteditable="true"], [data-cursor="text"]';

const SHAPE: Record<CursorMode, React.CSSProperties> = {
  default: {
    width: 14,
    height: 14,
    borderRadius: 2,
    border: "1.5px solid var(--accent-blue)",
    background: "color-mix(in srgb, var(--accent-blue) 10%, transparent)",
    boxShadow: "none",
  },
  interactive: {
    width: 20,
    height: 20,
    borderRadius: 3,
    border: "1.5px solid var(--accent-blue)",
    background: "color-mix(in srgb, var(--accent-blue) 16%, transparent)",
    boxShadow: "none",
  },
  text: {
    width: 2,
    height: 18,
    borderRadius: 1,
    border: "none",
    background: "var(--accent-blue)",
    boxShadow: "none",
  },
};

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mountTimer = setTimeout(() => setMounted(true), 0);
    document.body.classList.add("custom-cursor-active");

    const mouse = { x: -200, y: -200 };
    const trail = { x: -200, y: -200 };
    let rafId = 0;
    let currentMode: CursorMode = "default";

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      let next: CursorMode = "default";
      if (t.closest(TEXT)) next = "text";
      else if (t.closest(INTERACTIVE)) next = "interactive";
      if (next !== currentMode) {
        currentMode = next;
        setMode(next);
      }
    };

    const tick = () => {
      const cursor = cursorRef.current;
      const trailEl = trailRef.current;

      if (cursor) {
        cursor.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
      }
      if (trailEl) {
        trail.x += (mouse.x - trail.x) * 0.15;
        trail.y += (mouse.y - trail.y) * 0.15;
        trailEl.style.transform = `translate(${trail.x}px, ${trail.y}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(mountTimer);
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Trail dot — lerped, always circular */}
      <div
        ref={trailRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 9998,
          pointerEvents: "none",
          willChange: "transform",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "color-mix(in srgb, var(--accent-blue) 24%, transparent)",
          marginLeft: -2.5,
          marginTop: -2.5,
          transform: "translate(-200px, -200px)",
        }}
      />

      {/* Main cursor — outer wrapper tracks mouse position */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
          transform: "translate(-200px, -200px)",
        }}
      >
        {/* Inner shape — centered, transitions on shape only */}
        <div
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            transition:
              "width 130ms ease, height 130ms ease, border-radius 130ms ease, background 130ms ease",
            ...SHAPE[mode],
          }}
        />
      </div>
    </>
  );
}
