"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useLang } from "../_i18n/context";

const discordUrl = "https://discord.gg/hackerclub";
const buyNowUrl = "https://spectrumcheat.rexzy.xyz/";

type MarketingHeaderProps = {
  homeBrandHref?: string;
};

export function MarketingHeader({ homeBrandHref = "/#hero" }: MarketingHeaderProps) {
  const { t } = useLang();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [toast, setToast] = useState<{ message: string; hiding: boolean } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevStatus = useRef<string>("");

  const showToast = (message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, hiding: false });
    toastTimer.current = setTimeout(() => {
      setToast((prev) => prev ? { ...prev, hiding: true } : null);
      setTimeout(() => setToast(null), 400);
    }, 3000);
  };

  useEffect(() => {
    if (prevStatus.current === "unauthenticated" && status === "authenticated" && session?.user) {
      const name = session.user.discordGlobalName ?? session.user.name ?? "";
      showToast(`${t("navToastWelcome")} ${name}!`);
    }
    prevStatus.current = status;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleLogout = async () => {
    setUserDropOpen(false);
    showToast(t("navToastLogout"));
    await signOut({ redirect: false });
  };

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
                src="/images/Spectrum Icon.png"
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
                      <div className="nav-user-drop-status">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {t("navLoggedIn")}
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
              <button className="btn-discord-login" onClick={() => signIn("discord")}>
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
          {toast.message}
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
            <button className="btn-discord-login" onClick={() => { closeMenu(); signIn("discord"); }}>
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
