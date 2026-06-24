"use client";

import { useState } from "react";
import { navigation, siteConfig } from "@/data/portfolio";
import { useActiveSection } from "@/components/layout/active-section-provider";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { cn } from "@/lib/utils";

/**
 * Tab-inspired navigation row beneath the workspace bar. Desktop shows
 * text links with an active-tab underline; mobile collapses into a
 * minimal menu trigger.
 */
export function Navbar() {
  const activeSection = useActiveSection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <nav
        aria-label="Primary"
        className="flex h-11 items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Desktop links — IDE tab strip */}
        <ul className="hidden h-full items-stretch md:flex">
          {navigation.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");

            return (
              <li
                key={item.href}
                className={cn(
                  "flex items-stretch border-x border-transparent transition-colors duration-200",
                  isActive && "border-edge/60 bg-surface-raised/95 active-tab-glow",
                )}
              >
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative flex items-center px-4 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-lavender/50",
                    isActive ? "text-primary" : "text-secondary hover:text-primary",
                  )}
                >
                  {isActive && (
                    <>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-0.5 bg-accent-lavender shadow-[0_0_18px_var(--accent-lavender)]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-px bg-accent-lavender/35"
                      />
                    </>
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile current-location label */}
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase md:hidden">
          {siteConfig.workspaceBreadcrumb[0]}
        </p>

        <div className="flex items-center gap-6">
          <a
            href={siteConfig.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hidden font-mono text-[11px] tracking-[0.16em] text-secondary uppercase transition-colors duration-200 hover:text-primary md:inline"
          >
            Résumé
          </a>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase md:hidden"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
