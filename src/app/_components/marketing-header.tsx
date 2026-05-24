"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "../_i18n/context";

const discordUrl = "https://discord.gg/hackerclub";
const buyNowUrl = "https://spectrumcheat.rexzy.xyz/";

type MarketingHeaderProps = {
  homeBrandHref?: string;
};

export function MarketingHeader({ homeBrandHref = "/#hero" }: MarketingHeaderProps) {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { href: "/scripts",   label: t("navScripts") },
    { href: "/status",    label: t("navStatus") },
    { href: "/getkey",    label: t("navGetKey") },
    { href: "/executors", label: t("navExecutors") },
    { href: "/bloxcheat", label: t("navBloxCheat") },
  ];

  return (
    <>
      <nav className="topbar" id="topbar">
        <div className="nav-inner">
          <div className="navLeft">
            <Link href={homeBrandHref} className="logo-mark" aria-label="Back to top" onClick={closeMenu}>
              <Image
                src="/images/Spectrum Cheat Logo.png"
                alt="Spectrum Cheat logo"
                width={42}
                height={42}
                className="logo-image"
                priority
              />
            </Link>
            <Link href={homeBrandHref} className="nav-brand-text nav-brand-stack" onClick={closeMenu}>
              <span>Spectrum</span>
              <span>Cheat</span>
            </Link>
          </div>

          <div className="navCenter desktop-menu">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="navRight">
            <a href={buyNowUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              {t("navBuyNow")}
            </a>
            <a href={discordUrl} target="_blank" rel="noreferrer" className="btn-primary">
              {t("navDiscord")}
            </a>
            <button
              className="btn-ghost nav-lang-btn"
              aria-label="Change language"
              onClick={() => window.dispatchEvent(new CustomEvent("spectrum:show-lang"))}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
            <button
              className="hamburger"
              id="hamburger"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={menuOpen ? "mobile-menu open" : "mobile-menu"} id="mobileMenu">
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-cta">
          <a href={buyNowUrl} target="_blank" rel="noreferrer" className="btn-ghost" onClick={closeMenu}>
            {t("navBuyNow")}
          </a>
          <a href={discordUrl} target="_blank" rel="noreferrer" className="btn-primary" onClick={closeMenu}>
            {t("navDiscord")}
          </a>
        </div>
      </div>
    </>
  );
}
