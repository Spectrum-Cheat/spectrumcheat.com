"use client";

import { SubpageShell } from "../_components/subpage-shell";
import { useLang } from "../_i18n/context";
import type { TranslationKey } from "../_i18n/translations";

interface Exploit {
  title: string; version: string; updatedDate: string; updateStatus: boolean;
  free: boolean; detected: boolean; cost: string; platform: string; extype: string;
  uncPercentage: number; suncPercentage: number; keysystem: boolean;
  websitelink: string; discordlink: string; purchaselink: string;
}

interface VersionsData {
  Windows?: string; WindowsDate?: string; Mac?: string; MacDate?: string;
  Android?: string; AndroidDate?: string;
}

const EXTYPE_KEY: Record<string, TranslationKey> = {
  wexecutor: "execWinExec",
  wexternal:  "execWinExternal",
  aexecutor:  "execAndroid",
  mexecutor:  "execMac",
  iexecutor:  "execiOS",
};

const EXTYPE_ORDER = ["wexecutor","aexecutor","mexecutor","iexecutor","wexternal"];

function formatDate(dateStr: string): string {
  return dateStr.replace(" UTC", "").trim();
}

interface Props {
  exploits: Exploit[];
  versions: VersionsData | null;
}

export default function ExecutorsClient({ exploits, versions }: Props) {
  const { t } = useLang();

  const updatedCount    = exploits.filter((e) => e.updateStatus).length;
  const notUpdatedCount = exploits.filter((e) => !e.updateStatus).length;
  const winVersion = versions?.Windows ?? null;
  const macVersion = versions?.Mac ?? null;
  const winDate    = versions?.WindowsDate ?? null;
  const macDate    = versions?.MacDate ?? null;

  return (
    <SubpageShell
      badge={t("executorsBadge")}
      title={t("executorsPageTitle")}
      subtitle={t("executorsPageSub")}
      ctaLabel={t("executorsBuyKey")}
      ctaHref="https://spectrumcheat.rexzy.xyz/shop/category/Mg=="
    >
      {versions && (winVersion || macVersion) && (
        <div className="subpage-card exec-version-card">
          <div className="exec-version-header">
            <div className="exec-version-label">
              <span className="badge-dot" />
              <span>{t("executorsVersions")}</span>
            </div>
            <span className="subpage-chip">{t("executorsAutoUpd")}</span>
          </div>
          <div className="exec-version-grid">
            {winVersion && (
              <div className="exec-version-item">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, color: "var(--accent-2)" }}>
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                </svg>
                <div>
                  <span className="exec-version-platform">Windows</span>
                  <code className="exec-version-hash">{winVersion}</code>
                  {winDate && <span className="exec-version-date">{t("executorsLastUpd")} {formatDate(winDate)}</span>}
                </div>
              </div>
            )}
            {macVersion && (
              <div className="exec-version-item">
                <svg viewBox="0 0 814 1000" width="18" height="18" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, color: "var(--accent-2)" }}>
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-167.2-37.5c-62.2 0-117.2-59.5-163.7-132.1C21.9 716.4 0 624.9 0 536.5c0-152.5 99.5-232.7 197.2-232.7 65.7 0 120.2 43.4 162.7 43.4 41 0 105.7-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
                </svg>
                <div>
                  <span className="exec-version-platform">Mac</span>
                  <code className="exec-version-hash">{macVersion}</code>
                  {macDate && <span className="exec-version-date">{t("executorsLastUpd")} {formatDate(macDate)}</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="subpage-grid-cards status-summary-grid exec-stats-grid">
        <div className="subpage-card status-summary-card working">
          <div className="subpage-card-header"><h2>{t("executorsUpdCard")}</h2><span className="subpage-chip">{updatedCount}</span></div>
          <p>{t("executorsUpdDesc")}</p>
        </div>
        <div className="subpage-card status-summary-card exec-outdated-card">
          <div className="subpage-card-header"><h2>{t("executorsNotUpd")}</h2><span className="subpage-chip">{notUpdatedCount}</span></div>
          <p>{t("executorsNotUpdDesc")}</p>
        </div>
        <div className="subpage-card status-summary-card offline">
          <div className="subpage-card-header"><h2>{t("executorsTotal")}</h2><span className="subpage-chip">{exploits.length}</span></div>
          <p>{t("executorsTotalDesc")}</p>
        </div>
      </div>

      {exploits.length === 0 ? (
        <div className="subpage-card" style={{ textAlign: "center", padding: "48px 28px" }}>
          <p>{t("executorsNoData")}</p>
        </div>
      ) : (
        <>
          {(() => {
            const found = Array.from(new Set(exploits.map((e) => e.extype).filter(Boolean)));
            return [...EXTYPE_ORDER.filter((x) => found.includes(x)), ...found.filter((x) => !EXTYPE_ORDER.includes(x))];
          })().map((extype) => {
            const group = exploits.filter((e) => e.extype === extype).sort((a, b) => Number(b.updateStatus) - Number(a.updateStatus));
            if (group.length === 0) return null;
            const labelKey = EXTYPE_KEY[extype];
            const label = labelKey ? t(labelKey) : extype;
            return (
              <div key={extype} className="exec-group">
                <div className="exec-group-header">
                  <span className="exec-group-title">{label}</span>
                  <span className="subpage-chip">{group.length}</span>
                </div>
                <div className="exec-list">
                  {group.map((exploit) => (
                    <div key={exploit.title} className={`exec-row ${exploit.updateStatus ? "exec-row--updated" : "exec-row--outdated"}`}>
                      <div className="exec-row-left">
                        <div className="exec-row-name">
                          <span className="exec-title">{exploit.title}</span>
                          {exploit.version && <span className="exec-tag version">{exploit.version}</span>}
                          {exploit.suncPercentage > 0 && <span className="exec-tag sunc">sUNC {exploit.suncPercentage}%</span>}
                          {exploit.free && <span className="exec-tag free">{t("executorsFree")}</span>}
                          {exploit.keysystem && <span className="exec-tag key">{t("executorsKeySystem")}</span>}
                          {exploit.detected && <span className="exec-tag detected">{t("executorsDetected")}</span>}
                        </div>
                        <div className="exec-row-meta">
                          {exploit.cost && !exploit.free && <span className="exec-meta-item">{exploit.cost}</span>}
                          {exploit.updatedDate && <span className="exec-meta-item exec-meta-date">{t("executorsLastUpdPrefix")} {formatDate(exploit.updatedDate)}</span>}
                        </div>
                      </div>
                      <div className="exec-row-right">
                        <div className="exec-links">
                          {exploit.websitelink && <a href={exploit.websitelink} target="_blank" rel="noreferrer" className="exec-link-btn">{t("executorsWebsite")}</a>}
                          {exploit.discordlink && <a href={exploit.discordlink} target="_blank" rel="noreferrer" className="exec-link-btn">{t("navDiscord")}</a>}
                        </div>
                        <span className={`exec-status-pill ${exploit.updateStatus ? "updated" : "outdated"}`}>
                          {exploit.updateStatus ? t("executorsUpdPill") : t("executorsNotUpdPill")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}

      <p className="exec-attribution">
        {t("executorsAttrib1")}{" "}
        <a href="https://weao.xyz" target="_blank" rel="noreferrer">WEAO (WhatExpsAre.Online)</a>.{" "}
        {t("executorsAttrib2")}
      </p>
    </SubpageShell>
  );
}
