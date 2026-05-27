"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLang } from "../_i18n/context";

export function BloxHeroSection() {
  const { t, lang } = useLang();
  const searchParams = useSearchParams();
  const isTrending =
    searchParams.get("sortBy") === "views" &&
    searchParams.get("sortOrder") === "desc";

  return (
    <section className="subpage-hero">
      <div className="hero-grid-lines subpage-grid" />
      <div className="subpage-inner">
        <div className="hero-badge">
          <span className="badge-dot" />
          <span>{t("bloxBadge")}</span>
        </div>
        <h1 className="subpage-title" style={lang === "th" ? { fontFamily: "var(--font-body)" } : undefined}>{t("bloxTitle")}</h1>
        <p className="subpage-subtitle">{t("bloxSubtitle")}</p>
        <div className="subpage-actions">
          <Link href="/" className="btn-outline">{t("btnBackHome")}</Link>
          <Link
            href={isTrending ? "/bloxcheat" : "/bloxcheat?sortBy=views&sortOrder=desc"}
            className={`btn-primary${isTrending ? " btn-primary--active" : ""}`}
          >
            {t("btnTrending")}
          </Link>
          <Link href="/bloxcheat/recommend" className="btn-recommend">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            {t("btnRecommend")}
          </Link>
        </div>
      </div>
    </section>
  );
}
