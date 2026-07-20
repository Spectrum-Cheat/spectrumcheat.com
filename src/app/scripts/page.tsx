import type { Metadata } from "next";
import ScriptsPage from "./scripts-client";

export const metadata: Metadata = {
  title: "Script Library",
  description:
    "Browse the Spectrum script library, copy the main loader, and jump straight into supported Roblox games from one clean hub. Check which titles are currently working, which ones are waiting for updates, and keep the full Spectrum lineup within easy reach.",
  keywords: [
    "Spectrum scripts",
    "Roblox script library",
    "Roblox script loader",
    "working Roblox scripts",
    "Spectrum Cheat",
  ],
  alternates: { canonical: "https://spectrumcheat.com/scripts" },
  openGraph: {
    type: "website",
    siteName: "Spectrum Cheat",
    title: "Script Library | Spectrum Cheat",
    description:
      "Browse the Spectrum script library, copy the main loader, and jump into supported Roblox games from one clean hub.",
    url: "https://spectrumcheat.com/scripts",
    images: [{ url: "/images/Spectrum Cheat Banner.png", width: 2000, height: 600, alt: "Spectrum Cheat — Script Library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Script Library | Spectrum Cheat",
    description: "Browse the Spectrum script library and jump into supported Roblox games.",
    images: ["/images/Spectrum Cheat Banner.png"],
  },
};

export default function ScriptsRoute() {
  return <ScriptsPage />;
}
