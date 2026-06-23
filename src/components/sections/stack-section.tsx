import type { AccentTone } from "@/types/portfolio";
import { stackGroups } from "@/data/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

/** Only the category index takes an accent — items stay neutral. */
const INDEX_TONE: Record<AccentTone, string> = {
  blue: "text-accent-blue",
  green: "text-accent-green",
  orange: "text-accent-orange",
  yellow: "text-accent-yellow",
  lavender: "text-accent-lavender",
  neutral: "text-secondary",
};

/**
 * 03 / STACK — typographic grid inspired by an IDE settings panel.
 * Thin separators between rows, no cards, no icons, no logos,
 * no pills, no percentages.
 */
export function StackSection() {
  return (
    <section id="stack" className="scroll-mt-24">
      <Container className="py-20 md:py-28">
        <SectionReveal className="mb-12 space-y-5 md:mb-16">
          <SectionLabel index="03" label="STACK" />
          <h2 className="font-display text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Tools I work with daily.
          </h2>
        </SectionReveal>

        <SectionReveal>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {stackGroups.map((group) => (
              <div key={group.title} className="border-t border-edge pt-5">
                <p className="font-mono text-[11px] tracking-[0.18em]">
                  <span className={INDEX_TONE[group.accent]}>{group.index}</span>
                  <span className="ml-3 text-primary">{group.title}</span>
                </p>
                <ul className="mt-5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-b border-edge-subtle py-2.5 text-sm text-secondary transition-colors duration-150 hover:text-primary last:border-b-0"
                    >
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
