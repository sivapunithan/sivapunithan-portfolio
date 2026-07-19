import { contactConfig, siteConfig, socialLinks } from "@/data/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { isPlaceholder } from "@/lib/utils";

export function ContactSection() {
  const emailHref = isPlaceholder(contactConfig.email) ? null : `mailto:${contactConfig.email}`;
  const linkedIn = socialLinks.find((link) => link.label === "LinkedIn");
  const gitHub = socialLinks.find((link) => link.label === "GitHub");

  return (
    <section id="contact" className="scroll-mt-24">
      <Container className="py-24 md:py-32">
        <SectionReveal className="rounded-[1.5rem] border border-edge bg-surface/30 p-8 md:p-10">
          <SectionLabel index="06" label="CONTACT" />
          <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-semibold tracking-tight text-primary sm:text-5xl">
            {contactConfig.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-secondary">{contactConfig.body}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            {emailHref && (
              <a href={emailHref} className="rounded-full border border-edge px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary transition hover:border-accent-orange hover:text-accent-orange">
                Email
              </a>
            )}
            {linkedIn && !isPlaceholder(linkedIn.href) && (
              <a href={linkedIn.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-edge px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary transition hover:border-primary hover:text-primary">
                LinkedIn
              </a>
            )}
            {gitHub && !isPlaceholder(gitHub.href) && (
              <a href={gitHub.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-edge px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary transition hover:border-primary hover:text-primary">
                GitHub
              </a>
            )}
            <a href={siteConfig.resumePath} target="_blank" rel="noopener noreferrer" className="rounded-full border border-edge px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary transition hover:border-primary hover:text-primary">
              Résumé
            </a>
          </div>

          <div className="mt-10 grid gap-6 border-t border-edge pt-8 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">Email</p>
              <p className="mt-2 text-sm text-secondary">{contactConfig.email}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">Location</p>
              <p className="mt-2 text-sm text-secondary">Kanyakumari, Tamil Nadu, India</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">Availability</p>
              <p className="mt-2 text-sm text-secondary">Open to relevant opportunities</p>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
