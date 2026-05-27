import type { Metadata } from "next";
import { MarketingHeader } from "../../_components/marketing-header";
import { SiteFooter } from "../../_components/site-footer";
import { BloxStatsBar } from "../blox-stats-bar";
import { RecommendGrid, type RecommendScript } from "./recommend-grid";
import { RECOMMEND_SCRIPTS } from "../_data/recommend";
import Link from "next/link";

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

  const scripts = results.filter(Boolean) as RecommendScript[];

  return (
    <>
      <div className="noise-overlay" />
      <MarketingHeader homeBrandHref="/" />
      <main className="subpage">

        {/* Mini hero */}
        <section className="subpage-hero">
          <div className="hero-grid-lines subpage-grid" />
          <div className="subpage-inner">
            <div className="hero-badge">
              <span className="badge-dot" />
              <span>Spectrum Pick</span>
            </div>
            <h1 className="subpage-title">Recommend</h1>
            <p className="subpage-subtitle">
              Scripts recommend by ZPU — watch the showcase features on Youtube{" "}
              <a href="https://www.youtube.com/@xZPUHigh" target="_blank" rel="noreferrer"
                style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
                xZPUHigh
              </a>
            </p>
            <div className="subpage-actions">
              <Link href="/bloxcheat" className="btn-outline">Back to Blox Cheat</Link>
              <Link href="/bloxcheat?sortBy=views&sortOrder=desc" className="btn-primary">Trending</Link>
            </div>
          </div>
        </section>

        <section className="subpage-content">
          <div className="subpage-inner">

            <BloxStatsBar
              query=""
              sortBy=""
              sortOrder=""
              scriptCount={scripts.length}
            />

            <RecommendGrid scripts={scripts} />

          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
