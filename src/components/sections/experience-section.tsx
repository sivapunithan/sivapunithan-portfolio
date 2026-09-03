import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { experience, sectionCopy } from "@/data/portfolio";

export function ExperienceSection() {
  const copy = sectionCopy.experience;

  return (
    <section id="experience" className="scroll-mt-24">
      <Container className="py-24 md:py-32">
        <SectionReveal className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
          <SectionLabel index={copy.index} label={copy.label} />
          <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-0.03em] text-primary sm:text-5xl">
            {copy.heading}
          </h2>
        </SectionReveal>

        <div className="mt-16 border-t border-edge">
          {experience.map((entry) => (
            <SectionReveal key={`${entry.company}-${entry.startDate}`}>
              <article className="grid gap-10 border-b border-edge-subtle py-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-orange">
                    {entry.startDate} — {entry.endDate}
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {entry.location}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-semibold tracking-[-0.03em] text-primary">
                    {entry.role}
                  </h3>
                  <p className="mt-2 text-lg text-secondary">{entry.company}</p>
                  <p className="mt-6 max-w-2xl leading-relaxed text-secondary">{entry.summary}</p>
                  <p className="mt-5 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-muted">
                    {entry.techTags.join(" / ")}
                  </p>

                  <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    {entry.modules.map((module) => (
                      <div key={module.title} className="border-t border-edge-subtle pt-5">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                          {module.title}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-secondary">
                          {module.description}
                        </p>
                        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                          {module.stack.join(" · ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
