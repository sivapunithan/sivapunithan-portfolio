import { HeroMedia } from "@/components/motion/hero-media";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Container } from "@/components/ui/container";
import type { PageHeroCopy } from "@/types/portfolio";

/**
 * Opening band for About / Work / Contact, laid out like the Home hero: the illustration
 * fills the right ~60% and dissolves into the page on its left, with the title beside it.
 * Keeping the art off the full width matters — the source illustrations are 1024 px
 * originals, and stretching them edge to edge enlarges them 2× on a 1920 px screen.
 * On small screens the image stacks above the copy.
 */
export function PageHero({ eyebrow, heading, body, illustration }: PageHeroCopy) {
  return (
    <section className="relative isolate flex min-h-[86svh] flex-col overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[58svh] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[60%]">
        <HeroMedia
          src={illustration.src}
          alt={illustration.alt}
          position={illustration.position}
          caption={illustration.caption}
          sizes="(min-width: 1024px) 68vw, 110vw"
        />
        <div aria-hidden="true" className="hero-fade-x absolute inset-0 max-lg:hidden" />
        <div aria-hidden="true" className="hero-fade-y absolute inset-0 lg:top-1/2" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background/80 to-transparent"
        />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-end pb-14 pt-[40svh] md:pb-20 lg:justify-center lg:pb-16 lg:pt-36">
        <div className="max-w-[39rem] lg:max-w-[min(39rem,45vw)]">
          <Reveal trigger="intro" delay={0.45} y={14}>
            <p className="label flex items-center gap-4 text-accent">
              <span aria-hidden="true" className="h-px w-10 bg-accent/70" />
              {eyebrow}
            </p>
          </Reveal>
          <SplitText
            as="h1"
            text={heading}
            trigger="intro"
            delay={0.5}
            className="display-xl mt-7 text-primary"
          />
          <Reveal trigger="intro" delay={0.95} className="mt-7 max-w-xl">
            <p className="text-lg leading-relaxed text-secondary">{body}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
