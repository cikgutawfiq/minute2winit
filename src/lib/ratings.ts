// Ratings are stored per-browser in localStorage. There is no shared
// backend wired up yet, so this reflects "your rating on this device", not
// a cross-visitor community average. Good enough for one person or one
// shared kiosk device to mark favourites; upgrade to a real datastore
// (e.g. Vercel KV) if a true shared leaderboard is needed later.
const STORAGE_KEY = "minute2winit:ratings";
const listeners = new Set<() => void>();

type RatingsMap = Record<string, number>;

function readAll(): RatingsMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RatingsMap) : {};
  } catch {
    return {};
  }
}

function writeAll(map: RatingsMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // localStorage unavailable (private mode etc.) — rating just won't persist.
  }
  listeners.forEach((l) => l());
}

export function getRating(activityId: string): number {
  return readAll()[activityId] ?? 0;
}

export function setRating(activityId: string, stars: number): void {
  const all = readAll();
  all[activityId] = stars;
  writeAll(all);
}

export function subscribeRatings(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
