"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLang } from "../../_i18n/context";

export function SlugHero() {
  const { t } = useLang();

  useEffect(() => {
    document.documentElement.classList.add("page-bloxcheat");
    return () => document.documentElement.classList.remove("page-bloxcheat");
  }, []);

  return (
    <section className="subpage-hero" style={{ paddingBottom: "28px" }}>
      <div className="hero-grid-lines subpage-grid" />
      <div className="subpage-inner">
        <div className="blox-hero-actions">
          <Link href="/bloxcheat" className="blox-hero-btn blox-hero-btn--back">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            {t("backToScripts")}
          </Link>
        </div>
      </div>
    </section>
  );
}
