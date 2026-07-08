"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { experience } from "@/data/portfolio";
import type { ExperienceModule } from "@/types/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { CodeCommentLabel } from "@/components/ui/code-comment-label";
import { SectionLabel } from "@/components/ui/section-label";
import { tokenizeJavaLine } from "@/lib/java-tokenizer";
import { cn } from "@/lib/utils";

function ModuleCard({ module, index }: { module: ExperienceModule; index: number }) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const hasCode = Boolean(module.codeSnippet?.length);

  return (
    <SectionReveal delay={index * 0.06}>
      <div
        className={cn(
          "overflow-hidden rounded-[0.6rem] border border-edge-subtle bg-surface/20 transition-all duration-200",
          "hover:border-edge hover:bg-surface/35 hover:-translate-y-px",
          open && "border-accent-lavender/35",
        )}
      >
        <button
          type="button"
          onClick={() => hasCode && setOpen((o) => !o)}
          aria-expanded={hasCode ? open : undefined}
          className={cn(
            "flex w-full items-start justify-between gap-4 px-4 py-3.5 text-left",
            hasCode && "cursor-pointer",
          )}
        >
          <div className="min-w-0">
            <h4 className="font-mono text-[12px] font-semibold tracking-[0.04em] text-primary uppercase">
              {module.title}
            </h4>
            <p className="mt-1.5 text-[13px] leading-relaxed text-secondary/85">
              {module.description}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1">
              {module.stack.map((s) => (
                <span key={s} className="font-mono text-[9px] tracking-[0.06em] text-muted/60">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {hasCode && (
            <span
              aria-hidden="true"
              className={cn(
                "mt-1 shrink-0 font-mono text-[10px] text-muted/50 transition-transform duration-200",
                open && "rotate-180",
              )}
            >
              ▾
            </span>
          )}
        </button>

        <AnimatePresence initial={false}>
          {open && hasCode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
              className="overflow-hidden border-t border-edge-subtle"
            >
              <div
                className="code-scroll overflow-auto bg-background-deep px-4 py-3"
                style={{ maxHeight: 220 }}
              >
                <p className="mb-2 font-mono text-[9px] tracking-[0.1em] text-muted/50 uppercase">
                  {module.codeFile}
                </p>
                <pre className="font-mono text-[11px] leading-[1.7]">
                  {module.codeSnippet!.map((line, li) => (
                    <div key={li}>
                      {line === "" ? (
                        <>&nbsp;</>
                      ) : (
                        tokenizeJavaLine(line).map((t, ti) => (
                          <span key={ti} className={t.cls}>
                            {t.text}
                          </span>
                        ))
                      )}
                    </div>
                  ))}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionReveal>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24">
      <Container className="py-20 md:py-28">
        <SectionReveal className="mb-12 space-y-5 md:mb-16">
          <SectionLabel index="05" label="EXPERIENCE" />
          <CodeCommentLabel>{"// experience loaded"}</CodeCommentLabel>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Experience
          </h2>
        </SectionReveal>

        {experience.map((entry) => (
          <div
            key={`${entry.company}-${entry.startDate}`}
            className="grid gap-10 lg:grid-cols-12 lg:gap-8"
          >
            {/* ── Timeline ── */}
            <SectionReveal className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full bg-accent-lavender shadow-[0_0_8px_var(--accent-lavender)]"
                  />
                  <span className="font-mono text-[11px] text-secondary">{entry.startDate}</span>
                </div>
                <div className="ml-[4.5px] border-l border-edge pl-[1.4rem] py-2.5">
                  <p className="font-mono text-[10px] text-muted">Joined {entry.company}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full bg-accent-green shadow-[0_0_8px_var(--accent-green)]"
                  />
                  <span className="font-mono text-[11px] text-secondary">{entry.endDate}</span>
                </div>

                <div className="mt-6 space-y-1 border-t border-edge-subtle pt-5">
                  <p className="font-mono text-[11px] tracking-[0.1em] text-primary uppercase">
                    {entry.company}
                  </p>
                  <p className="text-sm text-secondary">{entry.role}</p>
                  <p className="font-mono text-[10px] text-muted">
                    {entry.startDate} – {entry.endDate}
                  </p>
                  <p className="font-mono text-[10px] text-muted">{entry.location}</p>
                </div>
              </div>
            </SectionReveal>

            {/* ── Content ── */}
            <div className="lg:col-span-9">
              <SectionReveal>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-primary md:text-3xl">
                  {entry.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary md:text-base">
                  {entry.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {entry.techTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[0.3rem] border border-edge-subtle bg-surface/40 px-2 py-1 font-mono text-[10px] tracking-[0.04em] text-secondary/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </SectionReveal>

              <div className="mt-8 space-y-3">
                {entry.modules.map((module, i) => (
                  <ModuleCard key={module.title} module={module} index={i} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
