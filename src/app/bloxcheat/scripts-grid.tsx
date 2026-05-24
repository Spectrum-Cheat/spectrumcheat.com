"use client";

import { useState } from "react";
import Link from "next/link";
import { BloxImage } from "./blox-image";
import { useLang } from "../_i18n/context";

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

interface Props {
  initialScripts: Script[];
  initialHasMore: boolean;
  query: string;
  strict: boolean;
  verified: boolean;
  universal: boolean;
  patched: boolean;
  keySystem: boolean;
  scriptType: string;
  sortBy: string;
  sortOrder: string;
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

function applyFiltersAndSort(scripts: Script[], props: Omit<Props, "initialScripts" | "initialHasMore">): Script[] {
  let list = [...scripts];
  if (props.verified)   list = list.filter(s => s.verified);
  if (props.universal)  list = list.filter(s => s.isUniversal);
  if (props.patched)    list = list.filter(s => s.isPatched);
  if (props.keySystem)  list = list.filter(s => s.key);
  if (props.scriptType) list = list.filter(s => s.scriptType === props.scriptType);
  if (props.sortBy) {
    const order = props.sortOrder === "asc" ? 1 : -1;
    list.sort((a, b) => {
      if (props.sortBy === "views")     return (a.views - b.views) * order;
      if (props.sortBy === "createdAt") return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * order;
      if (props.sortBy === "likeCount") return ((a.likeCount ?? 0) - (b.likeCount ?? 0)) * order;
      return 0;
    });
  }
  return list;
}

export function ScriptsGrid({ initialScripts, initialHasMore, ...rest }: Props) {
  const { t } = useLang();
  const [allScripts, setAllScripts] = useState<Script[]>(initialScripts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const params = new URLSearchParams({ page: String(nextPage) });
      if (rest.query)  params.set("q", rest.query);
      if (rest.strict) params.set("strict", "1");
      const res = await fetch(`/api/bloxcheat?${params}`);
      const data = await res.json();
      setAllScripts(prev => [...prev, ...data.scripts]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  }

  const displayed = applyFiltersAndSort(allScripts, rest);

  if (displayed.length === 0) {
    return (
      <div className="subpage-card" style={{ textAlign: "center", padding: "48px 28px" }}>
        <p style={{ color: "var(--muted)" }}>
          {rest.query
            ? `${t("bloxEmpty")} "${rest.query}".`
            : t("bloxError")}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="blox-grid">
        {displayed.map((script) => {
          const href = `/bloxcheat/${script.slug}`;
          const tags: { key: string; label: string }[] = [
            script.key        && { key: "key",       label: t("badgeKeySystem") },
            script.isPatched  && { key: "patched",   label: t("badgePatched") },
            script.isUniversal && { key: "universal", label: t("badgeUniversal") },
          ].filter(Boolean) as { key: string; label: string }[];

          return (
            <Link key={script._id} href={href} className="blox-card">
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
              </div>
              <div className="blox-card-body">
                <span className="blox-game-name">{script.game?.name ?? "Unknown Game"}</span>
                <p className="blox-script-title">{script.title}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {hasMore && (
        <div className="blox-load-more-wrap">
          <button
            className="blox-load-more-btn"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="blox-load-spinner" />
                {t("btnLoading")}
              </>
            ) : (
              t("btnLoadMore")
            )}
          </button>
        </div>
      )}
    </>
  );
}
