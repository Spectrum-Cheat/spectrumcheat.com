"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FallingBeams } from "../../_components/falling-beams";
import { useLang } from "../../_i18n/context";

export function RecommendHero() {
  const { t } = useLang();

  useEffect(() => {
    document.documentElement.classList.add("page-bloxcheat");
    return () => document.documentElement.classList.remove("page-bloxcheat");
  }, []);

  return (
    <section className="subpage-hero">
      <FallingBeams />
      <div className="hero-grid-lines subpage-grid" />
      <div className="subpage-inner">
        <div className="hero-badge">
          <span className="badge-dot" />
          <span>ZPU Pick</span>
        </div>
        <h1 className="subpage-title">{t("recTitle")}</h1>
        <p className="subpage-subtitle">
          {t("recSub")}
          <a href="https://www.youtube.com/@xZPUHigh" target="_blank" rel="noreferrer"
            style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
            xZPUHigh
          </a>
        </p>
        <div className="subpage-actions blox-hero-actions">
          <Link href="/bloxcheat" className="blox-hero-btn blox-hero-btn--back">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            {t("recBack")}
          </Link>
          <Link href="/bloxcheat?sortBy=views&sortOrder=desc" className="blox-hero-btn blox-hero-btn--trending">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            {t("btnTrending")}
          </Link>
        </div>
      </div>
    </section>
  );
}
