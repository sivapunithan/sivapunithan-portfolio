"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn, stripAccent, tokenizeAccent } from "@/lib/utils";

interface ScrollWordsProps {
  /** Wrap a phrase in asterisks to render it in the accent style. */
  text: string;
  className?: string;
}

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}

function Word({ children, progress, range, accent }: WordProps) {
  const opacity = useTransform(progress, range, [0.16, 1]);

  return (
    <motion.span style={{ opacity }} className={cn(accent && "accent-phrase")}>
      {children}{" "}
    </motion.span>
  );
}

/** A statement that lights up word by word, tied directly to scroll position. */
export function ScrollWords({ text, className }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.5"] });
  const tokens = tokenizeAccent(text);

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{stripAccent(text)}</span>
      <span aria-hidden="true">
        {tokens.map((token, index) => (
          <Word
            key={`${token.text}-${index}`}
            progress={scrollYProgress}
            range={[index / tokens.length, (index + 1) / tokens.length]}
            accent={token.accent}
          >
            {token.text}
          </Word>
        ))}
      </span>
    </p>
  );
}
