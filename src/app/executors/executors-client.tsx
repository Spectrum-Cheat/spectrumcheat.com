"use client";

import { useState, useEffect } from "react";
import { SubpageShell } from "../_components/subpage-shell";
import { FallingBeams } from "../_components/falling-beams";
import { useLang } from "../_i18n/context";
import type { TranslationKey } from "../_i18n/translations";

interface Exploit {
  title: string; version: string; updatedDate: string; updateStatus: boolean;
  free: boolean; detected: boolean; cost: string; platform: string; extype: string;
  uncPercentage: number; suncPercentage: number; keysystem: boolean;
  websitelink: string; discordlink: string; purchaselink: string;
  note?: string; decompiler?: boolean; multiInject?: boolean; raknet?: boolean;
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

// Per-executor showcase/review video links (keyed by title, case-insensitive).
const SHOWCASE: Record<string, string> = {
  volt: "https://youtu.be/TB3xNdkZwSU",
  seliware: "https://youtu.be/Auo9Mv1J6Fg",
  isaeva: "https://youtu.be/1JmKRUwWK2Q",
  delta: "https://youtu.be/emqOTJ9MDyw",
};

function formatDate(dateStr: string): string {
  return dateStr.replace(" UTC", "").trim();
}

const COST_TERMS: { re: RegExp; key: TranslationKey }[] = [
  { re: /lifetime/gi, key: "execLifetime" },
  { re: /weekly/gi,   key: "execWeekly" },
  { re: /monthly/gi,  key: "execMonthly" },
  { re: /daily/gi,    key: "execDaily" },
  { re: /yearly/gi,   key: "execYearly" },
];

interface Props {
  exploits: Exploit[];
  versions: VersionsData | null;
}

export default function ExecutorsClient({ exploits, versions }: Props) {
  const { t } = useLang();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("page-executors");
    return () => document.documentElement.classList.remove("page-executors");
  }, []);

  const localizeCost = (cost: string) =>
    COST_TERMS.reduce((acc, { re, key }) => acc.replace(re, t(key)), cost);

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
      pageClass="subpage-executors"
    >
      <FallingBeams />

      <div className="scr-stats-row exec-stats-row">
        <div className="scr-stat scr-stat--ok">
          <strong>{updatedCount}</strong>
          <span>{t("executorsUpdCard")}</span>
        </div>
        <div className="scr-stat scr-stat--warn">
          <strong>{notUpdatedCount}</strong>
          <span>{t("executorsNotUpd")}</span>
        </div>
        <div className="scr-stat scr-stat--muted">
          <strong>{exploits.length}</strong>
          <span>{t("executorsTotal")}</span>
        </div>
      </div>

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
                  {group.map((exploit) => {
                    const isOpen = expanded === exploit.title;
                    const showcaseUrl = SHOWCASE[exploit.title.trim().toLowerCase()];
                    const hasLinks = exploit.websitelink || exploit.discordlink || exploit.purchaselink || showcaseUrl;
                    const hasStats = exploit.suncPercentage > 0 || exploit.uncPercentage > 0;
                    const hasCapabilities = exploit.decompiler !== undefined || exploit.multiInject !== undefined || exploit.raknet !== undefined;
                    const hasExpand = hasLinks || hasStats || hasCapabilities || exploit.note;
                    return (
                      <div key={exploit.title} className={`exec-row ${exploit.updateStatus ? "exec-row--updated" : "exec-row--outdated"} ${isOpen ? "exec-row--open" : ""}`}>
                        {/* ── Collapsed row ── */}
                        <div
                          className="exec-row-main"
                          onClick={() => hasExpand && setExpanded(isOpen ? null : exploit.title)}
                          style={{ cursor: hasExpand ? "pointer" : "default" }}
                        >
                          <div className="exec-row-left">
                            <span className="exec-title">{exploit.title}</span>
                            <div className="exec-row-tags">
                              {exploit.version && <span className="exec-tag version">{exploit.version}</span>}
                              {exploit.suncPercentage > 0 && <span className="exec-tag sunc">sUNC {exploit.suncPercentage}%</span>}
                              {exploit.free && <span className="exec-tag free">{t("executorsFree")}</span>}
                              {exploit.keysystem && <span className="exec-tag key">{t("executorsKeySystem")}</span>}
                              {exploit.detected && !exploit.updateStatus && <span className="exec-tag detected">{t("executorsDetected")}</span>}
                            </div>
                            <div className="exec-row-meta">
                              {exploit.cost && !exploit.free && <span className="exec-meta-item">{localizeCost(exploit.cost)}</span>}
                              {exploit.updatedDate && <span className="exec-meta-item exec-meta-date">{t("executorsLastUpdPrefix")} {formatDate(exploit.updatedDate)}</span>}
                            </div>
                          </div>
                          <div className="exec-row-right">
                            <span className={`exec-status-pill ${exploit.updateStatus ? "updated" : "outdated"}`}>
                              {exploit.updateStatus ? t("executorsUpdPill") : t("executorsNotUpdPill")}
                            </span>
                            {hasExpand && (
                              <svg
                                className={`exec-chevron ${isOpen ? "exec-chevron--open" : ""}`}
                                width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round"
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            )}
                          </div>
                        </div>

                        {/* ── Expanded content ── */}
                        {isOpen && (
                          <div className="exec-row-expand">
                            {exploit.note && (
                              <div className="exec-note">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span>{exploit.note}</span>
                              </div>
                            )}
                            {hasCapabilities && (
                              <div className="exec-capabilities">
                                {exploit.decompiler !== undefined && (
                                  <span className={`exec-cap-item ${exploit.decompiler ? "exec-cap--yes" : "exec-cap--no"}`}>
                                    Decompiler: {exploit.decompiler ? "✓" : "✗"}
                                  </span>
                                )}
                                {exploit.multiInject !== undefined && (
                                  <span className={`exec-cap-item ${exploit.multiInject ? "exec-cap--yes" : "exec-cap--no"}`}>
                                    Multi-Inject: {exploit.multiInject ? "✓" : "✗"}
                                  </span>
                                )}
                                {exploit.raknet !== undefined && (
                                  <span className={`exec-cap-item ${exploit.raknet ? "exec-cap--yes" : "exec-cap--no"}`}>
                                    Raknet: {exploit.raknet ? "✓" : "✗"}
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="exec-expand-body">
                              {hasLinks && (
                                <div className="exec-expand-links">
                                  {exploit.websitelink && (
                                    <a href={exploit.websitelink} target="_blank" rel="noreferrer" className="exec-link-btn" onClick={(e) => e.stopPropagation()}>
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                      {t("executorsWebsite")}
                                    </a>
                                  )}
                                  {showcaseUrl && (
                                    <a href={showcaseUrl} target="_blank" rel="noreferrer" className="exec-link-btn exec-link-btn--showcase" onClick={(e) => e.stopPropagation()}>
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/></svg>
                                      {t("executorsShowcase")}
                                    </a>
                                  )}
                                  {exploit.discordlink && (
                                    <a href={exploit.discordlink} target="_blank" rel="noreferrer" className="exec-link-btn" onClick={(e) => e.stopPropagation()}>
                                      <svg width="13" height="13" viewBox="0 -28.5 256 256" fill="currentColor" aria-hidden="true"><path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"/></svg>
                                      {t("navDiscord")}
                                    </a>
                                  )}
                                  {exploit.purchaselink && (
                                    <a href="https://spectrumcheat.rexzy.xyz/shop/category/Mg==" target="_blank" rel="noreferrer" className="exec-link-btn exec-link-btn--purchase" onClick={(e) => e.stopPropagation()}>
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                                      {t("executorsPurchase")}
                                    </a>
                                  )}
                                </div>
                              )}
                              {hasStats && (
                                <div className="exec-expand-stats">
                                  {exploit.suncPercentage > 0 && (
                                    <div className="exec-stat-item">
                                      <span className="exec-stat-label">sUNC</span>
                                      <span className="exec-stat-value">{exploit.suncPercentage}%</span>
                                    </div>
                                  )}
                                  {exploit.uncPercentage > 0 && (
                                    <div className="exec-stat-item">
                                      <span className="exec-stat-label">UNC</span>
                                      <span className="exec-stat-value">{exploit.uncPercentage}%</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      )}

    </SubpageShell>
  );
}
