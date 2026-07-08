import { education } from "@/data/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { SectionLabel } from "@/components/ui/section-label";

/** 05 / EDUCATION — academic background, editorial timeline style. */
export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-24">
      <Container className="py-20 md:py-28">
        <SectionReveal className="mb-12 space-y-5 md:mb-16">
          <SectionLabel index="06" label="EDUCATION" />
          <h2 className="font-display text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Education
          </h2>
        </SectionReveal>

        {education.map((entry) => (
          <SectionReveal key={entry.degree}>
            <Divider />
            <div className="grid gap-8 py-10 lg:grid-cols-12 lg:gap-8 md:py-14">
              <div className="space-y-3 lg:col-span-3">
                <p className="font-mono text-xs tracking-[0.14em] text-muted">{entry.period}</p>
                <p className="font-mono text-[11px] tracking-[0.14em] text-muted/80 uppercase">
                  {entry.board}
                </p>
              </div>

              <div className="lg:col-span-8 lg:col-start-5">
                <h3 className="font-display text-xl font-semibold tracking-tight text-primary md:text-2xl">
                  {entry.degree}
                </h3>
                <p className="mt-2 leading-relaxed text-secondary">{entry.institution}</p>
                <p className="mt-4 font-mono text-xs tracking-[0.14em] text-accent-green">
                  {entry.score}
                </p>
              </div>
            </div>
            <Divider subtle />
          </SectionReveal>
        ))}
      </Container>
    </section>
  );
}
