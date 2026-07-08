import { siteConfig, socialLinks } from "@/data/portfolio";
import { SpConsole } from "@/components/hero/sp-console";
import { FadeUp } from "@/components/motion/fade-up";
import { TextReveal } from "@/components/motion/text-reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { cn, isPlaceholder } from "@/lib/utils";

const STATEMENT_LINES = ["01", "02", "03"];

const SPECIALTY_CARDS = [
  {
    label: "Backend Systems",
    detail: "Spring Boot · SQL · transactions",
    dot: "bg-accent-orange shadow-[0_0_5px_var(--accent-orange)]",
  },
  {
    label: "REST APIs",
    detail: "Clean endpoints · integrations",
    dot: "bg-accent-blue shadow-[0_0_5px_var(--accent-blue)]",
  },
  {
    label: "Workflow Apps",
    detail: "Approvals · validations · status flow",
    dot: "bg-accent-green shadow-[0_0_5px_var(--accent-green)]",
  },
] as const;

const ARCH_FLOW = [
  { label: "Next.js Client", accent: false },
  { label: "REST API", accent: true },
  { label: "Service Layer", accent: true },
  { label: "SQL Database", accent: false },
] as const;

export function HeroSection() {
  const visibleSocials = socialLinks.filter((link) => !isPlaceholder(link.href));

  return (
    <section id="intro" className="relative flex min-h-[calc(100svh-5.25rem)] flex-col">
      {/*
        Grid: left column fills remaining space, right column capped at 420px.
        Items align to start on lg so a tall left column does not push JShell off-screen;
        on xl there is usually enough room to center both columns.
        Bottom padding (pb-16) ensures content clears the fixed status bar (h-7 = 28px).
      */}
      <Container className="relative z-10 grid flex-1 grid-cols-1 items-start gap-8 py-10 pb-16 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-center lg:gap-10 lg:py-12 xl:items-center">

        {/* ── Left column ── */}
        <div className="flex flex-col justify-start">
          <FadeUp delay={0} y={8}>
            <Breadcrumb segments={["src", "portfolio", "Sivapunithan.java"]} />
            <p className="mt-4 font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
              {siteConfig.role}
            </p>
          </FadeUp>

          <h1 className="mt-4 font-display text-[2.4rem] font-bold leading-[1.04] tracking-tight text-primary sm:text-5xl md:text-6xl xl:text-7xl">
            <TextReveal delay={0.1}>Sivapunithan S.</TextReveal>
          </h1>

          {/* Statement with line-number gutter */}
          <FadeUp delay={0.32} className="mt-6 max-w-xl">
            <div className="flex gap-5 border-l border-accent-lavender/40 pl-5 sm:gap-6 sm:pl-6">
              <div
                aria-hidden="true"
                className="hidden flex-col gap-2 pt-1 select-none font-mono text-[10px] leading-relaxed text-accent-lavender/70 sm:flex"
              >
                {STATEMENT_LINES.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-base leading-relaxed text-primary sm:text-lg md:text-xl">
                  I build reliable systems where backend logic, data, and business workflows meet.
                </p>
                <p className="font-mono text-xs tracking-wide text-muted">
                  <span className="text-accent-orange">Java</span> · Spring Boot · SQL · Next.js ·
                  TypeScript
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Specialty cards */}
          <FadeUp delay={0.5} className="mt-5">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {SPECIALTY_CARDS.map((card) => (
                <div
                  key={card.label}
                  className="rounded-[0.5rem] border border-edge-subtle bg-surface/30 px-3 py-2.5 transition-colors duration-200 hover:border-edge hover:bg-surface/50"
                >
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={cn("h-1.5 w-1.5 shrink-0 rounded-full", card.dot)}
                    />
                    <span className="font-mono text-[11px] font-medium text-primary">
                      {card.label}
                    </span>
                  </div>
                  <p className="mt-1 pl-[18px] font-mono text-[10px] leading-relaxed text-muted/65">
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* CTAs + socials */}
          <FadeUp delay={0.65} className="mt-6">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <TextLink href="#work" mono arrow className="text-primary">
                View selected work
              </TextLink>
              <TextLink href={siteConfig.resumePath} mono arrow external>
                Download résumé
              </TextLink>
            </div>

            {visibleSocials.length > 0 && (
              <ul className="mt-5 flex flex-wrap items-center gap-5">
                {visibleSocials.map((link) => (
                  <li key={link.label}>
                    <TextLink
                      href={link.href}
                      external={!link.href.startsWith("mailto:")}
                      className="text-sm text-muted hover:text-secondary"
                    >
                      {link.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            )}
          </FadeUp>

          {/* Architecture flow + scroll hint */}
          <FadeUp delay={0.82} className="mt-6">
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              {ARCH_FLOW.map((step, i) => (
                <span key={step.label} className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "font-mono text-[10px]",
                      step.accent ? "text-accent-orange/65" : "text-muted/45",
                    )}
                  >
                    {step.label}
                  </span>
                  {i < ARCH_FLOW.length - 1 && (
                    <span aria-hidden="true" className="font-mono text-[10px] text-muted/28">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
            <p className="mt-4 font-mono text-[10px] tracking-[0.28em] text-muted/40 uppercase">
              Scroll to explore
            </p>
          </FadeUp>
        </div>

        {/* ── Right column — JShell ── */}
        <div className="relative w-full lg:self-start xl:self-auto">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-accent-lavender/[0.03] blur-3xl"
          />
          <SpConsole />
        </div>
      </Container>
    </section>
  );
}
