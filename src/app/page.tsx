import { HeroSection } from "@/components/sections/hero-section";
import {
  AboutTeaserSection,
  FeaturedWorkSection,
  StackMarqueeSection,
  StatementSection,
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <main id="main">
      <HeroSection />
      <StatementSection />
      <FeaturedWorkSection />
      <StackMarqueeSection />
      <AboutTeaserSection />
    </main>
  );
}
