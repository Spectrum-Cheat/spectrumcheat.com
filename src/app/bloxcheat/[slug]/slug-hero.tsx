"use client";

import Link from "next/link";
import { useLang } from "../../_i18n/context";

export function SlugHero() {
  const { t } = useLang();
  return (
    <section className="subpage-hero" style={{ paddingBottom: "28px" }}>
      <div className="hero-grid-lines subpage-grid" />
      <div className="subpage-inner">
        <div className="hero-badge">
          <span className="badge-dot" />
          <span>{t("bloxBadge")}</span>
        </div>
        <div style={{ marginTop: 14 }}>
          <Link href="/bloxcheat" className="btn-outline" style={{ fontSize: "0.85rem", padding: "8px 18px" }}>
            {t("backToScripts")}
          </Link>
        </div>
      </div>
    </section>
  );
}
