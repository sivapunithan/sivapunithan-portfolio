import { Container } from "@/components/ui/container";
import { siteConfig, socialLinks } from "@/data/portfolio";
import { isPlaceholder } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-edge-subtle">
      <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {siteConfig.name} · {year}
        </p>
        <ul className="flex flex-wrap gap-6">
          {socialLinks.filter((link) => !isPlaceholder(link.href)).map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="link-underline font-mono text-[10px] uppercase tracking-[0.16em] text-secondary hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
