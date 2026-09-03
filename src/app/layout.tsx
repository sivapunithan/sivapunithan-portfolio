import type { Metadata } from "next";
import "./globals.css";
import { CodeEditorIntro } from "@/components/intro/code-editor-intro";
import { ActiveSectionProvider } from "@/components/layout/active-section-provider";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { MotionProvider } from "@/components/motion/motion-provider";
import { navigation, siteConfig } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/utils";

const siteUrl = getSiteUrl(siteConfig.domain);
const siteTitle = `${siteConfig.name} | ${siteConfig.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteConfig.description,
  icons: { icon: "/icon", apple: "/apple-icon" },
  verification: { google: "Kd8zYLbOEBvulJNb744cF43jZdC4AxNgioeAJxRvp8Y" },
  openGraph: {
    title: siteTitle,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteConfig.description },
};

const sectionIds = navigation.map((item) => item.href.slice(1));

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <CodeEditorIntro />
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <ActiveSectionProvider sectionIds={sectionIds}>
            <header className="site-header">
              <Navbar />
            </header>
            {children}
            <Footer />
          </ActiveSectionProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
