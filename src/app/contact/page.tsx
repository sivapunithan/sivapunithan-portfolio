import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";
import { PageHero } from "@/components/ui/page-hero";
import { contactHero } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Contact",
  description: contactHero.body,
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero {...contactHero} />
      <ContactSection />
    </main>
  );
}
