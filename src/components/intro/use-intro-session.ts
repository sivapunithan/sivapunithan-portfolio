"use client";

import { useCallback, useEffect, useState } from "react";

const SESSION_KEY = "sivapunithan-portfolio-intro-seen";

export function useIntroSession() {
  const [shouldShow, setShouldShow] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkSession = window.setTimeout(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      try {
        const hasSeenIntro = sessionStorage.getItem(SESSION_KEY) === "true";
        setShouldShow(!reducedMotion && !hasSeenIntro);
      } catch {
        setShouldShow(false);
      }

      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(checkSession);
  }, []);

  const complete = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Storage can be unavailable in privacy modes; closing must still work.
    }
    setShouldShow(false);
  }, []);

  return { isReady, shouldShow, complete };
}
