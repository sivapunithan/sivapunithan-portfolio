import { contactConfig, siteConfig, socialLinks } from "@/data/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { TextLink } from "@/components/ui/text-link";
import { isPlaceholder } from "@/lib/utils";

/**
 * 06 / CONTACT — large display close, text links only. No form, no icon
 * buttons, no gradient panel.
 */
export function ContactSection() {
  const emailHref = isPlaceholder(contactConfig.email) ? null : `mailto:${contactConfig.email}`;
  const linkedIn = socialLinks.find((link) => link.label === "LinkedIn");
  const gitHub = socialLinks.find((link) => link.label === "GitHub");

  return (
    <section id="contact" className="scroll-mt-24">
      <Container className="py-24 md:py-36">
        <SectionReveal className="space-y-5">
          <SectionLabel index="07" label="CONTACT" />
          <h2 className="max-w-3xl font-display text-4xl leading-[1.08] font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Let’s build something reliable.
          </h2>
          <p className="max-w-xl pt-3 leading-relaxed text-secondary">{contactConfig.body}</p>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mt-12">
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-5">
            {emailHref && (
              <li>
                <TextLink href={emailHref} mono arrow className="text-primary">
                  Email
                </TextLink>
              </li>
            )}
            {linkedIn && !isPlaceholder(linkedIn.href) && (
              <li>
                <TextLink href={linkedIn.href} mono arrow external>
                  LinkedIn
                </TextLink>
              </li>
            )}
            {gitHub && !isPlaceholder(gitHub.href) && (
              <li>
                <TextLink href={gitHub.href} mono arrow external>
                  GitHub
                </TextLink>
              </li>
            )}
            <li>
              <TextLink href={siteConfig.resumePath} mono arrow external>
                Download résumé
              </TextLink>
            </li>
          </ul>
        </SectionReveal>
      </Container>
    </section>
  );
}
