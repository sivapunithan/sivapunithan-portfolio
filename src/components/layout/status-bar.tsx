"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActiveSection } from "@/components/layout/active-section-provider";

const SECTION_FILE: Record<string, string> = {
  intro: "SivapunithanS.java",
  about: "About.java",
  work: "Projects.java",
  stack: "Stack.java",
  code: "ProcurementController.java",
  experience: "Experience.java",
  education: "Education.java",
  focus: "CurrentFocus.java",
  contact: "Contact.java",
};

/**
 * IntelliJ-style bottom status bar.
 * Left: branch · active file.
 * Right: build status · errors · warnings · Java 17 · encoding.
 */
export function StatusBar() {
  const activeSection = useActiveSection();
  const file = SECTION_FILE[activeSection ?? "intro"] ?? "SivapunithanS.java";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-7 items-center justify-between border-t border-accent-lavender/35 bg-background-deep px-4 lg:pl-16">
      {/* Left — branch + file */}
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
          <span className="text-accent-green" aria-hidden="true">
            ⎇
          </span>
          master
        </span>
        <span aria-hidden="true" className="font-mono text-[10px] text-muted/40">
          ·
        </span>
        <span className="hidden font-mono text-[10px] text-muted sm:inline">
          src / portfolio /{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={file}
              className="text-accent-lavender"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {file}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      {/* Right — build status + diagnostics + encoding */}
      <div className="flex items-center gap-3">
        {/* Build result */}
        <span className="hidden items-center gap-1.5 font-mono text-[10px] text-accent-green lg:flex">
          <span aria-hidden="true">✓</span>
          BUILD SUCCESS
        </span>

        <span aria-hidden="true" className="hidden font-mono text-[10px] text-muted/40 lg:inline">
          ·
        </span>

        <span className="hidden font-mono text-[10px] text-muted md:inline">Spring Boot 3.5</span>
        <span aria-hidden="true" className="hidden font-mono text-[10px] text-muted/40 md:inline">
          ·
        </span>
        <span className="hidden font-mono text-[10px] text-muted md:inline">Java 21</span>
        <span aria-hidden="true" className="font-mono text-[10px] text-muted/40">
          ·
        </span>
        <span className="font-mono text-[10px] text-muted">UTF-8</span>
        <span aria-hidden="true" className="font-mono text-[10px] text-muted/40">
          ·
        </span>
        <span className="font-mono text-[10px] text-muted">LF</span>
      </div>
    </div>
  );
}
