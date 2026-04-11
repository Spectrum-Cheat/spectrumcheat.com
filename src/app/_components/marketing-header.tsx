"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/scripts", label: "Scripts" },
  { href: "/status", label: "Status" },
  { href: "/getkey", label: "Get Key" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#features", label: "Features" },
];

const discordUrl = "https://discord.gg/hackerclub";
const buyNowUrl = "https://spectrumcheat.rexzy.xyz/";

type MarketingHeaderProps = {
  homeBrandHref?: string;
};

export function MarketingHeader({ homeBrandHref = "/#hero" }: MarketingHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

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
              Buy Now
            </a>
            <a href={discordUrl} target="_blank" rel="noreferrer" className="btn-primary">
              Discord
            </a>
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
            Buy Now
          </a>
          <a href={discordUrl} target="_blank" rel="noreferrer" className="btn-primary" onClick={closeMenu}>
            Discord
          </a>
        </div>
      </div>
    </>
  );
}
