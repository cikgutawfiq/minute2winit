import { Activity, Category, EnergyLevel, PrepEffort, SortKey } from "./types";

export interface Filters {
  search: string;
  categories: Category[];
  energyLevels: EnergyLevel[];
  groupSize: number | null;
  maxDuration: number | null;
  prepEfforts: PrepEffort[];
}

export const DEFAULT_FILTERS: Filters = {
  search: "",
  categories: [],
  energyLevels: [],
  groupSize: null,
  maxDuration: null,
  prepEfforts: [],
};

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
    if (f.categories.length > 0 && !f.categories.includes(a.category)) return false;
    if (f.energyLevels.length > 0 && !f.energyLevels.includes(a.energyLevel)) return false;
    if (f.prepEfforts.length > 0 && !f.prepEfforts.includes(a.prepEffort)) return false;
    if (f.groupSize !== null) {
      if (a.groupSizeMin > f.groupSize || a.groupSizeMax < f.groupSize) return false;
    }
    if (f.maxDuration !== null && a.durationMinutes > f.maxDuration) return false;
    return true;
  });
}

export function sortActivities(
  activities: Activity[],
  key: SortKey,
  direction: "asc" | "desc" = "asc"
): Activity[] {
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
