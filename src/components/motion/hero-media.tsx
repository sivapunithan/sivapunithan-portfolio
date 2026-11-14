"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useIntro } from "@/components/motion/intro-context";

interface HeroMediaProps {
  src: string;
  alt: string;
  position: string;
  sizes: string;
  caption?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { stiffness: 50, damping: 18, mass: 0.8 };

/**
 * The page-opening illustration. Three layers of movement, kept deliberately small:
 * it settles in from a slight zoom as the page is uncovered, drifts slower than the
 * page on scroll, and leans a few pixels against the pointer for depth.
 */
export function HeroMedia({ src, alt, position, sizes, caption }: HeroMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { done } = useIntro();
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "12%"]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.03]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(pointerX, SPRING);
  const driftY = useSpring(pointerY, SPRING);

  useEffect(() => {
    if (reduceMotion) return;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX.set((event.clientX / window.innerWidth - 0.5) * -12);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * -8);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: scrollY, scale: scrollScale }}>
        <motion.div className="absolute -inset-[1.5%]" style={{ x: driftX, y: driftY }}>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.06 }}
            animate={{ scale: done ? 1 : 1.06 }}
            transition={{ duration: 2, ease: EASE }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority
              quality={90}
              sizes={sizes}
              className="art-print object-cover"
              style={{ objectPosition: position }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      {caption && (
        <p
          aria-hidden="true"
          className="plate-caption label absolute bottom-24 right-5 z-10 hidden text-primary/70 lg:block"
        >
          {caption}
        </p>
      )}
    </div>
  );
}
