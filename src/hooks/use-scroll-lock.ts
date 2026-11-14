"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

/** Freeze page scroll (native and Lenis) while an overlay such as the preloader or menu is open. */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;

    document.documentElement.classList.add("scroll-locked");
    lenis?.stop();

    return () => {
      document.documentElement.classList.remove("scroll-locked");
      lenis?.start();
    };
  }, [locked, lenis]);
}
