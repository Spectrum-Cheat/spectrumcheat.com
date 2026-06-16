"use client";

import { useEffect, useState } from "react";

export function AdBlockDetector() {
  const [blocked, setBlocked] = useState(false);
  const [checking, setChecking] = useState(false);

  const detect = () => {
    const existing = document.getElementById("vhCJondmTYta");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.src = "/popup2.js?_=" + Date.now();
    script.onload = () => {
      const el = document.getElementById("vhCJondmTYta");
      setBlocked(!el);
      setChecking(false);
      script.remove();
    };
    script.onerror = () => {
      setBlocked(true);
      setChecking(false);
      script.remove();
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    const t = setTimeout(detect, 1000);
    return () => clearTimeout(t);
  }, []);

  const recheck = () => {
    setChecking(true);
    setTimeout(detect, 300);
  };

  if (!blocked) return null;

  return (
    <>
      <div className="adblock-backdrop" />
      <div className="adblock-modal">
        <div className="adblock-top-bar" />
        <div className="adblock-body">
          <div className="adblock-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 className="adblock-title">Ad Blocker Detected</h2>
          <p className="adblock-desc">
            Spectrum Cheat is free and supported by ads. Please disable your ad blocker or allow-list this site to continue.
          </p>
          <div className="adblock-steps">
            <div className="adblock-step">
              <span className="adblock-step-num">1</span>
              <span>Click your ad blocker service icon<br/><span className="adblock-muted">(uBlock, AdBlock, Brave Shields, And more..)</span></span>
            </div>
            <div className="adblock-step">
              <span className="adblock-step-num">2</span>
              <span>Disable it for <strong>spectrumcheat.com</strong></span>
            </div>
            <div className="adblock-step">
              <span className="adblock-step-num">3</span>
              <span>Hit the button below to continue</span>
            </div>
          </div>
          <button className="adblock-btn" onClick={recheck} disabled={checking}>
            {checking ? (
              <span className="adblock-checking">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="adblock-spin">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Checking…
              </span>
            ) : "I've disabled it — check again"}
          </button>
          <p className="adblock-hint">Still seeing this? Try refreshing the page.</p>
        </div>
      </div>
    </>
  );
}
