"use client";

import { useState, useEffect } from "react";
import { SubpageShell } from "../_components/subpage-shell";
import { FallingBeams } from "../_components/falling-beams";
import { useLang } from "../_i18n/context";
import type { TranslationKey } from "../_i18n/translations";

const loaderCode = "loadstring(game:HttpGet('https://api.spectrumcheat.com/loader.lua'))()";

const scriptGames: { name: string; status: "Working" | "Waiting for Update"; noteKey: TranslationKey; image: string; href: string }[] = [
  { name: "Driving Empire", status: "Waiting for Update", noteKey: "gameNote1", image: "https://tr.rbxcdn.com/180DAY-3fd9af34a6e61185a030eb8d936e91ac/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/3351674303/Driving-Empire-Car-Racing" },
  { name: "Blox Fruits",    status: "Waiting for Update", noteKey: "gameNote3", image: "https://tr.rbxcdn.com/180DAY-90afa57850c8c8d1518b398b6c119ee9/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/2753915549/Blox-Fruits" },
  { name: "Fisch",          status: "Waiting for Update", noteKey: "gameNote4", image: "https://tr.rbxcdn.com/180DAY-911933467f0dc8e467cf3e305ea78882/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/16732694052/Fisch" },
  { name: "Rivals",         status: "Working", noteKey: "gameNoteRivalsWorking", image: "https://tr.rbxcdn.com/180DAY-3df3c12313ef02c6656f378f110d72cd/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/17625359962/RIVALS" },
  { name: "Grow a Garden 2", status: "Waiting for Update", noteKey: "gameNote6", image: "https://tr.rbxcdn.com/180DAY-e87bf2524ceeb4909aa2f15f555f38cf/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/97598239454123/Grow-a-Garden-2" },
];

function CopyIcon({ done }: { done: boolean }) {
  return done ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export default function ScriptsPage() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("page-scripts");
    return () => document.documentElement.classList.remove("page-scripts");
  }, []);

  const copyLoader = async () => {
    try {
      await navigator.clipboard.writeText(loaderCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { setCopied(false); }
  };

  const stats = [
    { value: "1",  label: t("scriptsWorking"), tone: "ok" },
    { value: "4",  label: t("scriptsWaiting"), tone: "warn" },
    { value: "64", label: t("scriptsRetired"), tone: "muted" },
  ];

  return (
    <SubpageShell
      badge={t("scriptsBadge")}
      title={t("scriptsPageTitle")}
      subtitle={t("scriptsPageSub")}
      pageClass="subpage-scripts"
    >
      <FallingBeams />

      {/* Loader hero card */}
      <div className="scr-loader-card">
        <div className="scr-loader-head">
          <h2 className="scr-loader-title">{t("scriptsMainLoader")}</h2>
          <p className="scr-loader-desc">{t("scriptsLoaderDesc")}</p>
        </div>

        <div className="scr-code-box">
          <div className="scr-code-bar">
            <div className="scr-code-dots">
              <span /><span /><span />
            </div>
            <button
              type="button"
              onClick={copyLoader}
              className={`scr-code-copy${copied ? " is-copied" : ""}`}
            >
              <CopyIcon done={copied} />
              {copied ? t("scriptsCopied") : t("scriptsCopyLoader")}
            </button>
          </div>
          <pre><code>{loaderCode}</code></pre>
        </div>

        <div className="scr-loader-foot">
          <a href="https://discord.gg/hackerclub" target="_blank" rel="noreferrer" className="scr-help-link">
            {t("scriptsNeedHelp")}
          </a>
        </div>
      </div>

      {/* Stats row */}
      <div className="scr-stats-row">
        {stats.map((s) => (
          <div key={s.label} className={`scr-stat scr-stat--${s.tone}`}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Catalog */}
      <h3 className="scr-section-title">{t("scriptsAccessOvr")}</h3>
      <div className="scr-catalog">
        {scriptGames.map((game) => (
          <article key={game.name} className="scr-game-card">
            <a href={game.href} target="_blank" rel="noreferrer" className="scr-game-media">
              <img src={game.image} alt={game.name} loading="lazy" />
              <span className={`scr-status-pill ${game.status === "Working" ? "is-working" : "is-waiting"}`}>
                {game.status === "Working" ? t("statusPillWorking") : t("statusPillWaiting")}
              </span>
            </a>
            <div className="scr-game-body">
              <a href={game.href} target="_blank" rel="noreferrer" className="scr-game-title">{game.name}</a>
              <p className="scr-game-note">{t(game.noteKey)}</p>
              <div className="scr-game-actions">
                <a href={game.href} target="_blank" rel="noreferrer" className="scr-game-open">
                  {t("scriptsOpenGame")}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SubpageShell>
  );
}
