import type { Metadata } from "next";
import { MarketingHeader } from "../../_components/marketing-header";
import { SiteFooter } from "../../_components/site-footer";
import { BloxStatsBar } from "../blox-stats-bar";
import { RecommendGrid, type RecommendScript } from "./recommend-grid";
import { RecommendHero } from "./recommend-hero";
import { RECOMMEND_SCRIPTS, CUSTOM_RECOMMEND } from "../_data/recommend";
import { AdNative } from "../../_components/ad-native";

export const metadata: Metadata = {
  title: "Recommend — Blox Cheat",
  description: "Scripts handpicked by Spectrum — featured in our YouTube videos.",
};

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "application/json, */*",
};

async function fetchScriptBySlug(slug: string): Promise<RecommendScript | null> {
  try {
    const res = await fetch(`https://scriptblox.com/api/script/${slug}`, {
      next: { revalidate: 300 },
      headers: HEADERS,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.script ?? null;
  } catch {
    return null;
  }
}

export default async function RecommendPage() {
  // Fetch all recommended scripts in parallel
  const results = await Promise.all(
    RECOMMEND_SCRIPTS.map(async (entry) => {
      const script = await fetchScriptBySlug(entry.slug);
      if (!script) return null;
      return { ...script, youtubeUrl: entry.youtubeUrl } as RecommendScript;
    })
  );

  const fetched = results.filter(Boolean) as RecommendScript[];

  // Custom (non-ScriptBlox) scripts → map into the same card shape.
  const custom: RecommendScript[] = CUSTOM_RECOMMEND.map((c) => ({
    _id: `custom-${c.id}`,
    title: c.title,
    game: { name: c.game },
    views: c.views ?? 0,
    slug: c.id,
    image: c.image,
    isPatched: false,
    isUniversal: c.universal ?? false,
    key: c.key ?? false,
    verified: c.verified ?? true,
    scriptType: "free",
    likeCount: c.likeCount ?? 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    youtubeUrl: c.youtubeUrl,
    customHref: `/bloxcheat/recommend/${c.id}`,
  }));

  // Custom picks first, then ScriptBlox picks.
  const scripts = [...custom, ...fetched];

  return (
    <>
      <div className="noise-overlay" />
      <MarketingHeader homeBrandHref="/" />
      <main className="subpage">

        {/* Mini hero */}
        <RecommendHero />

        <section className="subpage-content">
          <div className="subpage-inner">

            <BloxStatsBar
              query=""
              sortBy=""
              sortOrder=""
              scriptCount={scripts.length}
            />

            <RecommendGrid scripts={scripts} />

            <AdNative className="ad-slot" />

          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
