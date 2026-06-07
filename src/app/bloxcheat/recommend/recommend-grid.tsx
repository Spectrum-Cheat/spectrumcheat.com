"use client";

import Link from "next/link";
import { BloxImage } from "../blox-image";
import { useLang } from "../../_i18n/context";

interface ScriptGame {
  name: string;
  imageUrl?: string;
}

export interface RecommendScript {
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
  youtubeUrl?: string;
  customHref?: string;
}

const TAG_CLS: Record<string, string> = {
  key:       "blox-badge--key",
  patched:   "blox-badge--patched",
  universal: "blox-badge--universal",
};

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

function formatViews(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function RecommendGrid({ scripts }: { scripts: RecommendScript[] }) {
  const { t } = useLang();

  if (scripts.length === 0) {
    return (
      <div className="subpage-card" style={{ textAlign: "center", padding: "48px 28px" }}>
        <p style={{ color: "var(--muted)" }}>{t("bloxRecommendEmpty")}</p>
      </div>
    );
  }

  return (
    <div className="blox-grid">
      {scripts.map((script) => {
        const href = script.customHref ?? `/bloxcheat/${script.slug}`;
        const tags: { key: string; label: string }[] = [
          script.key         && { key: "key",       label: t("badgeKeySystem") },
          script.isPatched   && { key: "patched",   label: t("badgePatched") },
          script.isUniversal && { key: "universal", label: t("badgeUniversal") },
        ].filter(Boolean) as { key: string; label: string }[];

        return (
          <div key={script._id} className="blox-card-wrapper">
            <Link href={href} className="blox-card">
              <div className="blox-thumb">
                <BloxImage image={script.image} title={script.title} />
                <div className="blox-thumb-overlay">
                  <span className="blox-views">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {formatViews(script.views)}
                  </span>
                  <span className="blox-time">{timeAgo(script.updatedAt || script.createdAt)}</span>
                </div>
                {tags.length > 0 && (
                  <div className="blox-badges">
                    {tags.map(({ key, label }) => (
                      <span key={key} className={`blox-badge ${TAG_CLS[key] ?? ""}`}>{label}</span>
                    ))}
                  </div>
                )}
                {/* Spectrum pick badge */}
                <div className="blox-recommend-badge">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2 9.6 4.4 6.3 4 5.5 7.3 2.6 9l1.5 3-1.5 3 2.9 1.7.8 3.3 3.3-.4L12 22l2.4-2.4 3.3.4.8-3.3 2.9-1.7-1.5-3 1.5-3-2.9-1.7-.8-3.3-3.3.4L12 2Z"/>
                    <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  ZPU Pick
                </div>
              </div>
              <div className="blox-card-body">
                <span className="blox-game-name">{script.game?.name ?? "Unknown Game"}</span>
                <p className="blox-script-title">{script.title}</p>
              </div>
            </Link>

            {/* YouTube link if provided */}
            {script.youtubeUrl && (
              <a
                href={script.youtubeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="blox-recommend-yt"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1C4.5 20.4 12 20.4 12 20.4s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8z"/>
                  <polygon points="9.7 15.5 15.8 12 9.7 8.5 9.7 15.5" fill="white"/>
                </svg>
                Watch on YouTube
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}
