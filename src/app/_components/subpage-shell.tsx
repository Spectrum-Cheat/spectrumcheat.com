import Link from "next/link";
import { MarketingHeader } from "./marketing-header";

type SubpageShellProps = {
  badge: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function SubpageShell({ badge, title, subtitle, children }: SubpageShellProps) {
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
            <h1 className="subpage-title">{title}</h1>
            <p className="subpage-subtitle">{subtitle}</p>
            <div className="subpage-actions">
              <Link href="/" className="btn-outline">
                Back Home
              </Link>
              <a href="https://discord.gg/hackerclub" target="_blank" rel="noreferrer" className="btn-primary">
                Join Discord
              </a>
            </div>
          </div>
        </section>

        <section className="subpage-content">
          <div className="subpage-inner">{children}</div>
        </section>
      </main>
    </>
  );
}
