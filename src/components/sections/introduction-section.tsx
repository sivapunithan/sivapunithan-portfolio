import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export function IntroductionSection() {
  return (
    <section id="about" className="scroll-mt-24">
      <Container className="py-20 md:py-28">
        <SectionReveal>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
            <div className="space-y-4">
              <SectionLabel index="01" label="INTRODUCTION" />
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
                Backend systems, presented with editorial impact.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-primary sm:text-4xl md:text-5xl">
                I work where business workflows, backend logic and data integrity meet.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-secondary">
                My work spans Java and Spring Boot development, REST APIs, enterprise workflows, Oracle SQL and MySQL, production debugging, and Next.js plus TypeScript integration.
              </p>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
