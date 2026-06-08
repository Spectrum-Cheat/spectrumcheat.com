import type { Metadata } from "next";
import { AboutZpu } from "./about-client";

export const metadata: Metadata = {
  title: "ZPU — About",
  description: "Get to know ZPU (xZPUHigh) — the solo creator behind Spectrum Cheat.",
  alternates: { canonical: "https://spectrumcheat.com/zpu" },
  openGraph: {
    title: "ZPU — About",
    description: "Get to know ZPU (xZPUHigh) — the solo creator behind Spectrum Cheat.",
    url: "https://spectrumcheat.com/zpu",
  },
};

// Live YouTube subscriber count (no API key — third-party live counter).
async function getYouTubeSubs(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://api.socialcounts.org/youtube-live-subscriber-count/UCgMktyw9e816q0GzhBL2dnQ",
      { next: { revalidate: 300 }, headers: { "User-Agent": "Mozilla/5.0" } }
    );
    if (!res.ok) return null;
    const d = await res.json();
    return d?.counters?.api?.subscriberCount ?? d?.counters?.estimation?.subscriberCount ?? null;
  } catch {
    return null;
  }
}

// Live Discord member count via the official invite API (no key needed).
async function getDiscordMembers(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://discord.com/api/v9/invites/hackerclub?with_counts=true",
      { next: { revalidate: 300 }, headers: { "User-Agent": "Mozilla/5.0" } }
    );
    if (!res.ok) return null;
    const d = await res.json();
    return d?.approximate_member_count ?? null;
  } catch {
    return null;
  }
}

export default async function AboutZpuPage() {
  const [ytSubs, discordMembers] = await Promise.all([getYouTubeSubs(), getDiscordMembers()]);
  return <AboutZpu ytSubs={ytSubs} discordMembers={discordMembers} />;
}
