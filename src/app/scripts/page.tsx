import type { Metadata } from "next";
import ScriptsPage from "./scripts-client";

export const metadata: Metadata = {
  title: "Scripts",
  description:
    "Browse the Spectrum script library, copy the main loader, and jump straight into supported Roblox games from one clean hub. Check which titles are currently working, which ones are waiting for updates, and keep the full Spectrum lineup within easy reach.",
};

export default function ScriptsRoute() {
  return <ScriptsPage />;
}
