import { focusItems } from "@/data/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export function CurrentFocusSection() {
  return (
    <section id="focus" className="scroll-mt-24">
      <Container className="py-20 md:py-28">
        <SectionReveal className="mb-12 space-y-5 md:mb-16">
          <SectionLabel index="07" label="CURRENT FOCUS" />
          <h2 className="font-display text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Keeping the fundamentals sharp while scaling up.
          </h2>
        </SectionReveal>

        <SectionReveal>
          <div className="grid gap-4 md:grid-cols-2">
            {focusItems.map((item) => (
              <div key={item.title} className="rounded-[1rem] border border-edge bg-surface/30 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent-orange">{item.index}</p>
                <p className="mt-3 text-lg text-primary">{item.title}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{item.status}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
