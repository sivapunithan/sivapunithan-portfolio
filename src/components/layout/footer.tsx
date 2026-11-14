import Link from "next/link";
import { BackToTop, FooterCta } from "@/components/layout/footer-cta";
import { ScrollRotate } from "@/components/motion/scroll-rotate";
import { Container } from "@/components/ui/container";
import { Gear } from "@/components/ui/gear";
import { Ornament } from "@/components/ui/ornament";
import { navigation, siteConfig, socialLinks } from "@/data/portfolio";

/** A meshed pair of scroll-driven gears sitting half off the right edge of the invitation. */
function FooterGears() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 text-accent/25">
      <ScrollRotate
        ratio={0.05}
        className="absolute -right-40 -top-24 h-[30rem] w-[30rem] md:-right-24 md:h-[38rem] md:w-[38rem]"
      >
        <Gear teeth={24} spokes={8} className="h-full w-full" />
      </ScrollRotate>
      <ScrollRotate
        ratio={-0.1}
        className="absolute -bottom-20 right-[13rem] hidden h-[15rem] w-[15rem] md:block lg:right-[25.5rem] lg:h-[19rem] lg:w-[19rem]"
      >
        <Gear teeth={12} spokes={5} className="h-full w-full" />
      </ScrollRotate>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-background-deep">
      <FooterCta decoration={<FooterGears />} />

      <Container className="py-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl tracking-[-0.01em] text-primary">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-secondary">
              {siteConfig.role}. {siteConfig.location}.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="label text-muted">Pages</p>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline pb-0.5 text-[0.9375rem] text-secondary transition-colors duration-300 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label text-muted">Elsewhere</p>
            <ul className="mt-5 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="link-underline pb-0.5 text-[0.9375rem] text-secondary transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Ornament className="mt-14" />

        <div className="mt-10 flex flex-col gap-6 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {year} {siteConfig.name}. Set in Fraunces, composed in Next.js.
          </p>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}
