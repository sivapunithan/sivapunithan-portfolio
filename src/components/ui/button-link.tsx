import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Label that rolls up and is replaced by a copy from below when its `.roll-group` is hovered. */
export function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span className="roll-a">{children}</span>
      <span aria-hidden="true" className="roll-b">
        {children}
      </span>
    </span>
  );
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  /** Opens in a new tab and uses a plain anchor (files, other sites, mailto). */
  external?: boolean;
  className?: string;
}

/** Pill button with a rolling label and an arrow that exits and re-enters on hover. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: ButtonLinkProps) {
  const Arrow = external ? ArrowUpRight : ArrowRight;

  const classes = cn(
    "roll-group group/btn inline-flex h-[3.25rem] items-center gap-4 rounded-full pl-7 pr-2 text-[0.9375rem] font-medium transition-colors duration-500",
    variant === "primary"
      ? "bg-accent text-on-accent hover:bg-accent-bright"
      : "border border-line-strong text-primary hover:border-accent",
    className,
  );

  const content = (
    <>
      <RollText>{children}</RollText>
      <span
        aria-hidden="true"
        className={cn(
          "relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full",
          variant === "primary" ? "bg-on-accent text-accent" : "bg-surface-raised text-accent",
        )}
      >
        <Arrow className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover/btn:translate-x-[230%] group-focus-visible/btn:translate-x-[230%]" />
        <Arrow className="absolute h-3.5 w-3.5 -translate-x-[230%] transition-transform duration-500 ease-expo group-hover/btn:translate-x-0 group-focus-visible/btn:translate-x-0" />
      </span>
    </>
  );

  return (
    <Magnetic className="inline-block">
      {external ? (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        >
          {content}
        </a>
      ) : (
        <Link href={href} className={classes}>
          {content}
        </Link>
      )}
    </Magnetic>
  );
}

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

/** Inline text link with a drawn underline and a nudging arrow. */
export function ArrowLink({ href, children, external = false, className }: ArrowLinkProps) {
  const classes = cn(
    "group inline-flex items-center gap-2.5 text-[0.9375rem] font-medium text-primary transition-colors duration-300 hover:text-accent-bright",
    className,
  );

  const content = (
    <>
      <span className="link-underline pb-0.5">{children}</span>
      {external ? (
        <ArrowUpRight className="h-3.5 w-3.5 text-accent transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : (
        <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform duration-500 ease-expo group-hover:translate-x-1.5" />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
