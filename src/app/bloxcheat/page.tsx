import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "../_components/marketing-header";
import { SearchBar } from "./search-bar";
import { ScriptsGrid } from "./scripts-grid";
import { SiteFooter } from "../_components/site-footer";

export const dynamic = "force-dynamic";

interface ScriptGame {
  name: string;
  imageUrl?: string;
}

interface Script {
  _id: string;
  title: string;
  game: ScriptGame;
  views: number;
  slug: string;
  image?: string;
  isPatched: boolean;
  isUniversal: boolean;
  key: boolean;
  verified?: boolean;
  scriptType?: string;
  likeCount?: number;
  createdAt: string;
  updatedAt: string;
}

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "application/json, */*",
};

async function fetchInitial(query: string, strict: boolean): Promise<{ scripts: Script[]; hasMore: boolean }> {
  try {
    let url: string;
    if (query) {
      const params = new URLSearchParams({ q: query, page: "1" });
      if (strict) params.set("mode", "strict");
      url = `https://scriptblox.com/api/script/search?${params}`;
    } else {
      url = `https://scriptblox.com/api/script/fetch?page=1&max=20`;
    }
    const res = await fetch(url, { next: { revalidate: 300 }, headers: HEADERS });
    if (!res.ok) return { scripts: [], hasMore: false };
    const data = await res.json();
    return {
      scripts: data?.result?.scripts ?? [],
      hasMore: data?.result?.nextPage != null,
    };
  } catch {
    return { scripts: [], hasMore: false };
  }
}

export const metadata: Metadata = {
  title: "Blox Cheat",
  description: "Search and discover Roblox scripts. Auto farms, ESP, aimbots and more.",
};

export default async function BloxCheatPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params     = await searchParams;
  const query      = params.q?.trim() ?? "";
  const verified   = params.verified === "1";
  const universal  = params.universal === "1";
  const patched    = params.patched === "1";
  const keySystem  = params.key === "1";
  const scriptType = params.type ?? "";
  const sortBy     = params.sortBy ?? "";
  const sortOrder  = params.sortOrder ?? "";
  const strict     = params.strict === "1";

  const searchParamsStr = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined) as [string, string][]
  ).toString();

  const { scripts, hasMore } = await fetchInitial(query, strict);

  const label = query
    ? `Results for "${query}"`
    : sortBy === "views" && sortOrder === "desc"
    ? "Trending Scripts"
    : "Recent Scripts";

  return (
    <>
      <div className="noise-overlay" />
      <MarketingHeader homeBrandHref="/" />
      <main className="subpage">
        <section className="subpage-hero">
          <div className="hero-grid-lines subpage-grid" />
          <div className="subpage-inner">
            <div className="hero-badge">
              <span className="badge-dot" />
              <span>Spectrum Cheat // Blox Cheat</span>
            </div>
            <h1 className="subpage-title">Blox Cheat</h1>
            <p className="subpage-subtitle">
              Find the best Roblox scripts for any game. Auto farms, ESP, aimbots and more — updated daily by the community.
            </p>
            <div className="subpage-actions">
              <Link href="/" className="btn-outline">Back Home</Link>
              <Link href="/bloxcheat?sortBy=views&sortOrder=desc" className="btn-primary">
                Trending
              </Link>
            </div>
          </div>
        </section>

        <section className="subpage-content">
          <div className="subpage-inner">

            <SearchBar defaultValue={query} searchParamsStr={searchParamsStr} />

            <div className="blox-stats-bar">
              <span className="blox-stats-item">
                <span className="badge-dot" />
                {label}
              </span>
              {scripts.length > 0 && (
                <span className="blox-stats-count">{scripts.length} scripts</span>
              )}
            </div>

            <ScriptsGrid
              initialScripts={scripts}
              initialHasMore={hasMore}
              query={query}
              strict={strict}
              verified={verified}
              universal={universal}
              patched={patched}
              keySystem={keySystem}
              scriptType={scriptType}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />

          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
