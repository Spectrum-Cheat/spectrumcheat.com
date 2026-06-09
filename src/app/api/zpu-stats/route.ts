// Live stats for the /zpu page — fetched server-side to avoid CORS.
// Not cached (Route Handlers are dynamic by default), so each poll is fresh.

async function getYouTubeSubs(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://api.socialcounts.org/youtube-live-subscriber-count/UCgMktyw9e816q0GzhBL2dnQ",
      { cache: "no-store", headers: { "User-Agent": "Mozilla/5.0" } }
    );
    if (!res.ok) return null;
    const d = await res.json();
    return d?.counters?.estimation?.subscriberCount ?? d?.counters?.api?.subscriberCount ?? null;
  } catch {
    return null;
  }
}

async function getDiscordMembers(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://discord.com/api/v9/invites/hackerclub?with_counts=true",
      { cache: "no-store", headers: { "User-Agent": "Mozilla/5.0" } }
    );
    if (!res.ok) return null;
    const d = await res.json();
    return d?.approximate_member_count ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  const [ytSubs, discordMembers] = await Promise.all([getYouTubeSubs(), getDiscordMembers()]);
  return Response.json(
    { ytSubs, discordMembers },
    { headers: { "Cache-Control": "no-store" } }
  );
}
