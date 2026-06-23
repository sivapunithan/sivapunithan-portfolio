import { SectionReveal } from "@/components/motion/section-reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { SectionLabel } from "@/components/ui/section-label";

/** 01 / INTRODUCTION — two-column editorial layout, no cards, no icons. */
export function IntroductionSection() {
  return (
    <section id="about" className="scroll-mt-24">
      <Container className="py-20 md:py-28">
        <SectionReveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="space-y-4 lg:col-span-3">
              <SectionLabel index="01" label="INTRODUCTION" />
              <Breadcrumb segments={["core", "about"]} className="text-muted/70" />
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              <h2 className="font-display text-2xl leading-snug font-semibold tracking-tight text-primary sm:text-3xl md:text-4xl">
                I care about the invisible parts of software — APIs, data flows, validations,
                persistence, and the business rules that make products reliable.
              </h2>
              <p className="mt-8 max-w-2xl leading-relaxed text-secondary">
                I am a backend-focused full-stack developer working with Java, Spring Boot, SQL,
                Next.js, and TypeScript. I enjoy debugging complex workflows, designing practical
                APIs, and building maintainable software that solves real operational problems.
              </p>
            </div>
          </div>
        </SectionReveal>
        <Divider subtle className="mt-20 md:mt-28" />
      </Container>
    </section>
  );
}
