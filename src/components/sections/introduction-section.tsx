import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { sectionCopy } from "@/data/portfolio";

export function IntroductionSection() {
  const copy = sectionCopy.introduction;

  return (
    <section id="about" className="scroll-mt-24">
      <Container className="py-24 md:py-36">
        <SectionReveal className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
          <SectionLabel index={copy.index} label={copy.label} />
          <div>
            <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-primary sm:text-5xl md:text-6xl">
              {copy.heading}
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-secondary">{copy.body}</p>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
