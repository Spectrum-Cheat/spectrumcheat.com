"use client";

import { useState } from "react";

export function CopyButtons({ script, title }: { script: string; title: string }) {
  const [copied, setCopied] = useState(false);

  function copyScript() {
    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function downloadScript() {
    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, "_")}.lua`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="sdetail-actions">
      <button className="sdetail-btn sdetail-btn--copy" onClick={copyScript}>
        {copied ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy Script
          </>
        )}
      </button>
      <button className="sdetail-btn sdetail-btn--download" onClick={downloadScript}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download .lua
      </button>
    </div>
  );
}

export function RawHeader({ script, title, slug }: { script: string; title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  function copyScript() {
    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function downloadScript() {
    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, "_")}.lua`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="sdetail-raw-header">
      <a
        href={`https://rawscripts.net/raw/${slug}`}
        target="_blank"
        rel="noreferrer"
        className="sdetail-section-title sdetail-raw-title-link"
        style={{ marginBottom: 0 }}
      >
        View Raw ↗
      </a>
      <div className="sdetail-raw-actions">
        <button className="sdetail-raw-btn" onClick={copyScript}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {copied ? "Copied!" : "Copy Script"}
        </button>
        <button className="sdetail-raw-btn sdetail-raw-btn--dl" onClick={downloadScript}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download
        </button>
      </div>
    </div>
  );
}
