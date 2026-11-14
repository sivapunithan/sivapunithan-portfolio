import type { Metadata } from "next";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/geist/index.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Preloader } from "@/components/layout/preloader";
import { MotionProvider } from "@/components/motion/motion-provider";
import { siteConfig } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/utils";

const siteUrl = getSiteUrl(siteConfig.domain);
const siteTitle = `${siteConfig.name} | ${siteConfig.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s | ${siteConfig.name}` },
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

/**
 * Runs before first paint: marks visits that skip the preloader (already seen this
 * session, or reduced motion) so the server-rendered overlay never flashes.
 */
const introScript = `try{var d=document.documentElement;if(sessionStorage.getItem("sp-intro")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="seen"}}catch(e){document.documentElement.dataset.intro="seen"}`;

/** Applies the saved theme (default light) before first paint so there is no flash. */
const themeScript = `try{var t=localStorage.getItem("sp-theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`.preloader,.page-curtain{display:none}[style*="opacity:0"]{opacity:1!important;transform:none!important}.split-word>span{transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>
          <Preloader />
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
