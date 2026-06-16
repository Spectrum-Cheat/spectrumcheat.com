"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FallingBeams } from "../_components/falling-beams";
import { useLang } from "../_i18n/context";

export function BloxHeroSection() {
  const { t, lang } = useLang();
  const searchParams = useSearchParams();

  useEffect(() => {
    document.documentElement.classList.add("page-bloxcheat");
    return () => document.documentElement.classList.remove("page-bloxcheat");
  }, []);
  const isTrending =
    searchParams.get("sortBy") === "views" &&
    searchParams.get("sortOrder") === "desc";

  return (
    <section className="subpage-hero">
      <FallingBeams />
      <div className="hero-grid-lines subpage-grid" />
      <div className="subpage-inner">
        <div className="hero-badge">
          <span className="badge-dot" />
          <span>{t("bloxBadge")}</span>
        </div>
        <h1 className="subpage-title" style={lang === "th" ? { fontFamily: "var(--font-body)" } : undefined}>{t("bloxTitle")}</h1>
        <p className="subpage-subtitle">{t("bloxSubtitle")}</p>
        <div className="subpage-actions blox-hero-actions">
          <Link
            href={isTrending ? "/bloxcheat" : "/bloxcheat?sortBy=views&sortOrder=desc"}
            className={`blox-hero-btn blox-hero-btn--trending${isTrending ? " is-active" : ""}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            {t("btnTrending")}
          </Link>
          <Link href="/bloxcheat/recommend" className="blox-hero-btn blox-hero-btn--recommend">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            {t("btnRecommend")}
          </Link>
        </div>
      </div>
    </section>
  );
}
