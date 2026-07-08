import { focusItems } from "@/data/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { FocusItems } from "@/components/sections/focus-items";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

/**
 * 05 / CURRENT FOCUS — staggered terminal-output rows via FocusItems.
 * Markers flicker once on entry; rows reveal with stagger.
 */
export function CurrentFocusSection() {
  return (
    <section id="focus" className="scroll-mt-24">
      <Container className="py-20 md:py-28">
        <SectionReveal className="mb-12 space-y-5 md:mb-16">
          <SectionLabel index="07" label="CURRENT FOCUS" />
          <h2 className="font-display text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            What I am sharpening right now.
          </h2>
        </SectionReveal>

        <FocusItems items={focusItems} />
      </Container>
    </section>
  );
}
