"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  CATEGORIES,
  Category,
  ENERGY_LEVELS,
  EnergyLevel,
  PREP_EFFORTS,
  PrepEffort,
  SortKey,
} from "@/lib/types";
import { DEFAULT_FILTERS, filterActivities, sortActivities } from "@/lib/filter";
import { ActivityCard } from "./ActivityCard";

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "name", label: "Name (A–Z)" },
  { key: "duration", label: "Duration (shortest first)" },
  { key: "groupSize", label: "Group size (smallest first)" },
  { key: "energy", label: "Energy level (lowest first)" },
  { key: "prep", label: "Prep effort (lowest first)" },
];

export function ActivityBrowser({ activities }: { activities: Activity[] }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortKey, setSortKey] = useState<SortKey>("name");

  const results = useMemo(() => {
    const filtered = filterActivities(activities, filters);
    return sortActivities(filtered, sortKey);
  }, [activities, filters, sortKey]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Find Your Perfect{" "}
          <span className="text-brand">Team Building Activity</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
          {activities.length} icebreakers, energisers, Minute to Win It
          challenges and trust-builders — searchable by group size, time,
          energy and prep effort.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search by name, summary or tag…"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-brand dark:border-white/10 dark:bg-white/5"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="space-y-6">
          <FilterGroup title="Category">
            {CATEGORIES.map((c) => (
              <Checkbox
                key={c}
                label={c}
                checked={filters.categories.includes(c)}
                onChange={() =>
                  setFilters({ ...filters, categories: toggle<Category>(filters.categories, c) })
                }
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Effort level">
            {ENERGY_LEVELS.map((e) => (
              <Checkbox
                key={e}
                label={e}
                checked={filters.energyLevels.includes(e)}
                onChange={() =>
                  setFilters({ ...filters, energyLevels: toggle<EnergyLevel>(filters.energyLevels, e) })
                }
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Prep effort">
            {PREP_EFFORTS.map((p) => (
              <Checkbox
                key={p}
                label={p}
                checked={filters.prepEfforts.includes(p)}
                onChange={() =>
                  setFilters({ ...filters, prepEfforts: toggle<PrepEffort>(filters.prepEfforts, p) })
                }
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Group size">
            <input
              type="number"
              min={1}
              placeholder="e.g. 12 people"
              value={filters.groupSize ?? ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  groupSize: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-brand dark:border-white/10 dark:bg-white/5"
            />
          </FilterGroup>

          <FilterGroup title="Max duration (minutes)">
            <input
              type="number"
              min={1}
              placeholder="e.g. 15"
              value={filters.maxDuration ?? ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxDuration: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-brand dark:border-white/10 dark:bg-white/5"
            />
          </FilterGroup>

          {(filters.categories.length > 0 ||
            filters.energyLevels.length > 0 ||
            filters.prepEfforts.length > 0 ||
            filters.groupSize ||
            filters.maxDuration ||
            filters.search) && (
            <button
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="text-sm font-medium text-brand hover:underline"
            >
              Clear all filters
            </button>
          )}
        </aside>

        {/* Results */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-foreground/60">
              {results.length} activit{results.length === 1 ? "y" : "ies"} found
            </p>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-brand dark:border-white/10 dark:bg-white/5"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>
          </div>

          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-black/10 p-12 text-center text-foreground/60 dark:border-white/10">
              No activities match your filters. Try clearing a few.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((a) => (
                <ActivityCard key={a.id} activity={a} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-foreground/50">
        {title}
      </h3>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-black/20 text-brand accent-brand"
      />
      {label}
    </label>
  );
}
