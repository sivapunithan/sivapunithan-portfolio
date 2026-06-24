"use client";

import { useEffect, useState } from "react";

/**
 * Motion viewport reveals depend on IntersectionObserver. In browsers or
 * test surfaces that do not expose it, reveal hidden content immediately.
 */
export function useRevealFallback() {
  const [shouldReveal, setShouldReveal] = useState(false);

  useEffect(() => {
    if (typeof globalThis.IntersectionObserver !== "undefined") {
      return;
    }

    const fallbackTimer = globalThis.setTimeout(() => {
      setShouldReveal(true);
    }, 0);

    return () => globalThis.clearTimeout(fallbackTimer);
  }, []);

  return shouldReveal;
}
