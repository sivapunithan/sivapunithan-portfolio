import Link from "next/link";
import { ParallaxFrame } from "@/components/motion/parallax-frame";
import { Reveal } from "@/components/motion/reveal";
import { ScrollRotate } from "@/components/motion/scroll-rotate";
import { ScrollWords } from "@/components/motion/scroll-words";
import { SplitText } from "@/components/motion/split-text";
import { ArrowLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Gear } from "@/components/ui/gear";
import { ArrowRight } from "@/components/ui/icons";
import { Marquee } from "@/components/ui/marquee";
import { Ornament } from "@/components/ui/ornament";
import { SectionLabel } from "@/components/ui/section-label";
import {
  aboutHero,
  homeAbout,
  homeStatement,
  projects,
  sectionCopy,
  stackGroups,
} from "@/data/portfolio";
import { padIndex } from "@/lib/utils";

/** The positioning statement, lit word by word by the reader's scroll. */
export function StatementSection() {
  return (
    <section className="relative overflow-hidden">
      <ScrollRotate
        ratio={0.045}
        className="pointer-events-none absolute -left-52 top-10 h-[34rem] w-[34rem] text-accent/15 max-md:hidden"
      >
        <Gear teeth={22} spokes={8} className="h-full w-full" />
      </ScrollRotate>

      <Container className="relative py-28 md:py-44">
        <div className="lg:pl-[16%]">
          <Ornament className="mb-10 justify-start" />
          <Reveal>
            <SectionLabel index={homeStatement.index} label={homeStatement.label} />
          </Reveal>
          <ScrollWords
            text={homeStatement.text}
            className="mt-10 max-w-[22ch] font-display text-[clamp(1.9rem,4.3vw,3.9rem)] font-light leading-[1.12] tracking-[-0.022em] text-primary sm:max-w-[26ch]"
          />
        </div>
      </Container>
    </section>
  );
}

/** Project index: big type rows that sweep, shift and point on hover. */
export function FeaturedWorkSection() {
  const copy = sectionCopy.projects;

  return (
    <section className="relative border-t border-line">
      <Container className="py-24 md:py-36">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="02" label={copy.label} />
            </Reveal>
            <SplitText
              as="h2"
              text={copy.heading}
              className="display-lg mt-8 max-w-[20ch] text-primary"
            />
          </div>
          <Reveal delay={0.2}>
            <ArrowLink href="/work">All work, with the request paths</ArrowLink>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-line">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Reveal delay={index * 0.07} y={18}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="work-row group relative grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-b border-line py-8 md:grid-cols-[4.5rem_1fr_auto] md:gap-x-8 md:py-10"
                >
                  <span className="label relative text-muted">{padIndex(index + 1)}</span>
                  <span className="relative block transition-transform duration-700 ease-expo group-hover:translate-x-3 md:group-hover:translate-x-5">
                    <span className="block font-display text-[clamp(1.75rem,3.9vw,3.4rem)] font-light leading-[1.05] tracking-[-0.025em] text-primary transition-colors duration-500 group-hover:text-accent-bright">
                      {project.title}
                    </span>
                    <span className="mt-2.5 block max-w-xl text-[0.9375rem] leading-relaxed text-secondary">
                      {project.tagline}
                    </span>
                  </span>
                  <span className="relative hidden items-center gap-7 self-center md:flex">
                    <span className="label text-muted">{project.category}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-accent transition-all duration-700 ease-expo group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Two bands of the real stack sliding past each other. */
export function StackMarqueeSection() {
  const [backend, data, frontend, engineering] = stackGroups;
  const firstRow = [...backend.items, ...data.items];
  const secondRow = [...frontend.items, ...engineering.items];

  return (
    <section aria-label="Technical stack" className="border-t border-line py-16 md:py-24">
      <Marquee items={firstRow} duration={62} />
      <Marquee items={secondRow} duration={54} reverse className="mt-5 md:mt-8" />
    </section>
  );
}

/** A framed look into the workshop, pointing to the About page. */
export function AboutTeaserSection() {
  return (
    <section className="border-t border-line">
      <Container className="grid items-center gap-14 py-24 md:py-36 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        <ParallaxFrame
          src={aboutHero.illustration.src}
          alt={aboutHero.illustration.alt}
          position="62% 30%"
          sizes="(min-width: 1024px) 46vw, 92vw"
          className="aspect-[5/4] w-full"
        />
        <div>
          <Reveal>
            <SectionLabel index={homeAbout.index} label={homeAbout.label} />
          </Reveal>
          <SplitText
            as="h2"
            text={homeAbout.heading}
            className="display-lg mt-8 max-w-[14ch] text-primary"
          />
          <Reveal delay={0.15} className="mt-8 max-w-md">
            <p className="text-lg leading-relaxed text-secondary">{homeAbout.body}</p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10">
            <ArrowLink href="/about">{homeAbout.action}</ArrowLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
