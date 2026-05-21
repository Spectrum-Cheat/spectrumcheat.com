import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingHeader } from "../../_components/marketing-header";
import { SiteFooter } from "../../_components/site-footer";
import { CopyButtons, RawHeader } from "./copy-buttons";
import { LuaCode } from "./lua-code";

interface ScriptDetail {
  _id: string;
  title: string;
  game: { _id: string; gameId?: number; name: string; imageUrl?: string };
  features?: string;
  tags?: string[];
  script: string;
  owner?: { _id: string; username: string; verified?: boolean; profilePicture?: string };
  slug: string;
  verified: boolean;
  scriptType: string;
  isUniversal: boolean;
  isPatched: boolean;
  key?: boolean;
  image?: string;
  likeCount: number;
  dislikeCount: number;
  createdAt: string;
  lastBump?: string;
}

async function fetchScript(slug: string): Promise<ScriptDetail | null> {
  try {
    const res = await fetch(`https://scriptblox.com/api/script/${slug}`, {
      next: { revalidate: 300 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "application/json, */*",
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.script ?? null;
  } catch {
    return null;
  }
}

function getImageUrl(image?: string): string | null {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return `https://scriptblox.com${image}`;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const script = await fetchScript(slug);
  if (!script) return { title: "Script Not Found" };
  return {
    title: `${script.title} — Blox Cheat`,
    description: script.features ?? `${script.title} script for ${script.game?.name}`,
  };
}

export default async function ScriptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const script = await fetchScript(slug);

  if (!script) notFound();

  const imgSrc = getImageUrl(script.image);
  const gameImgSrc = script.game?.imageUrl ?? null;
  const date = script.lastBump || script.createdAt;

  const badges = [
    script.key && { label: "Key System", cls: "blox-badge--key" },
    script.isPatched && { label: "Patched", cls: "blox-badge--patched" },
    script.isUniversal && { label: "Universal", cls: "blox-badge--universal" },
    script.verified && { label: "Verified", cls: "blox-badge--verified" },
    script.scriptType === "free" && { label: "Free", cls: "blox-badge--free" },
  ].filter(Boolean) as { label: string; cls: string }[];

  return (
    <>
      <div className="noise-overlay" />
      <MarketingHeader homeBrandHref="/" />
      <main className="subpage">
        {/* Mini hero */}
        <section className="subpage-hero" style={{ paddingBottom: "28px" }}>
          <div className="hero-grid-lines subpage-grid" />
          <div className="subpage-inner">
            <div className="hero-badge">
              <span className="badge-dot" />
              <span>Spectrum Cheat // Blox Cheat</span>
            </div>
            <div style={{ marginTop: 14 }}>
              <Link href="/bloxcheat" className="btn-outline" style={{ fontSize: "0.85rem", padding: "8px 18px" }}>
                ← Back to Scripts
              </Link>
            </div>
          </div>
        </section>

        <section className="subpage-content">
          <div className="subpage-inner">

            {/* Top: thumbnail + info */}
            <div className="sdetail-top">

              {/* Thumbnail */}
              <div className="sdetail-thumb-wrap">
                {imgSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imgSrc} alt={script.title} className="sdetail-thumb-img" />
                ) : gameImgSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={gameImgSrc} alt={script.game.name} className="sdetail-thumb-img" style={{ objectFit: "contain", padding: "20px" }} />
                ) : (
                  <div className="sdetail-thumb-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                      style={{ color: "var(--accent)", opacity: 0.25 }}>
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                )}
                <div className="sdetail-thumb-badges">
                  {badges.map((b) => (
                    <span key={b.label} className={`blox-badge ${b.cls}`}>{b.label}</span>
                  ))}
                </div>
                <div className="sdetail-views">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {script.likeCount ?? 0} Likes
                </div>
              </div>

              {/* Info */}
              <div className="sdetail-info">
                <h1 className="sdetail-title">{script.title}</h1>
                <p className="sdetail-game">{script.game?.name}</p>

                <div className="sdetail-meta">
                  {script.owner && (
                    <span className="sdetail-meta-item">
                      {script.owner.profilePicture ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={script.owner.profilePicture} alt={script.owner.username}
                          style={{ width: 20, height: 20, borderRadius: "50%", objectFit: "cover" }} />
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                        </svg>
                      )}
                      {script.owner.username}
                      {script.owner.verified && <span style={{ color: "var(--accent-2)", fontSize: "0.7rem" }}>✓</span>}
                    </span>
                  )}
                  <span className="sdetail-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {timeAgo(date)}
                  </span>
                  <span className="sdetail-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                    {script.likeCount} / {script.dislikeCount}
                  </span>
                </div>

                {/* Tags */}
                {script.tags && script.tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {script.tags.map((tag) => (
                      <span key={tag} style={{
                        fontSize: "0.72rem", padding: "3px 10px", borderRadius: 20,
                        background: "rgba(255,255,255,0.06)", color: "var(--muted)",
                        border: "1px solid rgba(255,255,255,0.08)"
                      }}>{tag}</span>
                    ))}
                  </div>
                )}

                <CopyButtons script={script.script} title={script.title} />

                {script.key && (
                  <a href={`https://scriptblox.com/script/${script.slug}`} target="_blank" rel="noreferrer" className="sdetail-key-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                    </svg>
                    Get Key
                  </a>
                )}
              </div>
            </div>

            {/* Description / Features */}
            {script.features && (
              <div className="sdetail-section">
                <h2 className="sdetail-section-title">Description</h2>
                <div className="sdetail-card">
                  <p className="sdetail-desc" style={{ whiteSpace: "pre-wrap" }}>{script.features}</p>
                </div>
              </div>
            )}

            {/* Script code */}
            <div className="sdetail-section">
              <RawHeader script={script.script} title={script.title} slug={script.slug} />
              <LuaCode code={script.script} />
            </div>

          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
