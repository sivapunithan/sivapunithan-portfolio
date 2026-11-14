import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { GithubActivity } from "@/components/sections/github-activity";
import { Container } from "@/components/ui/container";
import { ContributionGraph } from "@/components/ui/contribution-graph";
import { LeetCodeStats } from "@/components/ui/leetcode-stats";
import { CopyButton } from "@/components/ui/copy-button";
import { ArrowUpRight } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/section-label";
import { contactConfig, siteConfig, socialLinks } from "@/data/portfolio";

/** The address in very large type, the other ways in, and what he has been pushing lately. */
export function ContactSection() {
  const channels = [
    ...socialLinks.filter((link) => link.label !== "Email"),
    { label: "Résumé", href: siteConfig.resumePath, handle: "PDF" },
  ];

  return (
    <section>
      <Container className="py-24 md:py-36">
        <Reveal>
          <SectionLabel index="01" label="Get in touch" />
        </Reveal>
        <SplitText
          as="h2"
          text={contactConfig.heading}
          className="display-lg mt-8 max-w-[18ch] text-primary"
        />
        <Reveal delay={0.15} className="mt-7 max-w-xl">
          <p className="text-lg leading-relaxed text-secondary">{contactConfig.body}</p>
        </Reveal>

        <Reveal delay={0.25} className="mt-14 border-y border-line py-10 md:py-14">
          <a
            href={`mailto:${contactConfig.email}`}
            className="group inline-flex max-w-full items-baseline gap-4 font-display text-[clamp(1.45rem,5.2vw,4.5rem)] font-light leading-none tracking-[-0.03em] text-primary transition-colors duration-500 hover:text-accent-bright"
          >
            <span className="link-underline break-all pb-2">{contactConfig.email}</span>
            <ArrowUpRight className="h-[0.5em] w-[0.5em] shrink-0 text-accent transition-transform duration-700 ease-expo group-hover:-translate-y-1.5 group-hover:translate-x-1.5" />
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <CopyButton value={contactConfig.email} label="Copy address" />
            <p className="label flex items-center gap-3 text-secondary">
              <span aria-hidden="true" className="pulse-dot" />
              {siteConfig.availability}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <ContributionGraph username={siteConfig.githubUsername} />
        </Reveal>

        <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="label text-muted">Elsewhere</p>
            </Reveal>
            <ul className="mt-6 border-t border-line">
              {channels.map((channel, index) => (
                <li key={channel.label}>
                  <Reveal delay={index * 0.07} y={14}>
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-row group relative flex items-center justify-between gap-6 border-b border-line py-6"
                    >
                      <span className="relative block transition-transform duration-700 ease-expo group-hover:translate-x-4">
                        <span className="block font-display text-3xl font-light tracking-[-0.02em] text-primary transition-colors duration-500 group-hover:text-accent-bright">
                          {channel.label}
                        </span>
                        <span className="mt-1.5 block text-[0.9375rem] text-secondary">
                          {channel.handle}
                        </span>
                      </span>
                      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent transition-all duration-700 ease-expo group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal delay={0.2} className="mt-10">
              <p className="label text-muted">Based in</p>
              <p className="mt-3 font-display text-2xl font-light tracking-[-0.01em] text-primary">
                {siteConfig.location}
              </p>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal y={40}>
              <GithubActivity username={siteConfig.githubUsername} />
            </Reveal>
            <Reveal y={40} delay={0.1}>
              <LeetCodeStats username={siteConfig.leetcodeUsername} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
