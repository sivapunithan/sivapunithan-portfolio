import { siteConfig, socialLinks } from "@/data/portfolio";
import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { isPlaceholder } from "@/lib/utils";

export function HeroSection() {
  const visibleSocials = socialLinks.filter((link) => !isPlaceholder(link.href));

  return (
    <section id="intro" className="relative flex min-h-[calc(100svh-5.75rem)] flex-col border-b border-edge bg-[var(--background)]">
      <Container className="relative z-10 grid flex-1 grid-cols-1 gap-10 py-16 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
        <div className="flex flex-col justify-start">
          <FadeUp delay={0} y={8}>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent-orange">
              {siteConfig.role}
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[0.95] tracking-[-0.03em] text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              I build reliable backend systems and the interfaces that operate them.
            </h1>
          </FadeUp>

          <FadeUp delay={0.16} className="mt-8 max-w-2xl">
            <p className="text-lg leading-relaxed text-secondary sm:text-xl">
              Java and Spring Boot engineer working across APIs, enterprise workflows, SQL and Next.js applications.
            </p>
          </FadeUp>

          <FadeUp delay={0.24} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="rounded-full border border-edge px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary transition hover:border-accent-orange hover:text-accent-orange"
            >
              View my work
            </a>
            <a
              href={siteConfig.resumePath}
              className="rounded-full border border-edge px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary transition hover:border-primary hover:text-primary"
            >
              Résumé
            </a>
          </FadeUp>

          <FadeUp delay={0.32} className="mt-10 space-y-5 border-t border-edge pt-8">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Name</p>
                <p className="mt-2 text-lg text-primary">Sivapunithan S</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Role</p>
                <p className="mt-2 text-lg text-primary">Java Backend Engineer</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Location</p>
                <p className="mt-2 text-lg text-primary">Kanyakumari, Tamil Nadu, India</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              {visibleSocials.map((link) => (
                <TextLink key={link.label} href={link.href} mono external className="text-[11px] text-muted hover:text-primary">
                  {link.label}
                </TextLink>
              ))}
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-edge bg-[linear-gradient(135deg,var(--surface),var(--background-deep))] p-6 sm:p-8">
            <div className="flex h-full flex-col justify-between rounded-[1rem] border border-edge-subtle bg-[var(--background)]/80 p-6">
              <div className="space-y-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent-orange">
                  Portrait slot
                </p>
                <div className="h-64 rounded-[1rem] border border-dashed border-edge-subtle bg-[radial-gradient(circle_at_top_left,var(--surface-raised),transparent_70%)]" />
              </div>
              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                  Required asset
                </p>
                <p className="text-sm leading-relaxed text-secondary">
                  A transparent PNG or WebP waist-up portrait with a natural edit, high resolution and a 4:5 aspect ratio.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
