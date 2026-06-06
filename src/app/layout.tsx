import type { Metadata } from "next";
import { DM_Mono, Instrument_Serif, Syne } from "next/font/google";
import "./globals.css";
import { LanguagePopup } from "./_components/language-popup";
import { LangProvider } from "./_i18n/context";
import { AdScripts } from "./_components/ad-scripts";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spectrumcheat.com"),
  title: {
    default: "Spectrum Cheat",
    template: "%s | Spectrum Cheat",
  },
  description:
    "Spectrum Cheat is a premium Roblox cheat suite built for smooth performance, reliable daily use, and a sharper overall experience. Explore supported games, track live script status, unlock access through a cleaner key system, and stay connected to a long-running community shaped by steady updates, fast support, and years of trusted service.",
  keywords: [
    "Spectrum Cheat",
    "Spectrum Scripts",
    "Roblox cheat",
    "Roblox scripts",
    "Roblox exploit",
    "Roblox script hub",
    "Spectrum key",
    "Spectrum status",
  ],
  alternates: {
    canonical: "https://spectrumcheat.com",
  },
  openGraph: {
    type: "website",
    url: "https://spectrumcheat.com",
    siteName: "Spectrum Cheat",
    title: "Spectrum Cheat - Premium Roblox Cheat Suite",
    description:
      "Premium Roblox cheat suite built for smooth performance, reliable daily use, and a sharper overall experience.",
    images: [
      {
        url: "/images/Spectrum Cheat Banner.png",
        width: 2000,
        height: 600,
        alt: "Spectrum Cheat banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectrum Cheat - Premium Roblox Cheat Suite",
    description:
      "Premium Roblox cheat suite built for smooth performance, reliable daily use, and a sharper overall experience.",
    images: ["/images/Spectrum Cheat Banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6153597331765787"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <LangProvider>
          <div id="google_translate_element" style={{ display: "none" }} />
          <LanguagePopup />
          {children}
          <AdScripts />
        </LangProvider>
      </body>
    </html>
  );
}
