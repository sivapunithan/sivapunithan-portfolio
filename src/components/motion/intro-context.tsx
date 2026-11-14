"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export const INTRO_STORAGE_KEY = "sp-intro";

interface IntroState {
  /** True once the page is uncovered and entrance animations may start. */
  done: boolean;
  /** True when this visit skips the preloader (already seen, or reduced motion). */
  seen: boolean;
  finish: () => void;
}

const IntroContext = createContext<IntroState>({ done: true, seen: true, finish: () => {} });

const subscribe = () => () => {};
const readSeen = () => document.documentElement.dataset.intro === "seen";
const readSeenOnServer = () => false;

/**
 * Shares "has the preloader cleared?" with every entrance animation, so the hero
 * starts moving as the curtain lifts rather than underneath it.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const seen = useSyncExternalStore(subscribe, readSeen, readSeenOnServer);
  const [finished, setFinished] = useState(false);
  const finish = useCallback(() => setFinished(true), []);

  const value = useMemo(
    () => ({ done: seen || finished, seen, finish }),
    [seen, finished, finish],
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro(): IntroState {
  return useContext(IntroContext);
}
