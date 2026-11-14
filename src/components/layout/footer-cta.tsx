"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Container } from "@/components/ui/container";
import { ArrowRight, ArrowUp } from "@/components/ui/icons";
import { contactConfig } from "@/data/portfolio";
import { stripAccent } from "@/lib/utils";

/** Closing invitation shown above the footer on every page except Contact itself. */
export function FooterCta({ decoration }: { decoration: ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/contact")) return null;

  return (
    <div className="relative overflow-hidden border-b border-line">
      {decoration}
      <Container className="relative py-24 md:py-40">
        <Reveal>
          <p className="max-w-md text-lg leading-relaxed text-secondary">
            {contactConfig.footerPrompt}
          </p>
        </Reveal>
        <Link
          href="/contact"
          aria-label={`${stripAccent(contactConfig.footerAction)} — go to the contact page`}
          className="group mt-8 flex w-fit items-end gap-5 md:gap-10"
        >
          <SplitText
            as="p"
            text={contactConfig.footerAction}
            stagger={0.09}
            className="display-giant text-primary"
          />
          <span
            aria-hidden="true"
            className="mb-[0.1em] flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent transition-all duration-700 ease-expo group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent md:h-24 md:w-24"
          >
            <ArrowRight className="h-5 w-5 md:h-8 md:w-8" />
          </span>
        </Link>
      </Container>
    </div>
  );
}

/** Glides back to the top of the page with the same inertia as the rest of the scroll. */
export function BackToTop() {
  const lenis = useLenis();

  const handleClick = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0 });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group inline-flex items-center gap-3 text-[0.9375rem] text-secondary transition-colors duration-300 hover:text-primary"
    >
      Back to top
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-accent transition-transform duration-500 ease-expo group-hover:-translate-y-1">
        <ArrowUp className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}
