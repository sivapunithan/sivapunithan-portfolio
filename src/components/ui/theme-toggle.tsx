"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

export const THEME_STORAGE_KEY = "sp-theme";

type Theme = "dark" | "light";

const subscribe = (notify: () => void) => {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};

const readTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const readThemeOnServer = (): Theme => "light";

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" className="h-4 w-4">
      <circle cx="10" cy="10" r="3.3" />
      <path d="M10 2.4v1.9M10 15.7v1.9M2.4 10h1.9M15.7 10h1.9M4.6 4.6l1.35 1.35M14.05 14.05l1.35 1.35M4.6 15.4l1.35-1.35M14.05 5.95l1.35-1.35" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
      <path d="M16.2 11.6A6.6 6.6 0 0 1 8.4 3.8a6.6 6.6 0 1 0 7.8 7.8Z" />
    </svg>
  );
}

/** Two-position switch: a brass thumb slides between the sun (light) and the moon (dark). */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, readThemeOnServer);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const handleClick = () => {
    const root = document.documentElement;
    root.classList.add("theme-fade");
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable in privacy modes; the choice just won't persist.
    }
    window.setTimeout(() => root.classList.remove("theme-fade"), 700);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Dark theme"
      title={`Switch to ${next} theme`}
      onClick={handleClick}
      className={cn(
        "relative flex h-10 w-[4.5rem] shrink-0 items-center rounded-full border border-line-strong bg-surface-raised/70 p-1 transition-colors duration-500 hover:border-accent",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-1 right-1 flex items-center justify-between px-2 text-muted"
      >
        <SunIcon />
        <MoonIcon />
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_3px_8px_-2px_rgba(0,0,0,0.4)] transition-transform duration-700 ease-expo",
          theme === "dark" ? "translate-x-8" : "translate-x-0",
        )}
      >
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}
