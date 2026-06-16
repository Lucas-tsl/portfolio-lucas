import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ErrorBoundary } from "@/components/providers/error-boundary";
import { CommandPaletteProvider } from "@/context/command-palette";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CommandPalette } from "@/components/shared/command-palette";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://lucastroteseil.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Lucas Troteseil | Portfolio",
    template: "%s | Lucas Troteseil",
  },
  description:
    "Chef de projet Data / IA et Développeur Web basé à Bordeaux. Expertise Next.js, WordPress, SEO technique et IA appliquée.",
  authors: [{ name: "Lucas Troteseil", url: BASE_URL }],
  creator: "Lucas Troteseil",
  keywords: [
    "Lucas Troteseil",
    "Chef de projet",
    "Développeur Web",
    "Next.js",
    "WordPress",
    "SEO",
    "Intelligence Artificielle",
    "Bordeaux",
    "Portfolio",
  ],
  openGraph: {
    title: "Lucas Troteseil | Portfolio",
    description:
      "Chef de projet Data / IA et Développeur Web basé à Bordeaux. Expertise Next.js, WordPress, SEO technique et IA appliquée.",
    url: BASE_URL,
    siteName: "Lucas Troteseil",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Troteseil | Portfolio",
    description:
      "Chef de projet Data / IA et Développeur Web basé à Bordeaux. Expertise Next.js, WordPress, SEO technique et IA appliquée.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Skip navigation — accessibility */}
        <a
          href="#main-content"
          className="skip-link sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-zinc-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-900"
        >
          Aller au contenu principal
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MotionConfig reducedMotion="user">
            <CommandPaletteProvider>
              <div className="flex min-h-screen flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
                <Navbar />
                <CommandPalette />
                <ErrorBoundary>
                  <div id="main-content" className="flex-1 w-full" tabIndex={-1}>
                    {children}
                  </div>
                </ErrorBoundary>
                <Footer />
              </div>
            </CommandPaletteProvider>
          </MotionConfig>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
