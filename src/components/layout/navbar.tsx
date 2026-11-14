"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { RollText } from "@/components/ui/button-link";
import { ArrowUpRight } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navigation, siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

/**
 * Fixed header. Transparent over the hero, frosted once the page moves; it tucks
 * away while reading down and returns on the first scroll back up. A brass hairline
 * along its top edge tracks reading progress.
 */
export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(latest > 24);
    setIsHidden(latest > previous && latest > 360);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: isHidden && !isMenuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 h-px origin-left bg-accent"
          style={{ scaleX: progress }}
        />
        <div
          className={cn(
            "border-b transition-[background-color,border-color,backdrop-filter] duration-500",
            isScrolled && !isMenuOpen
              ? "border-line bg-background/72 backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <div className="mx-auto flex h-[4.75rem] w-full max-w-content items-center justify-between px-5 sm:px-8 lg:px-12">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — home`}
              onClick={() => setIsMenuOpen(false)}
              className="group flex items-center gap-3.5 text-primary"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong font-display text-[0.95rem] italic transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
                {siteConfig.brandMark}
              </span>
              <span className="font-display text-[1.2rem] tracking-[-0.01em]">
                {siteConfig.shortName}
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-9">
                {navigation.map((item) => {
                  const isActive = isActivePath(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "roll-group relative block py-2 text-[0.9375rem] transition-colors duration-300",
                          isActive ? "text-primary" : "text-secondary hover:text-primary",
                        )}
                      >
                        <RollText>{item.label}</RollText>
                        {isActive && (
                          <motion.span
                            layoutId="nav-indicator"
                            className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                            transition={{ duration: 0.6, ease: EASE }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a
                href={siteConfig.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="roll-group hidden h-11 items-center gap-2.5 rounded-full border border-line-strong px-5 text-[0.9375rem] text-primary transition-colors duration-500 hover:border-accent md:inline-flex"
              >
                <RollText>Résumé</RollText>
                <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
              </a>
              <button
                type="button"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="flex h-11 items-center gap-3 rounded-full border border-line-strong px-5 text-[0.9375rem] text-primary md:hidden"
              >
                {isMenuOpen ? "Close" : "Menu"}
                <span aria-hidden="true" className="relative block h-2.5 w-4">
                  <span
                    className={cn(
                      "absolute inset-x-0 top-0 h-px bg-accent transition-transform duration-500 ease-expo",
                      isMenuOpen && "translate-y-[5px] rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-px bg-accent transition-transform duration-500 ease-expo",
                      isMenuOpen && "-translate-y-[4px] -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} pathname={pathname} />
    </>
  );
}
