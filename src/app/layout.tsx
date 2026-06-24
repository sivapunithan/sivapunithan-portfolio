import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { ActiveSectionProvider } from "@/components/layout/active-section-provider";
import { BootScreen } from "@/components/layout/boot-screen";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { StatusBar } from "@/components/layout/status-bar";
import { WorkspaceBar } from "@/components/layout/workspace-bar";
import { WorkspaceGutter } from "@/components/layout/workspace-gutter";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { MotionProvider } from "@/components/motion/motion-provider";
import { gutterSections, siteConfig } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/utils";

/**
 * FONT SYSTEM - three roles, exposed as CSS variables consumed in globals.css:
 *
 *   --font-display  large hero typography and major section headings
 *   --font-body     paragraphs, buttons, navigation, descriptions, UI labels
 *   --font-mono     section numbers, project indexes, breadcrumbs, metadata,
 *                   status labels, technical stack labels
 *
 * The display role is designed for a premium local variable font loaded with
 * next/font/local from src/assets/fonts/display-variable.woff2. That file is
 * intentionally not bundled (font licensing); until you add one, Manrope
 * doubles as the display face so the production build never breaks.
 *
 * To activate a local display font (see src/assets/fonts/README.md):
 *   1. Place a licensed variable font at src/assets/fonts/display-variable.woff2
 *   2. Replace the `display` constant below with:
 *
 *      import localFont from "next/font/local";
 *      const display = localFont({
 *        src: "../assets/fonts/display-variable.woff2",
 *        variable: "--font-display",
 *        display: "swap",
 *      });
 */
const display = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = getSiteUrl(siteConfig.domain);
const siteTitle = "Sivapunithan S | Java Developer";
const siteDescription =
  "Java, Spring Boot, SQL, and backend-focused full-stack developer portfolio.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  verification: {
    google: "Kd8zYLbOEBvulJNb744cF43jZdC4AxNgioeAJxRvp8Y",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

const sectionIds = gutterSections.map((section) => section.href.replace("#", ""));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <MotionProvider>
          <BootScreen />
          <CustomCursor />
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <ActiveSectionProvider sectionIds={sectionIds}>
            <header className="sticky top-0 z-50 border-b border-edge bg-background">
              <WorkspaceBar />
              <Navbar />
            </header>
            <WorkspaceGutter />
            <div className="lg:pl-16">
              {children}
              <Footer />
              <div className="h-7" aria-hidden="true" />
            </div>
            <StatusBar />
          </ActiveSectionProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
