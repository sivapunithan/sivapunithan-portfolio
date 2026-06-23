import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Render with the technical mono face (uppercase metadata links). */
  mono?: boolean;
  /** Append a subtle arrow that nudges on hover. */
  arrow?: boolean;
  /** Open in a new tab (external profiles, résumé). */
  external?: boolean;
}

/**
 * The only link style of the site: plain text, animated underline,
 * optional arrow. No pills, no buttons, no glow.
 */
export function TextLink({
  href,
  children,
  className,
  mono = false,
  arrow = false,
  external = false,
}: TextLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex items-baseline gap-1.5 text-secondary transition-colors duration-200 hover:text-primary focus-visible:text-primary",
        mono && "font-mono text-xs tracking-[0.14em] uppercase",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      {arrow && (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 motion-reduce:transition-none group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </a>
  );
}
