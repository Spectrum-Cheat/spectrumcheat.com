"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useLang } from "../../_i18n/context";
import { YOUTUBE_CONFIG, type LatestVideo } from "../_data/youtube";

const STORAGE_KEY = "spectrum-script-unlock";
// How lenient the "did you actually stay" check is (ms subtracted from required).
const REVEAL_TOLERANCE_MS = 1500;

type StepId = "watch" | "watch2" | "watch3" | "sub" | "like" | "like2";
type StepState = "locked" | "ready" | "verifying" | "done";

function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    if (Number.isNaN(ts)) return false;
    return Date.now() - ts < YOUTUBE_CONFIG.rememberHours * 3600 * 1000;
  } catch {
    return false;
  }
}

const YTIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z" />
  </svg>
);

export function UnlockGate({
  video,
  video2,
  video3,
}: {
  video: LatestVideo;
  video2?: LatestVideo | null;
  video3?: LatestVideo | null;
}) {
  const { t } = useLang();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [done, setDone] = useState<Record<StepId, boolean>>({
    watch: false,
    watch2: false,
    watch3: false,
    sub: false,
    like: false,
    like2: false,
  });
  const [verifying, setVerifying] = useState<StepId | null>(null);
  const [errorStep, setErrorStep] = useState<StepId | null>(null);
  const [finishing, setFinishing] = useState<"idle" | "unlocking" | "done">("idle");

  // detection refs (avoid stale closures inside listeners)
  const verifyingRef = useRef<StepId | null>(null);
  const awayMsRef = useRef(0);
  const hiddenStartRef = useRef<number | null>(null);
  const revealedRef = useRef(false);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const seconds: Record<StepId, number> = {
    watch: YOUTUBE_CONFIG.watchSeconds,
    watch2: YOUTUBE_CONFIG.watchSeconds,
    watch3: YOUTUBE_CONFIG.watchSeconds,
    sub: YOUTUBE_CONFIG.subscribeSeconds,
    like: YOUTUBE_CONFIG.likeSeconds,
    like2: YOUTUBE_CONFIG.likeSeconds,
  };
  const secondsRef = useRef(seconds);
  secondsRef.current = seconds;

  useEffect(() => {
    setMounted(true);
    if (isUnlocked() || status === "authenticated") {
      setUnlocked(true);
      document.body.style.overflow = "";
    } else if (status !== "loading") {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    };
  }, []);

  // Track time spent away (on YouTube) during a verifying window.
  useEffect(() => {
    function onVisibility() {
      if (!verifyingRef.current) return;
      if (document.hidden) {
        hiddenStartRef.current = Date.now();
      } else if (hiddenStartRef.current != null) {
        awayMsRef.current += Date.now() - hiddenStartRef.current;
        hiddenStartRef.current = null;
      }
    }
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", () => {
      if (verifyingRef.current && hiddenStartRef.current == null) {
        hiddenStartRef.current = Date.now();
      }
    });
    window.addEventListener("focus", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onVisibility);
    };
  }, []);

  const steps: { id: StepId; label: string; url: string }[] = [
    { id: "sub", label: t("unlockStepSub"), url: YOUTUBE_CONFIG.channelUrl },
    { id: "watch", label: t("unlockStepWatch"), url: video.url },
    ...(video2?.url
      ? [{ id: "watch2" as StepId, label: t("unlockStepWatch2"), url: video2.url }]
      : []),
    ...(video3?.url
      ? [{ id: "watch3" as StepId, label: t("unlockStepWatch3"), url: video3.url }]
      : []),
    { id: "like", label: t("unlockStepLike"), url: video.url },
  ];

  function stepState(index: number): StepState {
    const step = steps[index];
    if (done[step.id]) return "done";
    if (verifying === step.id) return "verifying";
    const firstPending = steps.findIndex((s) => !done[s.id]);
    return index === firstPending ? "ready" : "locked";
  }

  function reveal(stepId: StepId) {
    if (revealedRef.current) return;
    revealedRef.current = true;

    // account for time still being away at reveal moment
    let away = awayMsRef.current;
    if (hiddenStartRef.current != null) {
      away += Date.now() - hiddenStartRef.current;
    }
    const required = secondsRef.current[stepId] * 1000 - REVEAL_TOLERANCE_MS;

    verifyingRef.current = null;
    setVerifying(null);

    if (away >= required) {
      setDone((prev) => ({ ...prev, [stepId]: true }));
      setErrorStep(null);
    } else {
      // they faked it — reveal red AFTER the bar already filled green
      setErrorStep(stepId);
    }
  }

  function startStep(stepId: StepId, url: string) {
    if (verifying || done[stepId]) return;
    setErrorStep(null);
    awayMsRef.current = 0;
    hiddenStartRef.current = null;
    revealedRef.current = false;
    verifyingRef.current = stepId;
    setVerifying(stepId);
    window.open(url, "_blank", "noopener,noreferrer");

    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    // let the green bar visually fill first (+150ms), then judge
    revealTimerRef.current = setTimeout(
      () => reveal(stepId),
      secondsRef.current[stepId] * 1000 + 150
    );
  }

  const completedCount = steps.filter((s) => done[s.id]).length;
  const allDone = completedCount === steps.length;

  function finishUnlock() {
    if (!allDone || finishing !== "idle") return;
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setFinishing("unlocking");
    setTimeout(() => setFinishing("done"), 1300);
    setTimeout(() => {
      document.body.style.overflow = "";
      setUnlocked(true);
    }, 2100);
  }

  if (!mounted || unlocked || status === "authenticated") return null;

  const firstPending = steps.findIndex((s) => !done[s.id]);
  const watchIndex = steps.findIndex((s) => s.id === "watch");
  // Thumbnail is the "watch" step — only clickable when watch is the next pending step.
  const watchThumbDisabled = !done.watch && firstPending !== watchIndex;

  return (
    <div className="ulgate-overlay">
      <div className="ulgate-modal">
        <h2 className="ulgate-title">{t("unlockTitle")}</h2>
        <p className="ulgate-sub">{t("unlockSubtitle")}</p>

        {/* Video thumbnail (click = watch step) */}
        {video.thumbnail && (
          <button
            className="ulgate-video"
            onClick={() => startStep("watch", video.url)}
            disabled={watchThumbDisabled}
            aria-label={video.title ?? "Watch video"}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={video.thumbnail} alt={video.title ?? "Latest video"} className="ulgate-video-thumb" />
            <span className="ulgate-video-play">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            {video.title && <span className="ulgate-video-title">{video.title}</span>}
          </button>
        )}

        {/* Steps */}
        <div className="ulgate-steps">
          {steps.map((step, i) => {
            const state = stepState(i);
            const isError = errorStep === step.id;
            return (
              <button
                key={step.id}
                className={`ulgate-step ulgate-step--${state}${isError ? " ulgate-step--error" : ""}`}
                disabled={state !== "ready"}
                onClick={() => startStep(step.id, step.url)}
              >
                {/* green fake-out fill */}
                {state === "verifying" && (
                  <span
                    className="ulgate-step-fill"
                    style={{ animationDuration: `${seconds[step.id]}s` }}
                  />
                )}
                <span className="ulgate-step-yt">{YTIcon}</span>
                <span className="ulgate-step-body">
                  <span className="ulgate-step-label">{step.label}</span>
                  {state === "verifying" && (
                    <span className="ulgate-step-note">{t("unlockVerifying")}</span>
                  )}
                  {isError && (
                    <span className="ulgate-step-note ulgate-step-note--err">
                      {t("unlockRetry")}
                    </span>
                  )}
                </span>
                <span className="ulgate-step-status">
                  {state === "done" ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : state === "verifying" ? (
                    <span className="ulgate-spinner" />
                  ) : isError ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 21h22L12 2 1 21z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  ) : (
                    <span className="ulgate-step-num">{i + 1}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Discord login hint */}
        <div className="ulgate-discord-hint">
          <svg width="16" height="16" viewBox="0 -28.5 256 256" fill="#5865F2" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" />
          </svg>
          <div className="ulgate-discord-hint-text">
            <span className="ulgate-discord-hint-title">{t("unlockDiscordHint")}</span>
            <span className="ulgate-discord-hint-sub">{t("unlockDiscordHint2")}</span>
            <span className="ulgate-discord-hint-sub">{t("unlockDiscordHint3")}</span>
          </div>
          <button className="ulgate-discord-btn" onClick={() => { sessionStorage.setItem("justLoggedIn", "1"); signIn("discord"); }}>
            {t("navLogin")}
          </button>
        </div>

        {/* Progress */}
        <div className="ulgate-progress">
          <div className="ulgate-progress-bar">
            <div
              className="ulgate-progress-fill"
              style={{ width: `${(completedCount / steps.length) * 100}%` }}
            />
          </div>
          <span className="ulgate-progress-text">
            {completedCount}/{steps.length} {t("unlockProgress")}
          </span>
        </div>

        <button
          className={`ulgate-finish${allDone ? " ulgate-finish--ready" : ""}${
            finishing === "unlocking" ? " ulgate-finish--unlocking" : ""
          }${finishing === "done" ? " ulgate-finish--complete" : ""}`}
          disabled={!allDone || finishing !== "idle"}
          onClick={finishUnlock}
        >
          {finishing === "unlocking" ? (
            <>
              <span className="ulgate-spinner ulgate-spinner--light" />
              {t("unlockUnlocking")}
            </>
          ) : finishing === "done" ? (
            <>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {t("unlockDoneFinal")}
            </>
          ) : (
            <>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {allDone ? (
                  <>
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                  </>
                ) : (
                  <>
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </>
                )}
              </svg>
              {allDone ? t("unlockFinal") : t("unlockLocked")}
            </>
          )}
        </button>

        <p className="ulgate-hint">{t("unlockHint")}</p>
      </div>
    </div>
  );
}
