"use client";

import { useState } from "react";
import { SubpageShell } from "../_components/subpage-shell";

const loaderCode =
  "loadstring(game:HttpGet('https://raw.githubusercontent.com/xZPUHigh/Spectrum-Cloud/main/Loader.lua'))()";
const loaderDisplayCode = `loadstring(game:HttpGet('https://raw.githubusercontent.com/xZPUHigh/Spectrum-Cloud/main/Loader.lua'))()`;

const scriptGames = [
  {
    name: "Driving Empire",
    status: "Working",
    note: "Live now with active script access.",
    image: "https://tr.rbxcdn.com/180DAY-3fd9af34a6e61185a030eb8d936e91ac/256/256/Image/Webp/noFilter",
    href: "https://www.roblox.com/games/3351674303/Driving-Empire-Car-Racing",
  },
  {
    name: "Sailor Piece",
    status: "Working",
    note: "Stable build ready for use.",
    image: "https://tr.rbxcdn.com/180DAY-af4eed326351cb513869c431e3d88787/256/256/Image/Webp/noFilter",
    href: "https://www.roblox.com/games/77747658251236/Sailor-Piece",
  },
  {
    name: "Blox Fruits",
    status: "Waiting for Update",
    note: "Queued for the next refresh cycle.",
    image: "https://tr.rbxcdn.com/180DAY-90afa57850c8c8d1518b398b6c119ee9/256/256/Image/Webp/noFilter",
    href: "https://www.roblox.com/games/2753915549/Blox-Fruits",
  },
  {
    name: "Fisch",
    status: "Waiting for Update",
    note: "Patch support is being rebuilt.",
    image: "https://tr.rbxcdn.com/180DAY-911933467f0dc8e467cf3e305ea78882/256/256/Image/Webp/noFilter",
    href: "https://www.roblox.com/games/16732694052/Fisch",
  },
  {
    name: "Rivals",
    status: "Waiting for Update",
    note: "Compatibility update in progress.",
    image: "https://tr.rbxcdn.com/180DAY-3df3c12313ef02c6656f378f110d72cd/256/256/Image/Webp/noFilter",
    href: "https://www.roblox.com/games/17625359962/RIVALS",
  },
  {
    name: "Bite By Night",
    status: "Waiting for Update",
    note: "Queued for the next compatibility rebuild.",
    image: "https://tr.rbxcdn.com/180DAY-2b392211182b7171397e09caa3be62de/256/256/Image/Webp/noFilter",
    href: "https://www.roblox.com/games/70845479499574/Bite-By-Night",
  },
];

export default function ScriptsPage() {
  const [copied, setCopied] = useState(false);

  const copyLoader = async () => {
    try {
      await navigator.clipboard.writeText(loaderCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <SubpageShell
      badge="Spectrum Cheat // Script Library"
      title="Scripts"
      subtitle="Browse the current Spectrum lineup, jump into supported games, and copy the main loader from one clean hub."
    >
      <div className="subpage-grid-cards scripts-top-grid">
        <div className="subpage-card accent-card loader-card">
          <div className="subpage-card-header">
            <h2>Main Loader</h2>
            <span className="subpage-chip">Universal</span>
          </div>
          <p>
            Use the main Spectrum loader below for supported games. Copy it once, then launch
            through your executor as usual.
          </p>
          <div className="loader-code-box">
            <pre>
              <code>{loaderDisplayCode}</code>
            </pre>
          </div>
          <div className="subpage-actions">
            <button
              type="button"
              onClick={copyLoader}
              className={copied ? "btn-primary btn-large copied-state" : "btn-primary btn-large"}
            >
              {copied ? "Copied" : "Copy Loader"}
            </button>
            <a href="https://discord.gg/hackerclub" target="_blank" rel="noreferrer" className="btn-outline">
              Need Help?
            </a>
          </div>
        </div>

        <div className="subpage-card scripts-summary-card">
          <div className="subpage-card-header">
            <h2>Access Overview</h2>
            <span className="subpage-chip">67+ Games</span>
          </div>
          <div className="scripts-mini-stats">
            <div>
              <strong>2</strong>
              <span>Working</span>
            </div>
            <div>
              <strong>4</strong>
              <span>Waiting</span>
            </div>
            <div>
              <strong>62</strong>
              <span>Retired</span>
            </div>
          </div>
          <p>
            Working titles, update queues, and wider catalog support all feed back into the main
            Spectrum library from here.
          </p>
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
                <a href={game.href} target="_blank" rel="noreferrer" className="script-game-title">
                  {game.name}
                </a>
                <span
                  className={
                    game.status === "Working"
                      ? "status-pill working"
                      : game.status === "Waiting for Update"
                        ? "status-pill waiting"
                        : "status-pill listed"
                  }
                >
                  {game.status}
                </span>
              </div>
              <p>{game.note}</p>
              <div className="script-game-actions">
                <button
                  type="button"
                  onClick={copyLoader}
                  className={copied ? "btn-outline copied-state" : "btn-outline"}
                >
                  {copied ? "Copied" : "Copy Loader"}
                </button>
                <a href={game.href} target="_blank" rel="noreferrer" className="btn-ghost">
                  Open Game
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SubpageShell>
  );
}
