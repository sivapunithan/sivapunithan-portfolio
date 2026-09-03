import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { education, sectionCopy } from "@/data/portfolio";

export function EducationSection() {
  const copy = sectionCopy.education;

  return (
    <section id="education" className="scroll-mt-24">
      <Container className="py-20 md:py-24">
        <SectionReveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionLabel index={copy.index} label={copy.label} />
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-primary">
              {copy.heading}
            </h2>
          </div>
          {education.map((entry) => (
            <div
              key={entry.degree}
              className="mt-9 grid gap-5 border-y border-edge py-7 md:grid-cols-[1.25fr_1fr_auto] md:items-center md:gap-8"
            >
              <div>
                <h3 className="text-lg font-semibold text-primary">{entry.degree}</h3>
                <p className="mt-2 text-sm text-secondary">{entry.institution}</p>
              </div>
              <div className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-muted">
                <p>{entry.board}</p>
                <p className="mt-1">{entry.period}</p>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-green">
                {entry.score}
              </p>
            </div>
          ))}
        </SectionReveal>
      </Container>
    </section>
  );
}
