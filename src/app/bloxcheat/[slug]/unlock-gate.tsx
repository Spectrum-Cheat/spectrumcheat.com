"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../../_i18n/context";
import { YOUTUBE_CONFIG, type LatestVideo } from "../_data/youtube";

const STORAGE_KEY = "spectrum-script-unlock";
// How lenient the "did you actually stay" check is (ms subtracted from required).
const REVEAL_TOLERANCE_MS = 1500;

type StepId = "watch" | "sub" | "like";
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

export function UnlockGate({ video }: { video: LatestVideo }) {
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [done, setDone] = useState<Record<StepId, boolean>>({
    watch: false,
    sub: false,
    like: false,
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
    sub: YOUTUBE_CONFIG.subscribeSeconds,
    like: YOUTUBE_CONFIG.likeSeconds,
  };
  const secondsRef = useRef(seconds);
  secondsRef.current = seconds;

  useEffect(() => {
    setMounted(true);
    if (isUnlocked()) {
      setUnlocked(true);
      document.body.style.overflow = "";
    } else {
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
    { id: "watch", label: t("unlockStepWatch"), url: video.url },
    { id: "sub", label: t("unlockStepSub"), url: YOUTUBE_CONFIG.channelUrl },
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

  if (!mounted || unlocked) return null;

  const firstPending = steps.findIndex((s) => !done[s.id]);

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
            disabled={firstPending !== 0 && !done.watch}
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
                      {t("unlockRetryA")}{seconds[step.id]}{t("unlockRetryB")}
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
