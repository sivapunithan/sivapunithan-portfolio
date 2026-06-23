import { siteConfig, socialLinks } from "@/data/portfolio";
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
        <div className="space-y-1.5">
          <p className="font-mono text-xs tracking-[0.14em] text-secondary">
            {siteConfig.name} <span className="text-muted">· {year}</span>
          </p>
          <p className="font-mono text-[11px] tracking-[0.08em] text-muted">
            Built with Next.js and TypeScript
          </p>
        </div>

        <ul className="flex items-center gap-6">
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
      </Container>
    </footer>
  );
}
