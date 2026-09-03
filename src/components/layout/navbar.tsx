"use client";

import { useState } from "react";
import { useActiveSection } from "@/components/layout/active-section-provider";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { navigation, siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Navbar() {
  const activeSection = useActiveSection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative mx-auto flex h-[4.25rem] w-full max-w-content items-center justify-between px-5 sm:px-8 lg:px-12">
      <a
        href="#hero"
        aria-label={`${siteConfig.name} home`}
        className="flex min-h-11 items-center gap-3 text-primary"
      >
        <span className="flex h-8 w-8 items-center justify-center border border-edge font-mono text-[10px] font-bold tracking-[0.08em]">
          {siteConfig.brandMark}
        </span>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:block">
          {siteConfig.role}
        </span>
      </a>

      <nav aria-label="Primary" className="hidden h-full items-center lg:flex">
        <ul className="flex h-full items-center">
          {navigation.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <li key={item.href} className="h-full">
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative flex h-full min-w-11 items-center px-3 text-sm text-secondary transition-colors hover:text-primary",
                    isActive && "text-primary",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-3 bottom-0 h-0.5 bg-accent-blue" aria-hidden="true" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href={siteConfig.resumePath}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 flex min-h-11 items-center border border-edge px-4 font-mono text-[10px] uppercase tracking-[0.16em] text-primary transition-colors hover:border-accent-orange hover:text-accent-orange"
        >
          Résumé
        </a>
      </nav>

      <button
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsMenuOpen((open) => !open)}
        className="min-h-11 min-w-11 font-mono text-[10px] uppercase tracking-[0.18em] text-primary lg:hidden"
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
