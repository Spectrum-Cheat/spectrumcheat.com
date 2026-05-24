"use client";

import { useLang } from "../_i18n/context";

interface Props {
  query: string;
  sortBy: string;
  sortOrder: string;
  scriptCount: number;
}

export function BloxStatsBar({ query, sortBy, sortOrder, scriptCount }: Props) {
  const { t } = useLang();

  const label = query
    ? `${t("bloxResults")} "${query}"`
    : sortBy === "views" && sortOrder === "desc"
    ? t("bloxTrending")
    : t("bloxRecent");

  return (
    <div className="blox-stats-bar">
      <span className="blox-stats-item">
        <span className="badge-dot" />
        {label}
      </span>
      {scriptCount > 0 && (
        <span className="blox-stats-count">{scriptCount} {t("bloxScripts")}</span>
      )}
    </div>
  );
}
