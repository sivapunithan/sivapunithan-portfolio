"use client";

import { gutterSections } from "@/data/portfolio";
import { useActiveSection } from "@/components/layout/active-section-provider";
import { cn } from "@/lib/utils";

/**
 * Desktop-only vertical gutter: section indexes running down the left edge,
 * like an editor's line-number strip. Hidden below lg. Text only — no icons.
 */
export function WorkspaceGutter() {
  const activeSection = useActiveSection();

  return (
    <nav
      aria-label="Section index"
      className="fixed top-[5.75rem] bottom-7 left-0 z-40 hidden w-16 flex-col items-center border-r border-edge-subtle lg:flex"
    >
      {/* Panel header — mirrors IntelliJ project-panel title strip */}
      <div className="flex h-9 w-full shrink-0 items-center justify-center border-b border-edge-subtle">
        <span
          aria-hidden="true"
          className="font-mono text-[9px] tracking-[0.18em] text-muted/50 uppercase select-none"
        >
          FILES
        </span>
      </div>

      <ul className="flex h-full flex-col items-center justify-center gap-10">
        {gutterSections.map((section, index) => {
          const id = section.href.replace("#", "");
          const isActive = activeSection === id;

          return (
            <li key={section.href}>
              <a
                href={section.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "block font-mono text-[10px] tracking-[0.22em] uppercase transition-colors duration-200 [writing-mode:vertical-rl]",
                  isActive ? "text-primary" : "text-muted hover:text-secondary",
                )}
              >
                <span className={cn(isActive && "text-accent-blue")}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 inline-block">{section.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
