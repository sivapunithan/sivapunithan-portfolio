"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navigation, siteConfig, socialLinks } from "@/data/portfolio";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { cn, padIndex } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

const EASE = [0.76, 0, 0.24, 1] as const;
const OUT = [0.16, 1, 0.3, 1] as const;

/** Full-screen menu for small screens: the panel wipes down, then the links rise in order. */
export function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          data-lenis-prevent
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background-deep px-5 pb-8 pt-28 sm:px-8 md:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <nav aria-label="Primary">
            <ul>
              {navigation.map((item, index) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href} className="overflow-hidden border-b border-line">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.8, delay: 0.18 + index * 0.06, ease: OUT }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        className="flex items-baseline gap-5 py-5"
                      >
                        <span className="label text-muted">{padIndex(index + 1)}</span>
                        <span
                          className={cn(
                            "font-display text-[2.75rem] font-light leading-none tracking-[-0.03em]",
                            isActive ? "accent-phrase" : "text-primary",
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            className="mt-auto pt-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: OUT }}
          >
            <div className="flex items-center gap-4">
            <a
              href={siteConfig.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex h-12 items-center gap-3 rounded-full bg-accent px-6 text-[0.9375rem] font-medium text-on-accent"
            >
              Résumé
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <ThemeToggle />
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-[0.9375rem] text-secondary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
