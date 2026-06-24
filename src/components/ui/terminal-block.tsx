"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface TerminalBlockProps {
  lines: readonly string[];
}

const LINE_MS = 340;

function parseLine(line: string): React.ReactNode {
  if (line.startsWith("$ ")) {
    return (
      <>
        <span style={{ color: "var(--accent-blue)" }}>$ </span>
        <span style={{ color: "var(--text-primary)" }}>{line.slice(2)}</span>
      </>
    );
  }
  if (line.startsWith("status: ")) {
    return (
      <>
        <span style={{ color: "var(--text-muted)" }}>status: </span>
        <span style={{ color: "var(--accent-green)" }}>{line.slice(8)}</span>
      </>
    );
  }
  if (line.startsWith("stack: ")) {
    return (
      <>
        <span style={{ color: "var(--text-muted)" }}>stack: </span>
        <span style={{ color: "var(--accent-orange)" }}>{line.slice(7)}</span>
      </>
    );
  }
  return <span style={{ color: "var(--text-secondary)" }}>{line}</span>;
}

/**
 * Animated terminal output block. Lines reveal one by one when the block
 * enters the viewport. Runs once. Blink caret at active line.
 * Respects prefers-reduced-motion — shows all lines instantly if set.
 */
export function TerminalBlock({ lines }: TerminalBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(0);
  const [started, setStarted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const visibleLines = shouldReduceMotion ? lines.length : visible;

  useEffect(() => {
    if (shouldReduceMotion) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-15% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldReduceMotion, lines.length]);

  useEffect(() => {
    if (!started || shouldReduceMotion) return;
    if (visible >= lines.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), LINE_MS);
    return () => clearTimeout(t);
  }, [started, visible, lines.length, shouldReduceMotion]);

  const done = visibleLines >= lines.length;

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        lineHeight: "1.9",
        background: "var(--background-deep)",
        border: "1px solid var(--border)",
        position: "relative",
      }}
    >
      {/* File tab strip */}
      <div
        style={{
          height: 28,
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          paddingLeft: 12,
          fontSize: 10,
          color: "var(--text-muted)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        debug.log
      </div>

      <div style={{ padding: "12px 16px" }}>
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ minHeight: "1.5em" }}>
            {parseLine(line)}
            {i === visibleLines - 1 && !done && (
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 11,
                  background: "var(--accent-blue)",
                  marginLeft: 2,
                  verticalAlign: "text-bottom",
                  animation: "ide-blink 0.75s step-end infinite",
                }}
              />
            )}
          </div>
        ))}
        {done && (
          <div style={{ color: "var(--accent-green)", marginTop: 4 }}>
            ✓ debug session complete
          </div>
        )}
      </div>
    </div>
  );
}
