import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingHeader } from "../../../_components/marketing-header";
import { SiteFooter } from "../../../_components/site-footer";
import { CopyButtons, RawHeader } from "../../[slug]/copy-buttons";
import { LuaCode } from "../../[slug]/lua-code";
import { SlugHero } from "../../[slug]/slug-hero";
import { UnlockGate } from "../../[slug]/unlock-gate";
import { DescriptionHeading } from "../../[slug]/slug-labels";
import { AdBanner } from "../../../_components/ad-banner";
import { getLatestVideos } from "../../_data/youtube";
import { CUSTOM_RECOMMEND } from "../../_data/recommend";

export async function generateStaticParams() {
  return CUSTOM_RECOMMEND.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const script = CUSTOM_RECOMMEND.find((c) => c.id === id);
  if (!script) return { title: "Script Not Found" };
  return {
    title: `${script.title} — Blox Cheat`,
    description: script.features?.slice(0, 160) ?? `${script.title} script for ${script.game}`,
  };
}

export default async function RecommendScriptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const script = CUSTOM_RECOMMEND.find((c) => c.id === id);
  if (!script) notFound();

  const videos = await getLatestVideos();

  return (
    <>
      <UnlockGate video={videos.latest} video2={videos.previous} />
      <div className="noise-overlay" />
      <MarketingHeader homeBrandHref="/" />
      <main className="subpage">
        <SlugHero />

        <section className="subpage-content">
          <div className="subpage-inner">

            <div className="sdetail-top">
              {/* Thumbnail */}
              <div className="sdetail-thumb-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={script.image} alt={script.title} className="sdetail-thumb-img" />
                <div className="sdetail-thumb-badges">
                  <span className="blox-badge blox-badge--verified">ZPU Pick</span>
                  {script.key && <span className="blox-badge blox-badge--key">Key System</span>}
                  {script.universal && <span className="blox-badge blox-badge--universal">Universal</span>}
                </div>
              </div>

              {/* Info */}
              <div className="sdetail-info">
                <h1 className="sdetail-title">{script.title}</h1>
                <p className="sdetail-game">{script.game}</p>

                <div className="sdetail-meta">
                  {script.provider && (
                    <span className="sdetail-meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                      {script.provider}
                      <span style={{ color: "var(--accent-2)", fontSize: "0.7rem" }}>✓</span>
                    </span>
                  )}
                  {typeof script.views === "number" && (
                    <span className="sdetail-meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {script.views.toLocaleString()}
                    </span>
                  )}
                </div>

                <CopyButtons script={script.script} title={script.title} />

                {script.youtubeUrl && (
                  <a href={script.youtubeUrl} target="_blank" rel="noreferrer" className="sdetail-key-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z" />
                    </svg>
                    Watch on YouTube
                  </a>
                )}
              </div>
            </div>

            {/* Description / Features */}
            {script.features && (
              <div className="sdetail-section">
                <DescriptionHeading />
                <div className="sdetail-card">
                  <p className="sdetail-desc" style={{ whiteSpace: "pre-wrap" }}>{script.features}</p>
                </div>
              </div>
            )}

            {/* Ad */}
            <div className="sdetail-section ad-slot">
              <AdBanner size="300x250" />
            </div>

            {/* Script code */}
            <div className="sdetail-section">
              <RawHeader script={script.script} title={script.title} />
              <LuaCode code={script.script} />
            </div>

          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
