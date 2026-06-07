"use client";

import Link from "next/link";
import { useLang } from "../../_i18n/context";

export function RecommendHero() {
  const { t } = useLang();
  return (
    <section className="subpage-hero">
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
        <div className="subpage-actions">
          <Link href="/bloxcheat" className="btn-outline">{t("recBack")}</Link>
          <Link href="/bloxcheat?sortBy=views&sortOrder=desc" className="btn-primary">{t("btnTrending")}</Link>
        </div>
      </div>
    </section>
  );
}
