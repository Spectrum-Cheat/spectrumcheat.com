"use client";

import Link from "next/link";
import { useLang } from "../_i18n/context";

export function BloxHeroSection() {
  const { t } = useLang();
  return (
    <section className="subpage-hero">
      <div className="hero-grid-lines subpage-grid" />
      <div className="subpage-inner">
        <div className="hero-badge">
          <span className="badge-dot" />
          <span>{t("bloxBadge")}</span>
        </div>
        <h1 className="subpage-title">{t("bloxTitle")}</h1>
        <p className="subpage-subtitle">{t("bloxSubtitle")}</p>
        <div className="subpage-actions">
          <Link href="/" className="btn-outline">{t("btnBackHome")}</Link>
          <Link href="/bloxcheat?sortBy=views&sortOrder=desc" className="btn-primary">
            {t("btnTrending")}
          </Link>
        </div>
      </div>
    </section>
  );
}
