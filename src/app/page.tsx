import type { Metadata } from "next";
import Home from "./home-client";

export const metadata: Metadata = {
  title: "Spectrum Cheat",
  description:
    "Discover Spectrum Cheat, a premium Roblox cheat experience built for smooth performance, cleaner execution, and dependable daily use. Explore supported games, preview key features, browse live status coverage, and access a long-running platform shaped by real updates, real support, and a sharper overall standard.",
};

// Live Discord presence via the official invite API (no key needed).
async function getDiscord(): Promise<{ online: number | null; members: number | null }> {
  try {
    const res = await fetch(
      "https://discord.com/api/v9/invites/C3MpUNwsDU?with_counts=true",
      { next: { revalidate: 300 }, headers: { "User-Agent": "Mozilla/5.0" } }
    );
    if (!res.ok) return { online: null, members: null };
    const d = await res.json();
    return {
      online: d?.approximate_presence_count ?? null,
      members: d?.approximate_member_count ?? null,
    };
  } catch {
    return { online: null, members: null };
  }
}

export default async function HomePage() {
  const discord = await getDiscord();
  return <Home discordOnline={discord.online} discordMembers={discord.members} />;
}
