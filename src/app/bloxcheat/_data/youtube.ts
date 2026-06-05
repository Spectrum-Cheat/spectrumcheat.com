// ════════════════════════════════════════════════════════════════
//  YouTube unlock-gate config
//  Edit this file to change the channel shown in the
//  "complete actions to unlock script" popup.
// ════════════════════════════════════════════════════════════════

export const YOUTUBE_CONFIG = {
  // Channel handle (e.g. "@xZPUHigh")
  channelHandle: "@xZPUHigh",

  // Channel ID (UCxxxx). Used to auto-fetch the LATEST video via RSS.
  // Find it on the channel page source (look for "externalId").
  channelId: "UCgMktyw9e816q0GzhBL2dnQ",

  // Channel URL — opened for the "Subscribe" step.
  // ?sub_confirmation=1 makes YouTube pop the subscribe confirmation.
  channelUrl: "https://www.youtube.com/@xZPUHigh?sub_confirmation=1",

  // Fallback video used if the latest video can't be fetched.
  // The "Watch" + "Like & Comment" steps normally use the latest
  // uploaded video automatically (pulled via RSS).
  fallbackVideoUrl: "https://www.youtube.com/@xZPUHigh/videos",

  // How long (seconds) the user must stay on YouTube for each step to count.
  watchSeconds: 5,
  subscribeSeconds: 5,
  likeSeconds: 5,

  // How long (hours) an unlock is remembered before the gate shows again.
  rememberHours: 6,
};

export interface LatestVideo {
  url: string;
  id: string | null;
  title: string | null;
  thumbnail: string | null;
}

// ── Fetch the latest video from the channel's public RSS feed ──
// No API key / quota needed. Cached on the server (revalidate: 1h).
export async function getLatestVideo(): Promise<LatestVideo> {
  const fallback: LatestVideo = {
    url: YOUTUBE_CONFIG.fallbackVideoUrl,
    id: null,
    title: null,
    thumbnail: null,
  };
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CONFIG.channelId}`,
      {
        next: { revalidate: 3600 },
        headers: { "User-Agent": "Mozilla/5.0" },
      }
    );
    if (!res.ok) return fallback;
    const xml = await res.text();
    const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/)?.[1] ?? "";
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? null;
    const title = entry.match(/<title>([^<]+)<\/title>/)?.[1] ?? null;
    if (!id) return fallback;
    return {
      url: `https://www.youtube.com/watch?v=${id}`,
      id,
      title,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  } catch {
    return fallback;
  }
}
