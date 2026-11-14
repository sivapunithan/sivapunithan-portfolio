import { HeroMedia } from "@/components/motion/hero-media";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { heroContent, siteConfig } from "@/data/portfolio";

/**
 * Home opener. The illustration bleeds off the top, right and bottom edges and
 * dissolves into the page on its left, so the headline sits beside the portrait
 * instead of on top of it. On small screens the image stacks above the copy.
 */
export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[66svh] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[62%]">
        <HeroMedia
          src={heroContent.illustration.src}
          alt={heroContent.illustration.alt}
          position={heroContent.illustration.position}
          caption={heroContent.illustration.caption}
          sizes="(min-width: 1024px) 70vw, 110vw"
        />
        <div aria-hidden="true" className="hero-fade-x absolute inset-0 max-lg:hidden" />
        <div aria-hidden="true" className="hero-fade-y absolute inset-0 lg:top-1/2" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background/80 to-transparent"
        />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-end pb-12 pt-[44svh] lg:justify-center lg:pb-16 lg:pt-36">
        <div className="max-w-[39rem] lg:max-w-[min(39rem,44vw)]">
          <Reveal trigger="intro" delay={0.45} y={14}>
            <p className="label flex items-center gap-4 text-accent">
              <span aria-hidden="true" className="h-px w-10 bg-accent/70" />
              {heroContent.eyebrow}
            </p>
          </Reveal>

          <SplitText
            as="h1"
            id="hero-heading"
            text={heroContent.heading}
            trigger="intro"
            delay={0.5}
            className="display-xl mt-7 text-primary"
          />

          <Reveal trigger="intro" delay={1.05} className="mt-8 max-w-[33rem]">
            <p className="text-lg leading-relaxed text-secondary">{heroContent.body}</p>
          </Reveal>

          <Reveal trigger="intro" delay={1.2} className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/work">{heroContent.primaryAction}</ButtonLink>
            <ButtonLink href={siteConfig.resumePath} variant="ghost" external>
              {heroContent.resumeAction}
            </ButtonLink>
          </Reveal>
        </div>
      </Container>

      <Container className="relative z-10 hidden pb-9 lg:block">
        <Reveal trigger="intro" delay={1.5} y={10} className="flex items-end justify-between">
          <p className="scroll-cue label text-muted">Scroll</p>
          <p className="label flex items-center gap-3.5 text-secondary">
            <span aria-hidden="true" className="pulse-dot" />
            {siteConfig.availability}
            <span aria-hidden="true" className="text-muted">
              /
            </span>
            <span className="text-muted">{siteConfig.location}</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
