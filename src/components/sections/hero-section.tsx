import { siteConfig, socialLinks } from "@/data/portfolio";
import { RestrictedJShell } from "@/components/hero/restricted-jshell";
import { FadeUp } from "@/components/motion/fade-up";
import { TextReveal } from "@/components/motion/text-reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { isPlaceholder } from "@/lib/utils";

const STATEMENT_LINES = ["01", "02", "03"];

/**
 * Editorial hero. One IDE signature detail only: a line-number gutter
 * with a thin editor rule beside the primary statement. No fake editor,
 * no terminal, no typing animation. Full reveal sequence ends < 1.5s.
 */
export function HeroSection() {
  const visibleSocials = socialLinks.filter((link) => !isPlaceholder(link.href));

  return (
    <section id="intro" className="relative flex min-h-[calc(100svh-5.25rem)] flex-col">
      <Container className="relative z-10 grid flex-1 items-center gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1.06fr)_minmax(320px,0.94fr)] lg:gap-10">
        <div className="flex flex-col justify-center">
          <FadeUp delay={0} y={8}>
            <Breadcrumb segments={["src", "portfolio", "Sivapunithan.java"]} />
            <p className="mt-5 font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
              {siteConfig.role}
            </p>
          </FadeUp>

          <h1 className="mt-6 font-display text-[2.75rem] leading-[1.04] font-bold tracking-tight text-primary sm:text-6xl md:text-7xl xl:text-8xl">
            <TextReveal delay={0.1}>Sivapunithan S.</TextReveal>
          </h1>

          {/* Primary statement with line-number gutter — the one IDE detail */}
          <FadeUp delay={0.35} className="mt-10 max-w-2xl">
            <div className="flex gap-5 border-l border-accent-lavender/40 pl-5 sm:gap-6 sm:pl-6">
              <div
                aria-hidden="true"
                className="hidden flex-col gap-2 pt-1 font-mono text-[10px] leading-relaxed text-accent-lavender/70 select-none sm:flex"
              >
                {STATEMENT_LINES.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
              <div className="space-y-5">
                <p className="text-lg leading-relaxed text-primary sm:text-xl md:text-2xl">
                  I build reliable systems where backend logic, data, and business workflows meet.
                </p>
                <p className="font-mono text-xs tracking-wide text-muted sm:text-sm">
                  <span className="text-accent-orange">Java</span> · Spring Boot · SQL · Next.js ·
                  TypeScript
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.55} className="mt-12">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <TextLink href="#work" mono arrow className="text-primary">
                View selected work
              </TextLink>
              <TextLink href={siteConfig.resumePath} mono arrow external>
                Download résumé
              </TextLink>
            </div>

            {visibleSocials.length > 0 && (
              <ul className="mt-8 flex flex-wrap items-center gap-6">
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
        </div>

        <RestrictedJShell />
      </Container>

      <Container className="relative z-10 pb-8">
        <p className="font-mono text-[10px] tracking-[0.28em] text-muted/70 uppercase">
          Scroll to explore
        </p>
      </Container>
    </section>
  );
}
