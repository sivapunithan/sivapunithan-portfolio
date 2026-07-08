"use client";

import { gutterSections } from "@/data/portfolio";
import { useActiveSection } from "@/components/layout/active-section-provider";
import { cn } from "@/lib/utils";

export function WorkspaceGutter() {
  const activeSection = useActiveSection();

  return (
    <nav
      aria-label="Section index"
      className="fixed inset-y-0 bottom-7 left-0 z-40 hidden w-16 flex-col bg-background border-r border-edge lg:flex"
    >
      {/*
        Spacer equal to header height (WorkspaceBar h-9 + Navbar h-11 = 80px = 5rem).
        The sticky header sits on top at z-50, covering this area visually.
        border-b here creates a horizontal rule at the workspace-bar seam.
      */}
      <div className="h-[5rem] shrink-0 border-b border-edge-subtle" />

      {/* Section items — horizontal index + 4-char label, no vertical text */}
      <ul className="flex flex-1 flex-col items-stretch overflow-y-auto py-1.5">
        {gutterSections.map((section, index) => {
          const id = section.href.replace("#", "");
          const isActive = activeSection === id;

          return (
            <li key={section.href}>
              <a
                href={section.href}
                aria-current={isActive ? "true" : undefined}
                title={section.label}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1 px-1 py-2.5 text-center transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent-lavender/50",
                  isActive
                    ? "bg-accent-lavender/[0.07] text-primary"
                    : "text-muted hover:bg-surface-hover/40 hover:text-secondary",
                )}
              >
                {/* Left accent line — mirrors top-nav active tab indicator */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-[2px] rounded-r-full bg-accent-lavender shadow-[1px_0_6px_var(--accent-lavender)]"
                  />
                )}

                {/* Index number */}
                <span
                  className={cn(
                    "font-mono text-[9px] leading-none tabular-nums",
                    isActive ? "text-accent-lavender" : "text-muted/50",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* 4-char label — fits 64px width without vertical text */}
                <span
                  className={cn(
                    "font-mono text-[6.5px] leading-none tracking-[0.08em] uppercase",
                    isActive ? "text-primary" : "text-muted/40",
                  )}
                >
                  {section.label.slice(0, 4)}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
