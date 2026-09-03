import type { AccentTone } from "@/types/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { sectionCopy, stackGroups } from "@/data/portfolio";

const INDEX_TONE: Record<AccentTone, string> = {
  blue: "text-accent-blue",
  green: "text-accent-green",
  orange: "text-accent-orange",
  yellow: "text-accent-yellow",
  neutral: "text-secondary",
};

export function StackSection() {
  const copy = sectionCopy.stack;

  return (
    <section id="stack" className="scroll-mt-24 border-y border-edge-subtle bg-surface/25">
      <Container className="py-24 md:py-32">
        <SectionReveal className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
          <SectionLabel index={copy.index} label={copy.label} />
          <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-0.03em] text-primary sm:text-5xl">
            {copy.heading}
          </h2>
        </SectionReveal>

        <SectionReveal className="mt-16 grid border-t border-edge sm:grid-cols-2 lg:grid-cols-5">
          {stackGroups.map((group) => (
            <div
              key={group.title}
              className="border-b border-edge-subtle py-7 sm:px-6 sm:first:pl-0 lg:border-r lg:last:border-r-0"
            >
              <p className="font-mono text-[10px] tracking-[0.16em]">
                <span className={INDEX_TONE[group.accent]}>{group.index}</span>
                <span className="ml-3 text-primary">{group.title}</span>
              </p>
              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-secondary">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </SectionReveal>
      </Container>
    </section>
  );
}
