import { experience } from "@/data/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { SectionLabel } from "@/components/ui/section-label";

/** 04 / EXPERIENCE — editorial timeline with thin dividers, no fabricated claims. */
export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24">
      <Container className="py-20 md:py-28">
        <SectionReveal className="mb-12 space-y-5 md:mb-16">
          <SectionLabel index="04" label="EXPERIENCE" />
          <h2 className="font-display text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Experience
          </h2>
        </SectionReveal>

        {experience.map((entry) => (
          <SectionReveal key={`${entry.role}-${entry.period}`}>
            <Divider />
            <div className="grid gap-8 py-10 lg:grid-cols-12 lg:gap-8 md:py-14">
              <div className="space-y-3 lg:col-span-3">
                <p className="font-mono text-xs tracking-[0.14em] text-muted">{entry.period}</p>
                {/* Placeholder company names stay visible so they are replaced, not forgotten. */}
                <p className="font-mono text-[11px] tracking-[0.14em] text-muted/80 uppercase">
                  {entry.company}
                </p>
              </div>

              <div className="lg:col-span-8 lg:col-start-5">
                <h3 className="font-display text-xl font-semibold tracking-tight text-primary md:text-2xl">
                  {entry.role}
                </h3>
                <p className="mt-4 max-w-2xl leading-relaxed text-secondary">{entry.summary}</p>
                <ul className="mt-6 space-y-2">
                  {entry.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-relaxed text-secondary"
                    >
                      <span aria-hidden="true" className="font-mono text-muted/70 select-none">
                        –
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Divider subtle />
          </SectionReveal>
        ))}
      </Container>
    </section>
  );
}
