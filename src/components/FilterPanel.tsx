"use client";

import { useEffect, useRef, useState } from "react";
import {
  CATEGORIES,
  ENERGY_LEVELS,
  PREP_EFFORTS,
  SortKey,
} from "@/lib/types";
import { DEFAULT_FILTERS, Filters, hasActiveFilters } from "@/lib/filter";

const SORT_OPTIONS: { key: SortKey | "random"; label: string }[] = [
  { key: "random", label: "Shuffle (random)" },
  { key: "name", label: "Name (A–Z)" },
  { key: "duration", label: "Duration (shortest first)" },
  { key: "groupSize", label: "Group size (smallest first)" },
  { key: "energy", label: "Energy level (lowest first)" },
  { key: "prep", label: "Prep effort (lowest first)" },
];

const selectClass =
  "w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-brand dark:border-white/10 dark:bg-white/10";

export function FilterPanel({
  filters,
  setFilters,
  sortKey,
  setSortKey,
  resultCount,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  sortKey: SortKey | "random";
  setSortKey: (k: SortKey | "random") => void;
  resultCount: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = hasActiveFilters(filters);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Filter and sort activities"
        className={`relative flex h-11 w-11 items-center justify-center rounded-lg border transition-colors ${
          active
            ? "border-brand bg-brand/10 text-brand"
            : "border-black/10 bg-white text-foreground/70 hover:border-brand hover:text-brand dark:border-white/10 dark:bg-white/5"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
        </svg>
        {active && (
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-brand" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-80 max-w-[calc(100vw-2rem)] space-y-4 rounded-xl border border-black/10 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Filter &amp; sort</h3>
            <span className="text-xs text-foreground/50">{resultCount} found</span>
          </div>

          <Field label="Sort by">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey | "random")}
              className={selectClass}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Category">
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value as Filters["category"] })}
              className={selectClass}
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Effort level">
            <select
              value={filters.energyLevel}
              onChange={(e) => setFilters({ ...filters, energyLevel: e.target.value as Filters["energyLevel"] })}
              className={selectClass}
            >
              <option value="">Any energy</option>
              {ENERGY_LEVELS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Prep effort">
            <select
              value={filters.prepEffort}
              onChange={(e) => setFilters({ ...filters, prepEffort: e.target.value as Filters["prepEffort"] })}
              className={selectClass}
            >
              <option value="">Any prep</option>
              {PREP_EFFORTS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Group size">
              <input
                type="number"
                min={1}
                placeholder="e.g. 12"
                value={filters.groupSize ?? ""}
                onChange={(e) =>
                  setFilters({ ...filters, groupSize: e.target.value ? Number(e.target.value) : null })
                }
                className={selectClass}
              />
            </Field>
            <Field label="Max minutes">
              <input
                type="number"
                min={1}
                placeholder="e.g. 15"
                value={filters.maxDuration ?? ""}
                onChange={(e) =>
                  setFilters({ ...filters, maxDuration: e.target.value ? Number(e.target.value) : null })
                }
                className={selectClass}
              />
            </Field>
          </div>

          {active && (
            <button
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="text-sm font-medium text-brand hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-foreground/50">
        {label}
      </label>
      {children}
    </div>
  );
}
