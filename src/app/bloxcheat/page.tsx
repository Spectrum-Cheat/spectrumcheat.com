import type { Metadata } from "next";
import { MarketingHeader } from "../_components/marketing-header";
import { SearchBar } from "./search-bar";
import { ScriptsGrid } from "./scripts-grid";
import { SiteFooter } from "../_components/site-footer";
import { BloxHeroSection } from "./blox-hero-section";
import { BloxStatsBar } from "./blox-stats-bar";

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
    console.log("[bloxcheat] fetching:", url);
    const res = await fetch(url, { cache: "no-store", headers: HEADERS });
    if (!res.ok) {
      console.error("[bloxcheat] fetch failed:", res.status);
      return { scripts: [], hasMore: false };
    }
    const data = await res.json();
    return {
      scripts: data?.result?.scripts ?? [],
      hasMore: data?.result?.nextPage != null,
    };
  } catch (err) {
    console.error("[bloxcheat] fetch error:", err);
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

  return (
    <>
      <div className="noise-overlay" />
      <MarketingHeader homeBrandHref="/" />
      <main className="subpage">
        <BloxHeroSection />

        <section className="subpage-content">
          <div className="subpage-inner">

            <SearchBar defaultValue={query} searchParamsStr={searchParamsStr} />

            <BloxStatsBar
              query={query}
              sortBy={sortBy}
              sortOrder={sortOrder}
              scriptCount={scripts.length}
            />

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
