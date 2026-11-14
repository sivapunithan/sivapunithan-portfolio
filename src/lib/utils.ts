import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes without duplication conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Content values following the [ADD …] convention are placeholders.
 * Placeholder links must never render as broken actions.
 */
export function isPlaceholder(value: string): boolean {
  return /^\[ADD [^\]]+\]$/.test(value.trim());
}

/** Resolve the canonical site URL, falling back to a safe default until the domain is configured. */
export function getSiteUrl(domain: string): string {
  if (isPlaceholder(domain)) {
    return "https://portfolio.example.com";
  }
  return domain.startsWith("http") ? domain : `https://${domain}`;
}

export interface TextToken {
  text: string;
  accent: boolean;
}

/** Split "plain *accent phrase* plain" into words, flagging the ones inside the asterisks. */
export function tokenizeAccent(value: string): TextToken[] {
  return value.split("*").flatMap((segment, index) =>
    segment
      .split(/\s+/)
      .filter(Boolean)
      .map((text) => ({ text, accent: index % 2 === 1 })),
  );
}

/** The same string with the accent markers removed, for screen readers and metadata. */
export function stripAccent(value: string): string {
  return value.replace(/\*/g, "");
}

/** Two-digit index label: 1 → "01". */
export function padIndex(value: number): string {
  return String(value).padStart(2, "0");
}
