"use client";

import { useEffect } from "react";
import { SubpageShell } from "../_components/subpage-shell";
import { FallingBeams } from "../_components/falling-beams";
import { useLang } from "../_i18n/context";
import type { TranslationKey } from "../_i18n/translations";

const statusHighlights: { title: string; state: "Working" | "Waiting for Update"; noteKey: TranslationKey; image: string; href: string }[] = [
  { title: "Driving Empire", state: "Waiting for Update", noteKey: "gameNote1", image: "https://tr.rbxcdn.com/180DAY-3fd9af34a6e61185a030eb8d936e91ac/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/3351674303/Driving-Empire-Car-Racing" },
  { title: "Sailor Piece",   state: "Waiting for Update", noteKey: "gameNote2", image: "https://tr.rbxcdn.com/180DAY-af4eed326351cb513869c431e3d88787/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/77747658251236/Sailor-Piece" },
  { title: "Blox Fruits",    state: "Waiting for Update", noteKey: "gameNote3", image: "https://tr.rbxcdn.com/180DAY-90afa57850c8c8d1518b398b6c119ee9/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/2753915549/Blox-Fruits" },
  { title: "Fisch",          state: "Waiting for Update", noteKey: "gameNote4", image: "https://tr.rbxcdn.com/180DAY-911933467f0dc8e467cf3e305ea78882/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/16732694052/Fisch" },
  { title: "Rivals",         state: "Waiting for Update", noteKey: "gameNote5", image: "https://tr.rbxcdn.com/180DAY-3df3c12313ef02c6656f378f110d72cd/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/17625359962/RIVALS" },
  { title: "Grow a Garden 2", state: "Waiting for Update", noteKey: "gameNote6", image: "https://tr.rbxcdn.com/180DAY-e87bf2524ceeb4909aa2f15f555f38cf/256/256/Image/Webp/noFilter", href: "https://www.roblox.com/games/97598239454123/Grow-a-Garden-2" },
];

const retiredGames = [
  "99 Nights in the Forest","Adopt Me","All Star Tower Defense","All Star Tower Defense X","Anime Adventures","Anime Champions","Anime Dimensions","Anime Rangers X","Anime Reborns","Anime Vanguards","Arise Crossover","Arsenal","Attack on Titan Revolution","Basketball: Zero","Be a Lucky Block","BedWars","Bee Swarm Simulator","Bite By Night","Bizarre Lineage","Blade Ball","Block Spin","Blue Lock: Rivals","Brookhaven RP","Build A Boat For Treasure","Build a Zoo","Dead Rails","Deepwoken","Demon Fall","Doors","Escape Tsunami for Brainrots","Evade","Fish It","Ghoul://RE","Grand Piece Online","Grow a garden","Hunters","Hypershot","JAILBREAK","Jujutsu Shenanigans","King Legacy","Mad City: Chapter 1","Mad City: Chapter 2","Murderer mystery 2","My Restaurant","Natural Disaster Survival","Ninja Legends","Pet Simulator 99","Pet Simulator X","Pets Go","Phantom Forces","Plants VS Brainrots","PLS DONATE","Project Mugetsu","Project Slayers","Shinobi Life","Sol's RNG","Stand Upright: Rebooted","Steal A Brainrot","The Forge","The Mimic","The Strongest Battlegrounds","Toilet Tower Defense","Untitled Boxing Game","Volleyball Legends",
];

export default function StatusClient() {
  const { t } = useLang();

  useEffect(() => {
    document.documentElement.classList.add("page-status");
    return () => document.documentElement.classList.remove("page-status");
  }, []);

  const stats = [
    { value: "0",  label: t("statusWorkingTitle"), tone: "ok" },
    { value: "6",  label: t("statusWaitingTitle"), tone: "warn" },
    { value: "63", label: t("statusDiscTitle"),    tone: "muted" },
  ];

  return (
    <SubpageShell
      badge={t("statusBadge")}
      title={t("statusPageTitle")}
      subtitle={t("statusPageSub")}
      pageClass="subpage-scripts subpage-status"
    >
      <FallingBeams />

      {/* Stats row */}
      <div className="scr-stats-row">
        {stats.map((s) => (
          <div key={s.label} className={`scr-stat scr-stat--${s.tone}`}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Live highlights */}
      <h3 className="scr-section-title">{t("statusWaitingTitle")}</h3>
      <div className="scr-catalog">
        {statusHighlights.map((item) => (
          <article key={item.title} className="scr-game-card">
            <a href={item.href} target="_blank" rel="noreferrer" className="scr-game-media">
              <img src={item.image} alt={item.title} loading="lazy" />
              <span className={`scr-status-pill ${item.state === "Working" ? "is-working" : "is-waiting"}`}>
                {item.state === "Working" ? t("statusPillWorking") : t("statusPillWaiting")}
              </span>
            </a>
            <div className="scr-game-body">
              <a href={item.href} target="_blank" rel="noreferrer" className="scr-game-title">{item.title}</a>
              <p className="scr-game-note">{t(item.noteKey)}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Retired */}
      <div className="status-retired-card">
        <div className="status-retired-head">
          <h3>{t("statusDiscTitle")}</h3>
          <span className="status-retired-count">{t("statusDiscCount")}</span>
        </div>
        <p className="status-retired-desc">{t("statusDiscDesc")}</p>
        <div className="status-retired-list">
          {retiredGames.map((game) => (
            <span key={game} className="status-retired-pill">{game}</span>
          ))}
        </div>
      </div>
    </SubpageShell>
  );
}
