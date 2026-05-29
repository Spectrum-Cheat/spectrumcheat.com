"use client";

import { useState } from "react";
import { SubpageShell } from "../_components/subpage-shell";
import { useLang } from "../_i18n/context";
import type { TranslationKey } from "../_i18n/translations";

const loaderCode = "loadstring(game:HttpGet('https://raw.githubusercontent.com/xZPUHigh/Spectrum-Cloud/main/Loader.lua'))()";

const scriptGames: { name: string; status: "Working" | "Waiting for Update"; noteKey: TranslationKey; image: string; href: string }[] = [
  { name: "Driving Empire", status: "Waiting for Update", noteKey: "gameNote1", image: "https://tr.rbxcdn.com/180DAY-3fd9af34a6e61185a030eb8d936e91ac/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/3351674303/Driving-Empire-Car-Racing" },
  { name: "Sailor Piece",   status: "Waiting for Update", noteKey: "gameNote2", image: "https://tr.rbxcdn.com/180DAY-af4eed326351cb513869c431e3d88787/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/77747658251236/Sailor-Piece" },
  { name: "Blox Fruits",    status: "Waiting for Update", noteKey: "gameNote3", image: "https://tr.rbxcdn.com/180DAY-90afa57850c8c8d1518b398b6c119ee9/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/2753915549/Blox-Fruits" },
  { name: "Fisch",          status: "Waiting for Update", noteKey: "gameNote4", image: "https://tr.rbxcdn.com/180DAY-911933467f0dc8e467cf3e305ea78882/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/16732694052/Fisch" },
  { name: "Rivals",         status: "Waiting for Update", noteKey: "gameNote5", image: "https://tr.rbxcdn.com/180DAY-3df3c12313ef02c6656f378f110d72cd/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/17625359962/RIVALS" },
  { name: "Bite By Night",  status: "Waiting for Update", noteKey: "gameNote6", image: "https://tr.rbxcdn.com/180DAY-2b392211182b7171397e09caa3be62de/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/70845479499574/Bite-By-Night" },
];

export default function ScriptsPage() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const copyLoader = async () => {
    try {
      await navigator.clipboard.writeText(loaderCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { setCopied(false); }
  };

  return (
    <SubpageShell
      badge={t("scriptsBadge")}
      title={t("scriptsPageTitle")}
      subtitle={t("scriptsPageSub")}
    >
      <div className="subpage-grid-cards scripts-top-grid">
        <div className="subpage-card accent-card loader-card">
          <div className="subpage-card-header">
            <h2>{t("scriptsMainLoader")}</h2>
            <span className="subpage-chip">{t("badgeUniversal")}</span>
          </div>
          <p>{t("scriptsLoaderDesc")}</p>
          <div className="loader-code-box">
            <pre><code>{loaderCode}</code></pre>
          </div>
          <div className="subpage-actions">
            <button type="button" onClick={copyLoader} className={copied ? "btn-primary btn-large copied-state" : "btn-primary btn-large"}>
              {copied ? t("scriptsCopied") : t("scriptsCopyLoader")}
            </button>
            <a href="https://discord.gg/hackerclub" target="_blank" rel="noreferrer" className="btn-outline">
              {t("scriptsNeedHelp")}
            </a>
          </div>
        </div>

        <div className="subpage-card scripts-summary-card">
          <div className="subpage-card-header">
            <h2>{t("scriptsAccessOvr")}</h2>
            <span className="subpage-chip">{t("scriptsGamesCount")}</span>
          </div>
          <div className="scripts-mini-stats">
            <div><strong>2</strong><span>{t("scriptsWorking")}</span></div>
            <div><strong>4</strong><span>{t("scriptsWaiting")}</span></div>
            <div><strong>62</strong><span>{t("scriptsRetired")}</span></div>
          </div>
          <p>{t("scriptsOvrDesc")}</p>
        </div>
      </div>

      <div className="scripts-catalog-grid">
        {scriptGames.map((game) => (
          <article key={game.name} className="script-game-card">
            <a href={game.href} target="_blank" rel="noreferrer" className="script-game-media">
              <img src={game.image} alt={game.name} loading="lazy" />
            </a>
            <div className="script-game-body">
              <div className="script-game-top">
                <a href={game.href} target="_blank" rel="noreferrer" className="script-game-title">{game.name}</a>
                <span className={game.status === "Working" ? "status-pill working" : "status-pill waiting"}>
                  {game.status === "Working" ? t("statusPillWorking") : t("statusPillWaiting")}
                </span>
              </div>
              <p>{t(game.noteKey)}</p>
              <div className="script-game-actions">
                <button type="button" onClick={copyLoader} className={copied ? "btn-outline copied-state" : "btn-outline"}>
                  {copied ? t("scriptsCopied") : t("scriptsCopyLoader")}
                </button>
                <a href={game.href} target="_blank" rel="noreferrer" className="btn-ghost">{t("scriptsOpenGame")}</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SubpageShell>
  );
}
