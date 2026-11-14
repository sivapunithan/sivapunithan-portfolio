import { Reveal } from "@/components/motion/reveal";
import { ScrollRotate } from "@/components/motion/scroll-rotate";
import { SplitText } from "@/components/motion/split-text";
import { ChipList } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { FlowDiagram } from "@/components/ui/flow-diagram";
import { Gear } from "@/components/ui/gear";
import { SectionLabel } from "@/components/ui/section-label";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import {
  aboutFacts,
  architectureContent,
  education,
  experience,
  focusItems,
  sectionCopy,
} from "@/data/portfolio";
import type { FocusStatus } from "@/types/portfolio";
import { cn, padIndex } from "@/lib/utils";

/** Who he is, in two sentences and four facts. */
export function IntroductionSection() {
  const copy = sectionCopy.introduction;

  return (
    <section>
      <Container className="grid gap-10 py-24 md:py-36 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
        <Reveal>
          <SectionLabel index={copy.index} label={copy.label} />
        </Reveal>
        <div>
          <SplitText as="h2" text={copy.heading} className="display-lg max-w-[19ch] text-primary" />
          <Reveal delay={0.15} className="mt-9 max-w-2xl">
            <p className="dropcap text-lg leading-relaxed text-secondary">{copy.body}</p>
          </Reveal>

          <dl className="mt-16 grid border-t border-line sm:grid-cols-2">
            {aboutFacts.map((fact, index) => (
              <Reveal
                key={fact.label}
                delay={index * 0.07}
                y={16}
                className="border-b border-line py-6 sm:odd:pr-8 sm:even:border-l sm:even:pl-8"
              >
                <dt className="label text-muted">{fact.label}</dt>
                <dd className="mt-3 font-display text-[1.375rem] font-light leading-snug tracking-[-0.01em] text-primary">
                  {fact.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

/** The mental model, pinned up as a parchment sheet in the dark workshop. */
export function ThinkingSection() {
  const { section, flow, concernLabel, concern, principlesLabel, principles } = architectureContent;

  return (
    <section>
      <Container className="pb-24 md:pb-36">
        <Reveal y={40}>
          <div className="paper relative overflow-hidden rounded-[2rem] px-6 py-14 sm:px-10 md:px-16 md:py-20">
            <ScrollRotate
              ratio={-0.04}
              className="pointer-events-none absolute -right-36 -top-36 h-[26rem] w-[26rem] text-accent/20"
            >
              <Gear teeth={20} spokes={7} className="h-full w-full" />
            </ScrollRotate>

            <div className="relative">
              <SectionLabel index={section.index} label={section.label} />
              <SplitText
                as="h2"
                text={section.heading}
                className="display-lg mt-8 max-w-[21ch] text-primary"
              />
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-secondary">
                {section.body}
              </p>

              <FlowDiagram nodes={flow} direction="horizontal" className="mt-14" />

              <div className="mt-16 grid gap-12 border-t border-line pt-12 lg:grid-cols-2 lg:gap-20">
                <div>
                  <p className="label text-muted">{concernLabel}</p>
                  <p className="mt-5 font-display text-[1.5rem] font-light leading-[1.35] tracking-[-0.01em] text-primary md:text-[1.75rem]">
                    {concern}
                  </p>
                </div>
                <div>
                  <p className="label text-muted">{principlesLabel}</p>
                  <ol className="mt-5 border-t border-line">
                    {principles.map((principle, index) => (
                      <li
                        key={principle}
                        className="flex items-baseline gap-5 border-b border-line py-4"
                      >
                        <span className="label text-accent">{padIndex(index + 1)}</span>
                        <span className="text-[1.0625rem] leading-relaxed text-primary">
                          {principle}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** The one role so far, with the three problem areas inside it as their own cards. */
export function ExperienceSection() {
  const copy = sectionCopy.experience;

  return (
    <section className="border-t border-line">
      <Container className="py-24 md:py-36">
        <Reveal>
          <SectionLabel index={copy.index} label={copy.label} />
        </Reveal>
        <SplitText
          as="h2"
          text={copy.heading}
          className="display-lg mt-8 max-w-[20ch] text-primary"
        />

        {experience.map((entry) => (
          <article
            key={`${entry.company}-${entry.startDate}`}
            className="mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-[0.42fr_1fr] lg:gap-16"
          >
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <p className="label text-accent">
                {entry.startDate} — {entry.endDate}
              </p>
              <p className="mt-5 font-display text-2xl font-light tracking-[-0.01em] text-primary">
                {entry.company}
              </p>
              <p className="mt-2 text-[0.9375rem] text-secondary">{entry.location}</p>
            </Reveal>

            <div>
              <Reveal>
                <h3 className="display-md text-primary">{entry.role}</h3>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-secondary">
                  {entry.summary}
                </p>
                <ChipList items={entry.techTags} className="mt-7" />
              </Reveal>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {entry.modules.map((module, index) => (
                  <Reveal key={module.title} delay={index * 0.1} className="h-full">
                    <SpotlightCard className="h-full">
                      <div className="flex h-full flex-col p-7">
                        <p className="font-display text-4xl font-light italic text-accent/70">
                          {padIndex(index + 1)}
                        </p>
                        <h4 className="mt-7 text-[1.0625rem] font-medium leading-snug text-primary">
                          {module.title}
                        </h4>
                        <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary">
                          {module.description}
                        </p>
                        <p className="label mt-auto pt-8 leading-relaxed text-muted">
                          {module.stack.join(" · ")}
                        </p>
                      </div>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
}

const FOCUS_DOT: Record<FocusStatus, string> = {
  BUILDING: "bg-accent",
  PRACTISING: "border border-accent",
  LEARNING: "border border-muted",
};

const FOCUS_LABEL: Record<FocusStatus, string> = {
  BUILDING: "Building",
  PRACTISING: "Practising",
  LEARNING: "Learning",
};

/** Where the fundamentals came from, next to what is being sharpened now. */
export function EducationFocusSection() {
  const educationCopy = sectionCopy.education;
  const focusCopy = sectionCopy.focus;

  return (
    <section className="border-t border-line">
      <Container className="grid gap-20 py-24 md:py-36 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
        <div>
          <Reveal>
            <SectionLabel index={educationCopy.index} label={educationCopy.label} />
          </Reveal>
          <SplitText
            as="h2"
            text={educationCopy.heading}
            className="display-md mt-8 max-w-[16ch] text-primary"
          />

          {education.map((entry) => (
            <Reveal key={entry.degree} delay={0.15} className="mt-12">
              <SpotlightCard>
                <div className="p-8 md:p-10">
                  <p className="font-display text-[clamp(4rem,8vw,6.5rem)] font-light leading-none tracking-[-0.04em] text-accent">
                    {entry.score}
                  </p>
                  <p className="label mt-4 text-muted">{entry.scoreLabel}</p>
                  <h3 className="mt-10 font-display text-2xl font-light leading-snug tracking-[-0.01em] text-primary">
                    {entry.degree}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary">
                    {entry.institution}
                  </p>
                  <p className="label mt-7 text-muted">
                    {entry.board} · {entry.period}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <div>
          <Reveal>
            <SectionLabel index={focusCopy.index} label={focusCopy.label} />
          </Reveal>
          <SplitText
            as="h2"
            text={focusCopy.heading}
            className="display-md mt-8 max-w-[18ch] text-primary"
          />

          <ul className="mt-12 border-t border-line">
            {focusItems.map((item, index) => (
              <li key={item.title}>
                <Reveal
                  delay={index * 0.06}
                  y={14}
                  className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-3 border-b border-line py-5 transition-colors duration-500 hover:border-line-strong"
                >
                  <span className="label text-muted">{item.index}</span>
                  <span className="text-[1.0625rem] text-primary transition-transform duration-500 ease-expo group-hover:translate-x-2">
                    {item.title}
                  </span>
                  <span className="label flex items-center gap-2.5 text-secondary">
                    <span
                      aria-hidden="true"
                      className={cn("h-2 w-2 rounded-full", FOCUS_DOT[item.status])}
                    />
                    {FOCUS_LABEL[item.status]}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
