import { parseCsv } from "./csv";
import { SEED_ACTIVITIES } from "@/data";
import {
  Activity,
  Category,
  EnergyLevel,
  PrepEffort,
} from "./types";

export const SHEET_ID =
  process.env.NEXT_PUBLIC_SHEET_ID ??
  "1UkN4n1v6IHoGkidwiCRqTFo6d-ISwpKBu5XfKB1k7TI";

const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

// Column order the Google Sheet is expected to use. List-type fields are
// pipe-separated ("Item A | Item B") so they stay editable in a single cell.
const COLUMNS = [
  "id",
  "name",
  "category",
  "tags",
  "summary",
  "objective",
  "groupSizeMin",
  "groupSizeMax",
  "durationMinutes",
  "energyLevel",
  "prepEffort",
  "materials",
  "howToPlay",
  "rules",
  "variation",
  "debriefQuestions",
  "illustration",
  "imageUrl",
] as const;

function splitList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split("|")
    .map((v) => v.trim())
    .filter(Boolean);
}

function rowToActivity(header: string[], row: string[]): Activity | null {
  const get = (col: (typeof COLUMNS)[number]) => {
    const idx = header.indexOf(col);
    return idx === -1 ? "" : (row[idx] ?? "").trim();
  };

  const id = get("id");
  const name = get("name");
  if (!id || !name) return null;

  const groupSizeMin = parseInt(get("groupSizeMin"), 10);
  const groupSizeMax = parseInt(get("groupSizeMax"), 10);
  const durationMinutes = parseInt(get("durationMinutes"), 10);

  return {
    id,
    name,
    category: (get("category") || "Icebreaker") as Category,
    tags: splitList(get("tags")),
    summary: get("summary"),
    objective: get("objective"),
    groupSizeMin: Number.isFinite(groupSizeMin) ? groupSizeMin : 1,
    groupSizeMax: Number.isFinite(groupSizeMax) ? groupSizeMax : 20,
    durationMinutes: Number.isFinite(durationMinutes) ? durationMinutes : 10,
    energyLevel: (get("energyLevel") || "Medium") as EnergyLevel,
    prepEffort: (get("prepEffort") || "Low Prep") as PrepEffort,
    materials: splitList(get("materials")),
    howToPlay: splitList(get("howToPlay")),
    rules: splitList(get("rules")),
    variation: get("variation") || undefined,
    debriefQuestions: splitList(get("debriefQuestions")),
    illustration: get("illustration") || undefined,
    imageUrl: get("imageUrl") || undefined,
  };
}

/**
 * Reads the activity database from the public Google Sheet. Falls back to
 * the bundled seed dataset if the sheet is empty or unreachable, so the site
 * always renders even before the sheet has been populated.
 */
export async function getActivities(): Promise<Activity[]> {
  try {
    const res = await fetch(CSV_URL, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);

    const text = await res.text();
    const rows = parseCsv(text);
    if (rows.length < 2) throw new Error("Sheet has no data rows");

    const header = rows[0].map((h) => h.trim());
    const activities = rows
      .slice(1)
      .map((row) => rowToActivity(header, row))
      .filter((a): a is Activity => a !== null);

    if (activities.length === 0) throw new Error("Sheet produced no valid rows");

    const seedById = new Map(SEED_ACTIVITIES.map((a) => [a.id, a]));
    return activities.map((a) =>
      a.illustration ? a : { ...a, illustration: seedById.get(a.id)?.illustration }
    );
  } catch {
    return SEED_ACTIVITIES;
  }
}

export function activitiesToCsv(activities: Activity[]): string {
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const lines = [COLUMNS.join(",")];

  for (const a of activities) {
    const row = [
      a.id,
      a.name,
      a.category,
      a.tags.join(" | "),
      a.summary,
      a.objective,
      String(a.groupSizeMin),
      String(a.groupSizeMax),
      String(a.durationMinutes),
      a.energyLevel,
      a.prepEffort,
      a.materials.join(" | "),
      a.howToPlay.join(" | "),
      a.rules.join(" | "),
      a.variation ?? "",
      (a.debriefQuestions ?? []).join(" | "),
      a.illustration ?? "",
      a.imageUrl ?? "",
    ].map(escape);
    lines.push(row.join(","));
  }

  return lines.join("\n");
}
