import Image from "next/image";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { heroContent, siteConfig, socialLinks } from "@/data/portfolio";
import { isPlaceholder } from "@/lib/utils";

function EngineerVisual() {
  const hasPortrait = !isPlaceholder(heroContent.portrait.src);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden border-l border-edge bg-surface/35">
      {hasPortrait ? (
        <Image
          src={heroContent.portrait.src}
          alt={heroContent.portrait.alt}
          fill
          priority
          sizes="(min-width: 1024px) 38vw, 90vw"
          className="object-cover object-top"
        />
      ) : (
        <div className="relative flex h-full flex-col justify-between p-6 sm:p-8" aria-hidden="true">
          <div className="flex items-center justify-between border-b border-edge-subtle pb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
            <span>{heroContent.fileLabel}</span>
            <span className="text-accent-green">stable</span>
          </div>
          <span className="font-display text-[clamp(11rem,38vw,21rem)] font-semibold leading-none tracking-[-0.12em] text-primary/8">
            S
          </span>
          <div className="absolute inset-x-6 bottom-24 top-24 sm:inset-x-8">
            <span className="absolute left-0 top-[20%] h-px w-[72%] bg-edge" />
            <span className="absolute right-0 top-[20%] h-[37%] w-px bg-accent-orange" />
            <span className="absolute right-0 top-[57%] h-px w-[55%] bg-edge" />
            <span className="absolute bottom-[15%] left-[20%] h-[30%] w-px bg-edge" />
            <span className="absolute bottom-[15%] left-[20%] h-px w-[45%] bg-accent-orange" />
          </div>
          <div className="relative border-t border-edge-subtle pt-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
              {heroContent.architectureCaption}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-secondary">
              {heroContent.architecturePath.map((step, index) => (
                <span key={step} className="flex items-center gap-2">
                  {step}
                  {index < heroContent.architecturePath.length - 1 && (
                    <span className="text-accent-orange">→</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function HeroSection() {
  const visibleSocials = socialLinks.filter(
    (link) => !isPlaceholder(link.href) && link.label !== "Email",
  );

  return (
    <section id="hero" className="relative min-h-[calc(100svh-4.25rem)] border-b border-edge-subtle">
      <Container className="grid min-h-[calc(100svh-4.25rem)] gap-12 py-14 lg:grid-cols-[1.15fr_0.65fr] lg:items-center lg:gap-16 lg:py-20">
        <div>
          <FadeUp>
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              <span className="text-accent-orange">01</span>
              <span>{heroContent.fileLabel}</span>
              <span className="h-px flex-1 bg-edge-subtle" aria-hidden="true" />
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-accent-green">
              {heroContent.eyebrow}
            </p>
            <h1
              id="hero-heading"
              tabIndex={-1}
              className="mt-5 max-w-5xl font-display text-[clamp(3.25rem,7.5vw,7.25rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-primary outline-none"
            >
              {heroContent.heading}
            </h1>
          </FadeUp>

          <FadeUp delay={0.12} className="mt-8 max-w-2xl">
            <p className="text-lg leading-relaxed text-secondary sm:text-xl">{heroContent.body}</p>
          </FadeUp>

          <FadeUp delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <a
              href="#work"
              className="flex min-h-11 items-center border border-accent-orange bg-accent-orange px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-background transition-colors hover:bg-transparent hover:text-primary"
            >
              {heroContent.primaryAction}
            </a>
            <a
              href={siteConfig.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center border border-edge px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary transition-colors hover:border-accent-orange"
            >
              {heroContent.resumeAction}
            </a>
          </FadeUp>

          <FadeUp delay={0.28} className="mt-10 grid gap-5 border-t border-edge-subtle pt-6 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Name</p>
              <p className="mt-2 text-sm text-primary">{siteConfig.name}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Role</p>
              <p className="mt-2 text-sm text-primary">{siteConfig.role}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Location</p>
              <p className="mt-2 text-sm text-primary">{siteConfig.location}</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.34} className="mt-6 flex flex-wrap gap-6">
            {visibleSocials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-mono text-[10px] uppercase tracking-[0.16em] text-secondary hover:text-primary"
              >
                {link.label} ↗
              </a>
            ))}
          </FadeUp>
        </div>

        <FadeUp delay={0.16}>
          <EngineerVisual />
        </FadeUp>
      </Container>
    </section>
  );
}
