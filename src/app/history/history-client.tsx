"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SubpageShell } from "../_components/subpage-shell";
import { useLang } from "../_i18n/context";

type Tab = "orders" | "topup";

function HistoryContent() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) ?? "orders";
  const [tab, setTab] = useState<Tab>(initialTab);
  const [search, setSearch] = useState("");

  const tabs: { key: Tab; label: string }[] = [
    { key: "orders", label: t("historyTabOrders") },
    { key: "topup",  label: t("historyTabTopup") },
  ];

  const orderCols = [t("historyColProduct"), t("historyColQty"), t("historyColAmount"), t("historyColTimeOrder"), ""];
  const topupCols = [t("historyColProvider"), `${t("historyColAmount")} (฿)`, t("historyColTimeTopup")];

  const cols = tab === "orders" ? orderCols : topupCols;
  const searchPlaceholder = tab === "orders" ? t("historySearchOrders") : t("historySearchTopup");

  return (
    <SubpageShell
      badge={t("historyBadge")}
      title={t("historyTitle")}
      subtitle={t("historySub")}
      ctaLabel={t("navTopup")}
      ctaHref="/topup"
    >
      {/* Tabs */}
      <div className="history-tabs">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            className={`history-tab${tab === key ? " active" : ""}`}
            onClick={() => { setTab(key); setSearch(""); }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="history-search-wrap">
        <svg className="history-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          className="history-search"
          type="text"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="history-table-wrap">
        <table className="history-table">
          <thead>
            <tr>
              {cols.map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={cols.length} className="history-empty-cell">
                <div className="history-empty">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="9" y1="16" x2="12" y2="16" />
                  </svg>
                  <p className="history-empty-title">{t("historyEmpty")}</p>
                  <p className="history-empty-sub">{t("historyEmptySub")}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="history-pagination">
        <button className="history-page-btn" disabled>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span className="history-page-num active">1</span>
        <button className="history-page-btn" disabled>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </SubpageShell>
  );
}

export default function HistoryClient() {
  return (
    <Suspense fallback={null}>
      <HistoryContent />
    </Suspense>
  );
}
