"use client";

import { useEffect, useRef, useState } from "react";

// ── Adsterra iframe banners (highperformanceformat.com) ──
// Each banner uses a global `atOptions`, so multiple banners on one page
// would clobber each other. We isolate every banner inside its own
// <iframe srcDoc> so each gets a fresh global scope.
const BANNERS = {
  "728x90":  { key: "e1a1e506c9a018d6b07f3f6dd7b809e4", w: 728, h: 90 },
  "468x60":  { key: "2c364683a0988bb011568fd3931189d6", w: 468, h: 60 },
  "320x50":  { key: "406174554e38a2eaf3220320064e3fad", w: 320, h: 50 },
  "300x250": { key: "097cfa025e59a3f78340e6168275c503", w: 300, h: 250 },
  "160x600": { key: "6099d2589c0c0a4883bd2728ba9c5399", w: 160, h: 600 },
  "160x300": { key: "1528247870af8885a19034dc5fb42146", w: 160, h: 300 },
} as const;

export type BannerSize = keyof typeof BANNERS;

function buildSrcDoc(key: string, w: number, h: number): string {
  const open = "<scr" + "ipt";
  const close = "</scr" + "ipt>";
  return (
    "<!DOCTYPE html><html><head><meta charset='utf-8'>" +
    "<style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}" +
    "body{display:flex;align-items:center;justify-content:center}</style></head><body>" +
    `${open}>atOptions={'key':'${key}','format':'iframe','height':${h},'width':${w},'params':{}};${close}` +
    `${open} src='https://www.highperformanceformat.com/${key}/invoke.js'>${close}` +
    "</body></html>"
  );
}

export function AdBanner({
  size,
  className,
}: {
  size: BannerSize;
  className?: string;
}) {
  const { key, w, h } = BANNERS[size];
  const ref = useRef<HTMLIFrameElement>(null);
  const [doc, setDoc] = useState<string | null>(null);

  // Build srcDoc on the client only (avoids SSR hydration mismatch and
  // ensures the ad script runs in the browser).
  useEffect(() => {
    setDoc(buildSrcDoc(key, w, h));
  }, [key, w, h]);

  return (
    <div
      className={`ad-banner ${className ?? ""}`}
      style={{ width: w, maxWidth: "100%", height: h, margin: "0 auto" }}
    >
      {doc && (
        <iframe
          ref={ref}
          title="advertisement"
          width={w}
          height={h}
          srcDoc={doc}
          scrolling="no"
          frameBorder={0}
          style={{ border: 0, display: "block", width: w, height: h, maxWidth: "100%" }}
        />
      )}
    </div>
  );
}

// Shows a desktop leaderboard (728x90) on wide screens and a mobile
// banner (320x50) on small screens — only ONE is rendered to avoid
// wasted/invalid impressions on hidden ads.
export function AdResponsive({ className }: { className?: string }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isMobile === null) return null;
  return <AdBanner size={isMobile ? "320x50" : "728x90"} className={className} />;
}
