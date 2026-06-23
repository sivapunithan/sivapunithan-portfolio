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
        <span style={{ color: "#6ea8fe" }}>$ </span>
        <span style={{ color: "#dfe1e5" }}>{line.slice(2)}</span>
      </>
    );
  }
  if (line.startsWith("status: ")) {
    return (
      <>
        <span style={{ color: "#7a7e85" }}>status: </span>
        <span style={{ color: "#6aab73" }}>{line.slice(8)}</span>
      </>
    );
  }
  if (line.startsWith("stack: ")) {
    return (
      <>
        <span style={{ color: "#7a7e85" }}>stack: </span>
        <span style={{ color: "#cf8e6d" }}>{line.slice(7)}</span>
      </>
    );
  }
  return <span style={{ color: "#bcbec4" }}>{line}</span>;
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

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisible(lines.length);
      return;
    }

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

  const done = visible >= lines.length;

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
          borderBottom: "1px solid rgba(255,255,255,0.055)",
          display: "flex",
          alignItems: "center",
          paddingLeft: 12,
          fontSize: 10,
          color: "#7a7e85",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        debug.log
      </div>

      <div style={{ padding: "12px 16px" }}>
        {lines.slice(0, visible).map((line, i) => (
          <div key={i} style={{ minHeight: "1.5em" }}>
            {parseLine(line)}
            {i === visible - 1 && !done && (
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 11,
                  background: "#6ea8fe",
                  marginLeft: 2,
                  verticalAlign: "text-bottom",
                  animation: "ide-blink 0.75s step-end infinite",
                }}
              />
            )}
          </div>
        ))}
        {done && <div style={{ color: "#6aab73", marginTop: 4 }}>✓ debug session complete</div>}
      </div>
    </div>
  );
}
