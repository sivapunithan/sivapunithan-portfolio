import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { focusItems, sectionCopy } from "@/data/portfolio";

const STATUS_TONE = {
  LEARNING: "text-accent-yellow",
  PRACTISING: "text-accent-blue",
  BUILDING: "text-accent-green",
} as const;

export function CurrentFocusSection() {
  const copy = sectionCopy.focus;

  return (
    <section id="focus" className="scroll-mt-24">
      <Container className="py-24 md:py-32">
        <SectionReveal className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
          <SectionLabel index={copy.index} label={copy.label} />
          <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-0.03em] text-primary sm:text-5xl">
            {copy.heading}
          </h2>
        </SectionReveal>

        <SectionReveal className="mt-14 border-t border-edge">
          {focusItems.map((item) => (
            <div
              key={item.title}
              className="grid min-h-16 grid-cols-[2.5rem_1fr] items-center gap-3 border-b border-edge-subtle py-4 sm:grid-cols-[4rem_1fr_auto]"
            >
              <span className="font-mono text-[10px] text-muted">{item.index}</span>
              <p className="text-base text-primary sm:text-lg">{item.title}</p>
              <p
                className={`col-start-2 font-mono text-[9px] uppercase tracking-[0.16em] sm:col-start-auto ${STATUS_TONE[item.status]}`}
              >
                {item.status}
              </p>
            </div>
          ))}
        </SectionReveal>
      </Container>
    </section>
  );
}
