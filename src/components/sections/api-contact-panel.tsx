"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { TextLink } from "@/components/ui/text-link";

interface ApiContactPanelProps {
  emailHref: string | null;
  resumePath: string;
  linkedInHref?: string;
  gitHubHref?: string;
}

export function ApiContactPanel({
  emailHref,
  resumePath,
  linkedInHref,
  gitHubHref,
}: ApiContactPanelProps) {
  const [status, setStatus] = useState("READY");
  const shouldReduceMotion = useReducedMotion();

  function setAccepted() {
    setStatus("202 Accepted");
  }

  function setReady() {
    setStatus("READY");
  }

  return (
    <motion.div
      className="terminal-surface scanline-overlay neon-border max-w-3xl overflow-hidden"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex h-10 items-center justify-between border-b border-edge-subtle px-4">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent-lavender shadow-[0_0_10px_var(--accent-lavender)]" />
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
            contact.controller
          </p>
        </div>
        <span className="font-mono text-[10px] tracking-[0.16em] text-accent-lavender uppercase">
          {status}
        </span>
      </div>

      <div className="grid gap-8 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-6">
        <pre className="overflow-x-auto rounded-[0.9rem] border border-edge-subtle bg-background-deep/70 p-4 font-mono text-xs leading-relaxed text-secondary">
          <code>{`POST /api/contact
Content-Type: application/json

{
  "name": "Recruiter",
  "message": "Let's build something scalable"
}`}</code>
        </pre>

        <div className="flex flex-col justify-between gap-8">
          <p className="text-sm leading-relaxed text-secondary">
            Open to Java, Spring Boot, SQL, and backend-heavy full-stack opportunities.
          </p>

          <div className="space-y-5">
            {emailHref && (
              <a
                href={emailHref}
                onMouseEnter={setAccepted}
                onFocus={setAccepted}
                onMouseDown={setAccepted}
                onTouchStart={setAccepted}
                onMouseLeave={setReady}
                onBlur={setReady}
                onClick={setAccepted}
                className="inline-flex items-center gap-2 rounded-full border border-accent-lavender/55 bg-background-deep/30 px-4 py-2.5 font-mono text-xs tracking-[0.14em] text-primary uppercase transition duration-200 hover:-translate-y-px hover:bg-accent-lavender/10 hover:shadow-[0_0_24px_var(--accent-lavender)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-lavender/60"
              >
                Send Request
              </a>
            )}

            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {linkedInHref && (
                <li>
                  <TextLink href={linkedInHref} mono external>
                    LinkedIn
                  </TextLink>
                </li>
              )}
              {gitHubHref && (
                <li>
                  <TextLink href={gitHubHref} mono external>
                    GitHub
                  </TextLink>
                </li>
              )}
              <li>
                <TextLink href={resumePath} mono external>
                  Resume
                </TextLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
