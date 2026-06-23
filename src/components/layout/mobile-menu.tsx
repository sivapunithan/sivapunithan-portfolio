"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { navigation, siteConfig } from "@/data/portfolio";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Minimal full-width mobile panel beneath the header. Closes on Escape
 * and after navigation; first link receives focus when opened.
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    firstLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute inset-x-0 top-full border-b border-edge bg-background-deep md:hidden"
        >
          <ul className="px-5 py-4">
            {navigation.map((item, index) => (
              <li key={item.href} className="border-b border-edge-subtle last:border-b-0">
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-baseline gap-3 py-3.5 text-base text-primary"
                >
                  <span aria-hidden="true" className="font-mono text-[10px] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-baseline gap-3 py-3.5 font-mono text-xs tracking-[0.16em] text-secondary uppercase"
              >
                <span aria-hidden="true" className="font-mono text-[10px] text-muted">
                  ↓
                </span>
                Résumé
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
