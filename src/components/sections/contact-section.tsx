import { contactConfig, siteConfig, socialLinks } from "@/data/portfolio";
import { SectionReveal } from "@/components/motion/section-reveal";
import { ApiContactPanel } from "@/components/sections/api-contact-panel";
import { Container } from "@/components/ui/container";
import { CodeCommentLabel } from "@/components/ui/code-comment-label";
import { SectionLabel } from "@/components/ui/section-label";
import { isPlaceholder } from "@/lib/utils";

/** 06 / CONTACT — API endpoint presentation with existing contact actions. */
export function ContactSection() {
  const emailHref = isPlaceholder(contactConfig.email) ? null : `mailto:${contactConfig.email}`;
  const linkedIn = socialLinks.find((link) => link.label === "LinkedIn");
  const gitHub = socialLinks.find((link) => link.label === "GitHub");

  return (
    <section id="contact" className="scroll-mt-24">
      <Container className="py-24 md:py-36">
        <SectionReveal className="space-y-5">
          <SectionLabel index="07" label="CONTACT" />
          <CodeCommentLabel>{"// contact endpoint ready"}</CodeCommentLabel>
          <h2 className="max-w-3xl font-display text-4xl leading-[1.08] font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Let&apos;s build something reliable.
          </h2>
          <p className="max-w-xl pt-3 leading-relaxed text-secondary">{contactConfig.body}</p>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mt-12">
          <ApiContactPanel
            emailHref={emailHref}
            resumePath={siteConfig.resumePath}
            linkedInHref={linkedIn && !isPlaceholder(linkedIn.href) ? linkedIn.href : undefined}
            gitHubHref={gitHub && !isPlaceholder(gitHub.href) ? gitHub.href : undefined}
          />
        </SectionReveal>
      </Container>
    </section>
  );
}
