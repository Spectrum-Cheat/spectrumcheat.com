"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSession, signIn } from "next-auth/react";
import { SubpageShell } from "../_components/subpage-shell";
import { useLang } from "../_i18n/context";
import type { TranslationKey } from "../_i18n/translations";

// How long (seconds) the user must stay on the opened tab for a step to count.
const VERIFY_SECONDS = 5;
// Lenience subtracted from the required away-time (ms).
const REVEAL_TOLERANCE_MS = 1500;

const STEPS: { titleKey: TranslationKey; descKey: TranslationKey; href: string; iconType: "discord" | "youtube"; btnColor: string }[] = [
  {
    titleKey: "getkeyStep1Title",
    descKey: "getkeyStep1Desc",
    href: "https://discord.gg/hackerclub",
    iconType: "discord",
    btnColor: "#5865F2",
  },
  {
    titleKey: "getkeyStep2Title",
    descKey: "getkeyStep2Desc",
    href: "https://youtu.be/TB3xNdkZwSU",
    iconType: "youtube",
    btnColor: "#FF0000",
  },
];

function StepIcon({ type }: { type: "discord" | "youtube" }) {
  if (type === "discord") return (
    <svg width="16" height="16" viewBox="0 -28.5 256 256" fill="currentColor" aria-hidden="true">
      <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"/>
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

const keyProviders: {
  ribbonKey: TranslationKey; ribbonClass: string; title: string; subBadgeKey: TranslationKey;
  logo: string; metaStepsKey: TranslationKey; metaTimeKey: TranslationKey; descKey: TranslationKey;
  featureKeys: TranslationKey[]; href: string; active: boolean;
}[] = [
  {
    ribbonKey: "getkeyRecommended",
    ribbonClass: "ribbon-active",
    title: "Linkvertise",
    subBadgeKey: "getkeyFastest",
    logo: "/images/linkvertise-logo.png",
    metaStepsKey: "getkeyMetaSteps2",
    metaTimeKey: "getkeyMetaTime5",
    descKey: "getkeyLinkDesc",
    featureKeys: ["getkeyLinkF1", "getkeyLinkF2", "getkeyLinkF3"],
    href: "https://ads.luarmor.net/get_key?for=Spectrum_x_Authentication-RRiWedvutwzg",
    active: true,
  },
  {
    ribbonKey: "getkeyComingSoon",
    ribbonClass: "ribbon-muted",
    title: "Loot Labs",
    subBadgeKey: "getkeySupporter",
    logo: "/images/lootlabs-logo.png",
    metaStepsKey: "getkeyMetaSteps3",
    metaTimeKey: "getkeyMetaTime15",
    descKey: "getkeyLootDesc",
    featureKeys: ["getkeyLootF1", "getkeyLootF2", "getkeyLootF3"],
    href: "",
    active: false,
  },
];

const BEAMS = [
  { left: "8%",  height: 130, duration: 3.2, delay: 0    },
  { left: "18%", height: 90,  duration: 4.5, delay: 1.8, sm: true },
  { left: "30%", height: 110, duration: 2.8, delay: 0.6  },
  { left: "52%", height: 80,  duration: 5.0, delay: 3.0, sm: true },
  { left: "68%", height: 140, duration: 3.6, delay: 1.2  },
  { left: "80%", height: 95,  duration: 4.0, delay: 2.4, sm: true },
  { left: "92%", height: 120, duration: 3.0, delay: 0.9  },
];

function FallingBeams() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className="getkey-beams" aria-hidden="true">
      {BEAMS.map((b, i) => (
        <div
          key={i}
          className={`gk-beam${b.sm ? " gk-beam-sm" : ""}`}
          style={{
            left: b.left,
            height: b.height,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>,
    document.body
  );
}

function StepsMetaIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function ClockMetaIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  );
}

function CheckIcon({ muted }: { muted?: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: muted ? "var(--text-muted)" : "#22c55e", flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function GetKeyClient() {
  const { t, lang } = useLang();
  const thaiFont = lang === "th" ? { fontFamily: "var(--font-body)" } : undefined;
  const { status } = useSession();
  const loggedIn = status === "authenticated";
  const [done, setDone] = useState<boolean[]>([false, false]);
  const [verifying, setVerifying] = useState<number | null>(null);
  const [errorStep, setErrorStep] = useState<number | null>(null);
  const allDone = loggedIn || done.every(Boolean);

  // detection refs (avoid stale closures inside listeners)
  const verifyingRef = useRef<number | null>(null);
  const awayMsRef = useRef(0);
  const hiddenStartRef = useRef<number | null>(null);
  const revealedRef = useRef(false);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("spectrum-key-steps");
      if (raw) {
        const { steps, expires } = JSON.parse(raw);
        if (Date.now() < expires) {
          setDone(steps);
        } else {
          localStorage.removeItem("spectrum-key-steps");
        }
      }
    } catch {}
    return () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("page-getkey");
    return () => document.documentElement.classList.remove("page-getkey");
  }, []);

  // Track time spent away (on the opened tab) during a verifying window.
  useEffect(() => {
    function onVisibility() {
      if (verifyingRef.current == null) return;
      if (document.hidden) {
        hiddenStartRef.current = Date.now();
      } else if (hiddenStartRef.current != null) {
        awayMsRef.current += Date.now() - hiddenStartRef.current;
        hiddenStartRef.current = null;
      }
    }
    function onBlur() {
      if (verifyingRef.current != null && hiddenStartRef.current == null) {
        hiddenStartRef.current = Date.now();
      }
    }
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onVisibility);
    };
  }, []);

  const reveal = (index: number) => {
    if (revealedRef.current) return;
    revealedRef.current = true;

    // account for time still being away at the reveal moment
    let away = awayMsRef.current;
    if (hiddenStartRef.current != null) {
      away += Date.now() - hiddenStartRef.current;
    }
    const required = VERIFY_SECONDS * 1000 - REVEAL_TOLERANCE_MS;

    verifyingRef.current = null;
    setVerifying(null);

    if (away >= required) {
      const next = done.map((v, i) => (i === index ? true : v));
      setDone(next);
      setErrorStep(null);
      try {
        localStorage.setItem("spectrum-key-steps", JSON.stringify({
          steps: next,
          expires: Date.now() + 24 * 60 * 60 * 1000,
        }));
      } catch {}
    } else {
      // they faked it — reveal red AFTER the bar already filled green
      setErrorStep(index);
    }
  };

  const handleStep = (index: number, href: string) => {
    if (verifying != null || done[index]) return;
    setErrorStep(null);
    awayMsRef.current = 0;
    hiddenStartRef.current = null;
    revealedRef.current = false;
    verifyingRef.current = index;
    setVerifying(index);
    window.open(href, "_blank", "noreferrer");

    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    // let the green bar visually fill first (+150ms), then judge
    revealTimerRef.current = setTimeout(() => reveal(index), VERIFY_SECONDS * 1000 + 150);
  };

  return (
    <SubpageShell
      badge={t("getkeyBadge")}
      title={t("getkeyPageTitle")}
      subtitle={t("getkeyPageSub")}
      pageClass="subpage-getkey"
    >
      <FallingBeams />

      {/* Steps card */}
      <div className="key-steps-card">
        {loggedIn ? (
          <>
            <span className="key-steps-badge key-steps-badge--ok">{t("getkeyLoggedBadge")}</span>
            <h3 className="key-steps-title" style={thaiFont}>{t("getkeyLoggedTitle")}</h3>
            <p className="key-steps-sub">{t("getkeyLoggedSub")}</p>
            <div className="key-loggedin-row">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>{t("getkeyLoggedRow")}</span>
            </div>
          </>
        ) : (
        <>
        <span className="key-steps-badge">{t("getkeyStepsBadge")}</span>
        <h3 className="key-steps-title" style={thaiFont}>{t("getkeyStepsTitle")}</h3>
        <p className="key-steps-sub">{t("getkeyStepsSub")}</p>
        <div className="key-steps-list">
          {STEPS.map((step, i) => {
            const isVerifying = verifying === i;
            const isError = errorStep === i;
            return (
              <div
                key={i}
                className={`key-step-row${done[i] ? " step-done" : ""}${isVerifying ? " step-verifying" : ""}${isError ? " step-error" : ""}`}
              >
                {isVerifying && (
                  <span className="key-step-fill" style={{ animationDuration: `${VERIFY_SECONDS}s` }} />
                )}
                <span className="key-step-num">
                  {done[i] ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : isError ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 21h22L12 2 1 21z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  ) : i + 1}
                </span>
                <div className="key-step-text">
                  <strong>{t(step.titleKey)}</strong>
                  <span>
                    {isVerifying ? t("getkeyStepVerifying") : isError ? t("getkeyStepError") : t(step.descKey)}
                  </span>
                </div>
                <button
                  className="key-step-btn"
                  style={{ "--step-color": step.btnColor } as React.CSSProperties}
                  onClick={() => handleStep(i, step.href)}
                  disabled={done[i] || isVerifying}
                >
                  {done[i] ? (
                    t("getkeyStepDone")
                  ) : isVerifying ? (
                    <span className="key-step-spinner" />
                  ) : (
                    <>
                      <StepIcon type={step.iconType} />
                      {isError ? t("getkeyStepRetry") : t("getkeyStepOpen")}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Skip-with-login hint */}
        <div className="key-login-hint">
          <svg width="18" height="18" viewBox="0 -28.5 256 256" fill="#5865F2" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" />
          </svg>
          <div className="key-login-hint-text">
            <strong>{t("getkeySkipTitle")}</strong>
            <span>{t("getkeySkipDesc")}</span>
          </div>
          <button
            className="key-login-hint-btn"
            onClick={() => { sessionStorage.setItem("justLoggedIn", "1"); signIn("discord"); }}
          >
            {t("getkeyLogin")}
          </button>
        </div>
        </>
        )}
      </div>

      {/* Provider cards */}
      <div className="key-provider-grid">
        {keyProviders.map((provider) => (
          <article key={provider.title} className={`key-provider-card${provider.active ? " kpc-active" : ""}`}>
            <div className={`key-ribbon ${provider.ribbonClass}`}>
              <span>{t(provider.ribbonKey)}</span>
            </div>
            <div className="kpc-header">
              <div className="key-provider-logo">
                <img src={provider.logo} alt={provider.title} loading="lazy" />
              </div>
              <div className="kpc-header-text">
                <h2>{provider.title}</h2>
                <span className={`kpc-sub-badge${provider.active ? " sub-active" : ""}`}>{t(provider.subBadgeKey)}</span>
              </div>
            </div>
            <div className="kpc-meta-row">
              <span className={`kpc-meta${provider.active ? " kpc-meta-active" : ""}`}>
                <StepsMetaIcon />
                {t(provider.metaStepsKey)}
              </span>
              <span className={`kpc-meta${provider.active ? " kpc-meta-active" : ""}`}>
                <ClockMetaIcon />
                {t(provider.metaTimeKey)}
              </span>
            </div>
            <p className="kpc-desc">{t(provider.descKey)}</p>
            <ul className="kpc-features">
              {provider.featureKeys.map((f) => (
                <li key={f}>
                  <CheckIcon muted={!provider.active} />
                  {t(f)}
                </li>
              ))}
            </ul>
            {provider.active ? (
              <a
                href={allDone ? provider.href : undefined}
                onClick={!allDone ? (e) => e.preventDefault() : undefined}
                target="_blank" rel="noreferrer"
                className={`kpc-cta kpc-cta-active${!allDone ? " kpc-locked" : ""}`}
              >
                <LockIcon />
                {allDone ? t("getkeyCtaUnlock") : t("getkeyCtaLocked")}
              </a>
            ) : (
              <span className="kpc-cta kpc-cta-muted">
                <LockIcon />
                {t("getkeyComingSoon")}
              </span>
            )}
          </article>
        ))}

        {/* Premium */}
        <div className="key-premium-card">
          <div className="key-ribbon ribbon-premium"><span>{t("getkeyInstant")}</span></div>
          <div className="kpc-header">
            <div className="key-provider-logo key-premium-logo">
              <img src="/images/Spectrum Icon.png" alt="Spectrum" loading="lazy" />
            </div>
            <div className="kpc-header-text">
              <h2 className="key-premium-title">Premium</h2>
              <span className="kpc-sub-badge key-premium-badge">{t("getkeyNoTasks")}</span>
            </div>
          </div>
          <div className="kpc-meta-row">
            <span className="kpc-meta kpc-meta-premium">
              <StepsMetaIcon />
              {t("getkeyMetaStepsNo")}
            </span>
            <span className="kpc-meta kpc-meta-premium">
              <ClockMetaIcon />
              {t("getkeyMetaTimeInstant")}
            </span>
          </div>
          <p className="kpc-desc">{t("getkeyPremiumDesc")}</p>
          <ul className="kpc-features key-premium-features">
            {(["getkeyPremF1", "getkeyPremF2", "getkeyPremF3"] as const).map((f) => (
              <li key={f}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t(f)}
              </li>
            ))}
          </ul>
          <a href="/#pricing" className="key-premium-cta">{t("getkeyPremiumCta")}</a>
        </div>
      </div>
    </SubpageShell>
  );
}
