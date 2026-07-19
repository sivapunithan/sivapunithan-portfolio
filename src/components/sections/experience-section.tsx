import { experience } from "@/data/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24">
      <Container className="py-20 md:py-28">
        <SectionReveal className="mb-12 space-y-5 md:mb-16">
          <SectionLabel index="05" label="EXPERIENCE" />
          <h2 className="font-display text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Working at the edge of enterprise workflows and backend reliability.
          </h2>
        </SectionReveal>

        <div className="space-y-10">
          {experience.map((entry) => (
            <SectionReveal key={`${entry.company}-${entry.startDate}`}>
              <div className="rounded-[1.25rem] border border-edge bg-surface/30 p-8 md:p-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent-orange">
                      {entry.startDate} — {entry.endDate}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                      {entry.role}
                    </h3>
                    <p className="mt-2 text-lg text-secondary">{entry.company}</p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                      {entry.location}
                    </p>
                  </div>
                  <div className="max-w-2xl">
                    <p className="text-base leading-relaxed text-secondary">{entry.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {entry.techTags.map((tag) => (
                        <span key={tag} className="rounded-full border border-edge px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-secondary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                  {entry.modules.map((module) => (
                    <div key={module.title} className="rounded-[0.9rem] border border-edge-subtle bg-background/70 p-5">
                      <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                        {module.title}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-secondary">{module.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {module.stack.map((tool) => (
                          <span key={tool} className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
