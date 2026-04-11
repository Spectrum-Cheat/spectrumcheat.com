import type { Metadata } from "next";
import Home from "./home-client";

export const metadata: Metadata = {
  title: "Spectrum Cheat",
  description:
    "Discover Spectrum Cheat, a premium Roblox cheat experience built for smooth performance, cleaner execution, and dependable daily use. Explore supported games, preview key features, browse live status coverage, and access a long-running platform shaped by real updates, real support, and a sharper overall standard.",
};

export default function HomePage() {
  return <Home />;
}
