"use client";

import { useEffect, useState } from "react";

/** Copies a value to the clipboard and confirms it in place for a moment. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard access can be denied; the address stays selectable on the page.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex h-11 items-center gap-3 rounded-full border border-line-strong px-5 text-[0.9375rem] text-primary transition-colors duration-500 hover:border-accent"
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full transition-colors duration-300 ${copied ? "bg-accent" : "border border-accent"}`}
      />
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
