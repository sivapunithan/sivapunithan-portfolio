import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { architectureContent } from "@/data/portfolio";

export function ArchitectureSpotlightSection() {
  const { section, flow } = architectureContent;

  return (
    <section id="architecture" className="scroll-mt-24 bg-canvas text-ink">
      <Container className="py-24 md:py-32">
        <SectionReveal className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
          <SectionLabel index={section.index} label={section.label} className="text-ink/60" />
          <div>
            <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl md:text-6xl">
              {section.heading}
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink/70">{section.body}</p>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-16">
          <ol className="grid border-y border-edge-dark lg:grid-cols-5">
            {flow.map((step, index) => (
              <li
                key={step.label}
                className="relative border-b border-edge-dark px-5 py-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent-orange">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-semibold text-ink">{step.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{step.detail}</p>
                {index < flow.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-3 left-5 z-10 flex h-6 w-6 items-center justify-center bg-canvas font-mono text-accent-orange lg:-right-3 lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2"
                  >
                    <span className="lg:hidden">↓</span>
                    <span className="hidden lg:inline">→</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </SectionReveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-orange">
              {architectureContent.concernLabel}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">{architectureContent.concern}</p>
          </SectionReveal>
          <SectionReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">
              {architectureContent.principlesLabel}
            </p>
            <ul className="mt-4 border-t border-edge-dark">
              {architectureContent.principles.map((principle) => (
                <li key={principle} className="border-b border-edge-dark py-3 text-sm text-ink/70">
                  {principle}
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
