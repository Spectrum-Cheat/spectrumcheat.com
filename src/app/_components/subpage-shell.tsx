"use client";

import Link from "next/link";
import { MarketingHeader } from "./marketing-header";
import { SiteFooter } from "./site-footer";
import { AdResponsive } from "./ad-banner";
import { useLang } from "../_i18n/context";

type SubpageShellProps = {
  badge: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
};

export function SubpageShell({ badge, title, subtitle, children, ctaLabel, ctaHref = "https://discord.gg/hackerclub" }: SubpageShellProps) {
  const { t, lang } = useLang();
  const resolvedCtaLabel = ctaLabel ?? t("btnJoinDiscord");

  return (
    <>
      <div className="noise-overlay" />
      <MarketingHeader homeBrandHref="/" />
      <main className="subpage">
        <section className="subpage-hero">
          <div className="hero-grid-lines subpage-grid" />
          <div className="subpage-inner">
            <div className="hero-badge">
              <span className="badge-dot" />
              <span>{badge}</span>
            </div>
            <h1 className="subpage-title" style={lang === "th" ? { fontFamily: "var(--font-body)" } : undefined}>{title}</h1>
            <p className="subpage-subtitle">{subtitle}</p>
            <div className="subpage-actions">
              <Link href="/" className="btn-outline">
                {t("btnBackHome")}
              </Link>
              <a href={ctaHref} target="_blank" rel="noreferrer" className="btn-primary">
                {resolvedCtaLabel}
              </a>
            </div>
          </div>
        </section>

        <section className="subpage-content">
          <div className="subpage-inner">
            {children}
            <AdResponsive className="ad-slot" />
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
