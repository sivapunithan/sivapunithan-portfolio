import type { AccentTone } from "@/types/portfolio";
import { stackGroups } from "@/data/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const INDEX_TONE: Record<AccentTone, string> = {
  blue: "text-accent-blue",
  green: "text-accent-green",
  orange: "text-accent-orange",
  yellow: "text-accent-yellow",
  lavender: "text-accent-lavender",
  neutral: "text-secondary",
};

export function StackSection() {
  return (
    <section id="stack" className="scroll-mt-24">
      <Container className="py-20 md:py-28">
        <SectionReveal className="mb-12 space-y-5 md:mb-16">
          <SectionLabel index="04" label="STACK" />
          <h2 className="font-display text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Focused on the tools that hold backend systems together.
          </h2>
        </SectionReveal>

        <SectionReveal>
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-5">
            {stackGroups.map((group) => (
              <div key={group.title} className="rounded-[1rem] border border-edge bg-surface/30 p-5">
                <p className="font-mono text-[11px] tracking-[0.2em]">
                  <span className={INDEX_TONE[group.accent]}>{group.index}</span>
                  <span className="ml-3 text-primary">{group.title}</span>
                </p>
                <ul className="mt-5 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-secondary">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
