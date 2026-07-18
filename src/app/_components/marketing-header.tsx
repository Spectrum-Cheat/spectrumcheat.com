"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useLang } from "../_i18n/context";

const discordUrl = "https://discord.gg/C3MpUNwsDU";
const buyNowUrl = "https://spectrumcheat.rexzy.xyz/";

type MarketingHeaderProps = {
  homeBrandHref?: string;
};

export function MarketingHeader({ homeBrandHref = "/#hero" }: MarketingHeaderProps) {
  const { t } = useLang();
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchClosing, setSearchClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  const closeSearch = () => {
    setSearchClosing(true);
    setTimeout(() => { setSearchOpen(false); setSearchClosing(false); }, 180);
  };
  const [toast, setToast] = useState<{ title: string; subtitle: string; hiding: boolean } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevStatus = useRef<string>("");

  const showToast = (title: string, subtitle: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ title, subtitle, hiding: false });
    toastTimer.current = setTimeout(() => {
      setToast((prev) => prev ? { ...prev, hiding: true } : null);
      setTimeout(() => setToast(null), 400);
    }, 3000);
  };

  const dismissToast = () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast((prev) => prev ? { ...prev, hiding: true } : null);
    setTimeout(() => setToast(null), 400);
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (sessionStorage.getItem("justLoggedIn")) {
        sessionStorage.removeItem("justLoggedIn");
        showToast(t("navToastWelcome"), t("navToastWelcomeSub"));
      }
    }
    prevStatus.current = status;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session]);

  const handleLogout = async () => {
    setUserDropOpen(false);
    showToast(t("navToastLogout"), t("navToastLogoutSub"));
    await signOut({ redirect: false });
  };

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeSearch(); };
    const onClickOutside = (e: MouseEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) closeSearch();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  type NavItem = { href: string; label: string; badge?: string; dot?: boolean; divider?: boolean };
  const navItems: NavItem[] = [
    { href: "/",          label: t("navHome") },
    { href: "/scripts",   label: t("navScripts") },
    { href: "/status",    label: t("navStatus") },
    { href: "/getkey",    label: t("navGetKey") },
    { href: "/executors", label: t("navExecutors") },
    { href: "/bloxcheat", label: t("navBloxCheat"), badge: "NEW" },
  ];

  return (
    <>
      <nav className={`topbar${scrolled ? " scrolled" : ""}`} id="topbar">
        <div className="nav-inner">
          <div className="navLeft">
            <Link href={homeBrandHref} className="nav-brand-wrap" aria-label="Back to top" onClick={closeMenu}>
              <Image
                src="/images/Spectrum Icon.png"
                alt="Spectrum Cheat logo"
                width={42}
                height={42}
                className="logo-image"
                priority
              />
              <span className="nav-brand-text nav-brand-stack">
                <span>Spectrum</span>
                <span>Cheat</span>
              </span>
            </Link>
          </div>

          <div className="navCenter desktop-menu">
            <ul>
              {navItems.map((item, i) => (
                item.divider
                  ? <li key={`div-${i}`} className="nav-divider" aria-hidden="true" />
                  : <li key={item.href}>
                      <Link href={item.href} className={pathname === item.href ? "nav-active" : ""}>
                        {item.dot && <span className="nav-status-dot" />}
                        {item.label}
                      </Link>
                      {item.badge && <span className="nav-badge">{item.badge}</span>}
                    </li>
              ))}
            </ul>
          </div>

          <div className="navRight">
            {searchOpen ? (
              <div className="nav-search-wrap" ref={searchWrapRef}>
                <div className={`nav-search-inline${searchClosing ? " closing" : ""}`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    ref={searchRef}
                    type="text"
                    className="search-input"
                    placeholder={t("navSearchPlaceholder")}
                  />
                  <kbd className="search-esc">Esc</kbd>
                </div>
                {!searchClosing && (
                  <div className="search-dropdown">
                    <div className="search-dropdown-label">{t("navSearchPopular")}</div>
                    {[
                      { label: "Executors", href: "/executors" },
                      { label: "Blox Cheat", href: "/bloxcheat" },
                      { label: "FAQ", href: "/#faq" },
                    ].map((item) => (
                      <Link key={item.href} href={item.href} className="search-dropdown-item" onClick={() => closeSearch()}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        {item.label}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-dropdown-arrow" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button className="btn-ghost nav-icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            )}
            <a href={buyNowUrl} target="_blank" rel="noreferrer" className="btn-ghost nav-icon-btn" aria-label="Buy Now">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </a>
            {status === "authenticated" && session?.user ? (
              <div className="nav-user-wrap">
                <button className="nav-user-btn" onClick={() => setUserDropOpen((v) => !v)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {session.user.image && <img src={session.user.image} alt={session.user.name ?? "User"} className="nav-user-avatar" />}
                  <span className="nav-user-name">{session.user.name}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {userDropOpen && (
                  <>
                    <div className="nav-user-backdrop" onClick={() => setUserDropOpen(false)} />
                    <div className="nav-user-drop">
                      <div className="nav-user-drop-header">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {session.user.image && <img src={session.user.image} alt="" className="nav-user-drop-avatar" />}
                        <div>
                          <div className="nav-user-drop-name">
                          {session.user.discordGlobalName ?? session.user.name}
                          {session.user.discordUsername && session.user.discordUsername !== session.user.discordGlobalName && (
                            <span className="nav-user-drop-username"> ({session.user.discordUsername})</span>
                          )}
                        </div>
                          <button
                          className="nav-user-drop-email"
                          onClick={() => setEmailRevealed((v) => !v)}
                          title={emailRevealed ? "Hide email" : "Click to reveal"}
                        >
                          {emailRevealed
                            ? session.user.email
                            : session.user.email
                              ? session.user.email.replace(/^(.{7})(.+?)(@.+)$/, (_,a,b,c) => a + "*".repeat(b.length) + c)
                              : ""}
                        </button>
                        </div>
                      </div>
                      <div className="nav-user-drop-divider" />
                      <Link href="/" className="nav-user-drop-menu-item" onClick={() => setUserDropOpen(false)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        {t("navBalance")}
                        <span className="nav-user-drop-amount">00.00฿</span>
                      </Link>
                      <Link href="/" className="nav-user-drop-menu-item" onClick={() => setUserDropOpen(false)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M10 10h3a2 2 0 0 1 0 4h-3"/></svg>
                        {t("navTotalTopup")}
                        <span className="nav-user-drop-amount">00.00฿</span>
                      </Link>
                      <Link href="/history?tab=orders" className="nav-user-drop-menu-item" onClick={() => setUserDropOpen(false)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                        {t("navOrderHistory")}
                      </Link>
                      <Link href="/history?tab=topup" className="nav-user-drop-menu-item" onClick={() => setUserDropOpen(false)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                        {t("navTopupHistory")}
                      </Link>
                      <Link href="/topup" className="nav-user-drop-menu-item nav-user-drop-menu-topup" onClick={() => setUserDropOpen(false)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        {t("navTopup")}
                      </Link>
                      <div className="nav-user-drop-divider" />
                      <div className="nav-user-drop-section-label">{t("navPerks")}</div>
                      <div className="nav-user-drop-status">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {t("navLoggedIn")}
                      </div>
                      <div className="nav-user-drop-status">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {t("navPerkKey")}
                      </div>
                      <div className="nav-user-drop-divider" />
                      <button className="nav-user-drop-logout" onClick={handleLogout}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        {t("navLogout")}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button className="btn-discord-login" onClick={() => { sessionStorage.setItem("justLoggedIn", "1"); signIn("discord"); }}>
                <svg width="16" height="16" viewBox="0 -28.5 256 256" fill="currentColor" aria-hidden="true">
                  <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" />
                </svg>
                {t("navLogin")}
              </button>
            )}
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

      {toast && (
        <div className={`toast-notification${toast.hiding ? " hiding" : ""}`}>
          <div className="toast-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="toast-body">
            <span className="toast-title">{toast.title}</span>
            <span className="toast-subtitle">{toast.subtitle}</span>
          </div>
          <button className="toast-close" onClick={dismissToast} aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

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
          {status === "authenticated" && session?.user ? (
            <div className="mobile-user-section">
              <div className="mobile-user-info">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {session.user.image && <img src={session.user.image} alt="" className="nav-user-avatar" />}
                <span>{session.user.discordGlobalName ?? session.user.name}</span>
              </div>
              <button className="btn-discord-login mobile-logout-btn" onClick={() => { closeMenu(); handleLogout(); }}>
                {t("navLogout")}
              </button>
            </div>
          ) : (
            <button className="btn-discord-login" onClick={() => { closeMenu(); sessionStorage.setItem("justLoggedIn", "1"); signIn("discord"); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              {t("navLogin")}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
