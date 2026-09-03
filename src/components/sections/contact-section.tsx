import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { contactConfig, siteConfig, socialLinks } from "@/data/portfolio";
import { isPlaceholder } from "@/lib/utils";

export function ContactSection() {
  const emailHref = isPlaceholder(contactConfig.email) ? null : `mailto:${contactConfig.email}`;
  const visibleSocials = socialLinks.filter(
    (link) => link.label !== "Email" && !isPlaceholder(link.href),
  );

  return (
    <section id="contact" className="scroll-mt-24 border-t border-edge bg-surface">
      <Container className="py-24 md:py-36">
        <SectionReveal>
          <SectionLabel index="09" label="CONTACT" />
          <h2 className="mt-10 max-w-5xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-primary sm:text-6xl md:text-7xl">
            {contactConfig.heading}
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-secondary">
            {contactConfig.body}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {emailHref && (
              <a
                href={emailHref}
                className="flex min-h-11 items-center border border-accent-orange bg-accent-orange px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-background transition-colors hover:bg-transparent hover:text-primary"
              >
                Email me
              </a>
            )}
            {visibleSocials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center border border-edge px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary transition-colors hover:border-accent-orange"
              >
                {link.label}
              </a>
            ))}
            <a
              href={siteConfig.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center border border-edge px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary transition-colors hover:border-accent-orange"
            >
              Résumé
            </a>
          </div>

          <dl className="mt-14 grid gap-7 border-t border-edge pt-7 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                {contactConfig.emailLabel}
              </dt>
              <dd className="mt-2 break-all text-sm text-secondary">{contactConfig.email}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                {contactConfig.locationLabel}
              </dt>
              <dd className="mt-2 text-sm text-secondary">{siteConfig.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                {contactConfig.availabilityLabel}
              </dt>
              <dd className="mt-2 text-sm text-secondary">{siteConfig.availability}</dd>
            </div>
          </dl>
        </SectionReveal>
      </Container>
    </section>
  );
}
