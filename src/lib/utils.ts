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
