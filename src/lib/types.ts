export type EnergyLevel = "Low" | "Medium" | "High";
export type PrepEffort = "No Prep" | "Low Prep" | "Some Prep" | "High Prep";

export type Category =
  | "Minute to Win It"
  | "Icebreaker"
  | "Energiser"
  | "Team Skills"
  | "Trust & Communication"
  | "Active & Physical"
  | "Creative & Craft"
  | "Virtual Friendly";

export interface Activity {
  id: string;
  name: string;
  category: Category;
  tags: string[];
  summary: string;
  objective: string;
  groupSizeMin: number;
  groupSizeMax: number;
  durationMinutes: number;
  energyLevel: EnergyLevel;
  prepEffort: PrepEffort;
  materials: string[];
  howToPlay: string[];
  rules: string[];
  variation?: string;
  debriefQuestions?: string[];
  illustration?: string;
  imageUrl?: string;
}

export const CATEGORIES: Category[] = [
  "Minute to Win It",
  "Icebreaker",
  "Energiser",
  "Team Skills",
  "Trust & Communication",
  "Active & Physical",
  "Creative & Craft",
  "Virtual Friendly",
];

export const ENERGY_LEVELS: EnergyLevel[] = ["Low", "Medium", "High"];
export const PREP_EFFORTS: PrepEffort[] = [
  "No Prep",
  "Low Prep",
  "Some Prep",
  "High Prep",
];

export type SortKey =
  | "name"
  | "duration"
  | "groupSize"
  | "energy"
  | "prep";
