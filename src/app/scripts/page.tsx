import type { Metadata } from "next";
import ScriptsPage from "./scripts-client";

export const metadata: Metadata = {
  title: "Scripts — Spectrum Roblox Script Library",
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
    title: "Scripts — Spectrum Roblox Script Library",
    description:
      "Browse the Spectrum script library, copy the main loader, and jump into supported Roblox games from one clean hub.",
    url: "https://spectrumcheat.com/scripts",
  },
};

export default function ScriptsRoute() {
  return <ScriptsPage />;
}
