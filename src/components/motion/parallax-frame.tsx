"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxFrameProps {
  src: string;
  alt: string;
  position: string;
  sizes: string;
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** A framed illustration that opens like an aperture, then drifts inside its frame on scroll. */
export function ParallaxFrame({ src, alt, position, sizes, className }: ParallaxFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-5%", "5%"]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden rounded-[1.75rem]", className)}
      initial={{ clipPath: "inset(14% 10% 14% 10% round 28px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      <motion.div className="absolute -inset-y-[6%] inset-x-0" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          quality={90}
          sizes={sizes}
          className="art-print object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-line-strong"
      />
    </motion.div>
  );
}
