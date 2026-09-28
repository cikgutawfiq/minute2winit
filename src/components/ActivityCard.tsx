import Link from "next/link";
import { Activity } from "@/lib/types";

const ENERGY_STYLES: Record<Activity["energyLevel"], string> = {
  Low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  Medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  High: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
};

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Link
      href={`/activities/${activity.id}`}
      className="group flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-5 transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold leading-snug group-hover:text-brand transition-colors">
          {activity.name}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${ENERGY_STYLES[activity.energyLevel]}`}
        >
          {activity.energyLevel}
        </span>
      </div>

      <p className="text-sm text-foreground/70 line-clamp-2">{activity.summary}</p>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs text-foreground/60">
        <span>🏷️ {activity.category}</span>
        <span>
          👥 {activity.groupSizeMin}–{activity.groupSizeMax}
        </span>
        <span>⏱️ {activity.durationMinutes} min</span>
        <span>🔧 {activity.prepEffort}</span>
      </div>
    </Link>
  );
}
