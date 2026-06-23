"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const ActiveSectionContext = createContext<string | null>(null);

/** Current section id (without "#") or null before the first section is reached. */
export function useActiveSection(): string | null {
  return useContext(ActiveSectionContext);
}

interface ActiveSectionProviderProps {
  sectionIds: string[];
  children: ReactNode;
}

/**
 * Single shared IntersectionObserver for the whole workspace chrome
 * (navbar tabs + desktop gutter), so each consumer does not create its own.
 * A section becomes active when it crosses a narrow band in the upper
 * third of the viewport.
 */
export function ActiveSectionProvider({ sectionIds, children }: ActiveSectionProviderProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <ActiveSectionContext.Provider value={activeSection}>{children}</ActiveSectionContext.Provider>
  );
}
