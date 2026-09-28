import { Activity, Category, EnergyLevel, PrepEffort, SortKey } from "./types";

export interface Filters {
  search: string;
  category: Category | "";
  energyLevel: EnergyLevel | "";
  prepEffort: PrepEffort | "";
  groupSize: number | null;
  maxDuration: number | null;
}

export const DEFAULT_FILTERS: Filters = {
  search: "",
  category: "",
  energyLevel: "",
  prepEffort: "",
  groupSize: null,
  maxDuration: null,
};

export function hasActiveFilters(f: Filters): boolean {
  return Boolean(
    f.search || f.category || f.energyLevel || f.prepEffort || f.groupSize || f.maxDuration
  );
}

const ENERGY_RANK: Record<EnergyLevel, number> = { Low: 0, Medium: 1, High: 2 };
const PREP_RANK: Record<PrepEffort, number> = {
  "No Prep": 0,
  "Low Prep": 1,
  "Some Prep": 2,
  "High Prep": 3,
};

export function filterActivities(activities: Activity[], f: Filters): Activity[] {
  const search = f.search.trim().toLowerCase();

  return activities.filter((a) => {
    if (search) {
      const haystack = `${a.name} ${a.summary} ${a.tags.join(" ")}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    if (f.category && a.category !== f.category) return false;
    if (f.energyLevel && a.energyLevel !== f.energyLevel) return false;
    if (f.prepEffort && a.prepEffort !== f.prepEffort) return false;
    if (f.groupSize !== null) {
      if (a.groupSizeMin > f.groupSize || a.groupSizeMax < f.groupSize) return false;
    }
    if (f.maxDuration !== null && a.durationMinutes > f.maxDuration) return false;
    return true;
  });
}

export function sortActivities(
  activities: Activity[],
  key: SortKey | "random",
  direction: "asc" | "desc" = "asc"
): Activity[] {
  if (key === "random") return activities;

  const sorted = [...activities].sort((a, b) => {
    switch (key) {
      case "name":
        return a.name.localeCompare(b.name);
      case "duration":
        return a.durationMinutes - b.durationMinutes;
      case "groupSize":
        return a.groupSizeMin - b.groupSizeMin;
      case "energy":
        return ENERGY_RANK[a.energyLevel] - ENERGY_RANK[b.energyLevel];
      case "prep":
        return PREP_RANK[a.prepEffort] - PREP_RANK[b.prepEffort];
      default:
        return 0;
    }
  });

  return direction === "desc" ? sorted.reverse() : sorted;
}
