"use client";

import { motion, type Variants } from "motion/react";
import { createElement, Fragment } from "react";
import { useIntro } from "@/components/motion/intro-context";
import { cn, stripAccent, tokenizeAccent } from "@/lib/utils";

interface SplitTextProps {
  /** Copy to animate; wrap a phrase in asterisks to render it in the accent style. */
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
  delay?: number;
  stagger?: number;
  /** "view" plays when scrolled into view; "intro" plays once the preloader/curtain clears. */
  trigger?: "view" | "intro";
}

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: ({ delay, stagger }: { delay: number; stagger: number }) => ({
    transition: { delayChildren: delay, staggerChildren: stagger },
  }),
};

const word: Variants = {
  hidden: { y: "118%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE } },
};

/**
 * Headline reveal: each word rises out of its own clipped line box, staggered.
 * Screen readers get the plain sentence once; the animated copy is hidden from them.
 */
export function SplitText({
  text,
  as = "h2",
  className,
  id,
  delay = 0,
  stagger = 0.04,
  trigger = "view",
}: SplitTextProps) {
  const { done } = useIntro();
  const tokens = tokenizeAccent(text);

  const playback =
    trigger === "view"
      ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } }
      : { animate: done ? "show" : "hidden" };

  return createElement(
    as,
    { className, id },
    <>
      <span className="sr-only">{stripAccent(text)}</span>
      <motion.span
        aria-hidden="true"
        className="block"
        variants={container}
        custom={{ delay, stagger }}
        initial="hidden"
        {...playback}
      >
        {tokens.map((token, index) => (
          <Fragment key={`${token.text}-${index}`}>
            <span className="split-word">
              <motion.span
                className={cn("inline-block will-change-transform", token.accent && "accent-phrase")}
                variants={word}
              >
                {token.text}
              </motion.span>
            </span>
            {index < tokens.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </>,
  );
}
