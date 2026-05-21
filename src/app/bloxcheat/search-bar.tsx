"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useTransition, useRef, useEffect } from "react";

interface Filters {
  verified: boolean;
  universal: boolean;
  patched: boolean;
  keySystem: boolean;
  scriptType: "" | "free" | "paid";
  sortBy: "" | "views" | "createdAt" | "likeCount";
  sortOrder: "" | "desc" | "asc";
  strict: boolean;
}

const DEFAULT_FILTERS: Filters = {
  verified: false,
  universal: false,
  patched: false,
  keySystem: false,
  scriptType: "",
  sortBy: "",
  sortOrder: "",
  strict: false,
};

function readFilters(params: URLSearchParams): Filters {
  return {
    verified:   params.get("verified") === "1",
    universal:  params.get("universal") === "1",
    patched:    params.get("patched") === "1",
    keySystem:  params.get("key") === "1",
    scriptType: (params.get("type") ?? "") as Filters["scriptType"],
    sortBy:     (params.get("sortBy") ?? "") as Filters["sortBy"],
    sortOrder:  (params.get("sortOrder") ?? "") as Filters["sortOrder"],
    strict:     params.get("strict") === "1",
  };
}

export function SearchBar({ defaultValue = "", searchParamsStr = "" }: { defaultValue?: string; searchParamsStr?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();
  const [showFilter, setShowFilter] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const initialParams = new URLSearchParams(searchParamsStr);
  const [filters, setFilters] = useState<Filters>(() => readFilters(initialParams));

  const activeFilterCount = [
    filters.verified, filters.universal, filters.patched, filters.keySystem,
    !!filters.scriptType, !!filters.sortBy, filters.strict,
  ].filter(Boolean).length;

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    }
    if (showFilter) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showFilter]);

  function buildParams(q: string, f: Filters) {
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (f.verified)   p.set("verified", "1");
    if (f.universal)  p.set("universal", "1");
    if (f.patched)    p.set("patched", "1");
    if (f.keySystem)  p.set("key", "1");
    if (f.scriptType) p.set("type", f.scriptType);
    if (f.sortBy)     p.set("sortBy", f.sortBy);
    if (f.sortOrder)  p.set("sortOrder", f.sortOrder);
    if (f.strict)     p.set("strict", "1");
    return p;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowFilter(false);
    startTransition(() => {
      const p = buildParams(value, filters);
      router.push(`${pathname}${p.toString() ? "?" + p.toString() : ""}`);
    });
  }

  function applyFilters(f: Filters) {
    setFilters(f);
    setShowFilter(false);
    startTransition(() => {
      const p = buildParams(value, f);
      router.push(`${pathname}${p.toString() ? "?" + p.toString() : ""}`);
    });
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
    startTransition(() => {
      const p = new URLSearchParams();
      if (value.trim()) p.set("q", value.trim());
      router.push(`${pathname}${p.toString() ? "?" + p.toString() : ""}`);
    });
  }

  return (
    <div className="blox-search-section">
      <p className="blox-search-desc">
        Stop grinding. Find a <code className="blox-lua-label">script</code>, copy it, execute it.
      </p>

      <form className="blox-search-form" onSubmit={handleSubmit}>
        <div className="blox-search-wrap">
          <svg className="blox-search-icon" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="blox-search-input"
            type="text"
            placeholder='Search any game, script, or feature...'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          {value && (
            <button className="blox-search-clear" type="button"
              onClick={() => { setValue(""); startTransition(() => router.push(pathname)); }}>✕</button>
          )}

          {/* Filter button */}
          <div className="blox-filter-wrap" ref={panelRef}>
            <button
              type="button"
              className={`blox-filter-btn ${showFilter ? "active" : ""} ${activeFilterCount > 0 ? "has-filters" : ""}`}
              onClick={() => setShowFilter((v) => !v)}
              title="Advanced search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="11" y1="18" x2="13" y2="18" />
              </svg>
              {activeFilterCount > 0 && <span className="blox-filter-count">{activeFilterCount}</span>}
            </button>

            {/* Filter panel */}
            {showFilter && (
              <div className="blox-filter-panel">
                <div className="blox-filter-header">
                  <strong>Advanced search</strong>
                  <p>Use these settings to customize and fine-tune searches</p>
                </div>

                <div className="blox-filter-group">
                  <p className="blox-filter-group-title">Filter</p>

                  {[
                    { key: "verified",  label: "Verified" },
                    { key: "universal", label: "Universal" },
                    { key: "patched",   label: "Patched" },
                    { key: "keySystem", label: "Key system" },
                  ].map(({ key, label }) => (
                    <label key={key} className="blox-filter-check">
                      <span>{label}</span>
                      <input
                        type="checkbox"
                        checked={filters[key as keyof Filters] as boolean}
                        onChange={(e) => setFilters((f) => ({ ...f, [key]: e.target.checked }))}
                      />
                    </label>
                  ))}

                  <label className="blox-filter-row">
                    <span>Script type</span>
                    <select
                      className="blox-filter-select"
                      value={filters.scriptType}
                      onChange={(e) => setFilters((f) => ({ ...f, scriptType: e.target.value as Filters["scriptType"] }))}
                    >
                      <option value="">Any</option>
                      <option value="free">Free</option>
                      <option value="paid">Paid</option>
                    </select>
                  </label>
                </div>

                <div className="blox-filter-group">
                  <p className="blox-filter-group-title">Sort</p>

                  <label className="blox-filter-row">
                    <span>Sort by</span>
                    <select
                      className="blox-filter-select"
                      value={filters.sortBy}
                      onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value as Filters["sortBy"] }))}
                    >
                      <option value="">Default</option>
                      <option value="views">Views</option>
                      <option value="createdAt">Date</option>
                      <option value="likeCount">Likes</option>
                    </select>
                  </label>

                  <label className="blox-filter-row">
                    <span>Sort order</span>
                    <select
                      className="blox-filter-select"
                      value={filters.sortOrder}
                      onChange={(e) => setFilters((f) => ({ ...f, sortOrder: e.target.value as Filters["sortOrder"] }))}
                    >
                      <option value="">Default</option>
                      <option value="desc">Descending</option>
                      <option value="asc">Ascending</option>
                    </select>
                  </label>
                </div>

                <div className="blox-filter-actions">
                  <button type="button" className="blox-filter-save" onClick={() => applyFilters(filters)}>
                    Save changes
                  </button>
                  <button type="button" className="blox-filter-reset" onClick={resetFilters}>
                    Reset all
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="blox-search-btn" type="submit" disabled={isPending}>
            {isPending ? "..." : "Search"}
          </button>
        </div>

        {/* Strict search toggle */}
        <label className="blox-strict-toggle">
          <div
            className={`blox-toggle ${filters.strict ? "on" : ""}`}
            onClick={() => setFilters((f) => ({ ...f, strict: !f.strict }))}
          >
            <div className="blox-toggle-knob" />
          </div>
          <span>Strict search (match exact input)</span>
        </label>
      </form>
    </div>
  );
}
