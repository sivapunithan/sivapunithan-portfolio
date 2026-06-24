import { siteConfig, socialLinks } from "@/data/portfolio";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { isPlaceholder } from "@/lib/utils";

/** Minimal footer: thin top divider, mono metadata, muted links. */
export function Footer() {
  const year = new Date().getFullYear();
  const visibleLinks = socialLinks.filter((link) => !isPlaceholder(link.href));

  return (
    <footer className="border-t border-edge">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <BrandLogo
            href="#intro"
            label={`${siteConfig.name} portfolio home`}
            className="items-center"
            showTooltip={false}
          />
          <p className="font-mono text-[11px] tracking-[0.08em] text-muted">
            Built with Next.js and TypeScript
          </p>
        </div>

        <div className="space-y-2 md:text-right">
          <p className="font-mono text-xs tracking-[0.14em] text-secondary">
            {siteConfig.name} <span className="text-muted">· {year}</span>
          </p>

          <ul className="flex flex-wrap items-center gap-6 md:justify-end">
            {visibleLinks.map((link) => (
              <li key={link.label}>
                <TextLink
                  href={link.href}
                  mono
                  external={!link.href.startsWith("mailto:")}
                  className="text-muted hover:text-secondary"
                >
                  {link.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
