"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity } from "@/lib/types";
import { ActivityIllustration } from "./ActivityIllustration";
import { StarRating } from "./StarRating";

function randomIndex(length: number, exclude: number | null): number {
  if (length <= 1) return 0;
  let idx = Math.floor(Math.random() * length);
  if (idx === exclude) idx = (idx + 1) % length;
  return idx;
}

export function SurpriseMe({ activities }: { activities: Activity[] }) {
  // Index 0 for the deterministic first (server-matching) render; a
  // client-only effect then rerolls, avoiding an SSR/CSR hydration mismatch
  // from calling Math.random() during render.
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // One-time sync from a non-deterministic source, not derived state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex(randomIndex(activities.length, null));
    setReady(true);
  }, [activities.length]);

  const activity = activities[index];

  if (!activity || !ready) {
    return <div className="mx-auto max-w-2xl px-6 py-12" />;
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          🎲 <span className="text-brand">Surprise Me</span>
        </h1>
        <p className="mt-3 text-foreground/70">
          Can&apos;t decide? Here&apos;s one activity, picked for you.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg dark:border-white/10 dark:bg-white/5">
        <ActivityIllustration activity={activity} className="aspect-[3/2] w-full" />
        <div className="p-6">
          <h2 className="text-2xl font-bold">{activity.name}</h2>
          <p className="mt-2 text-foreground/70">{activity.summary}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground/60">
            <span>🏷️ {activity.category}</span>
            <span>
              👥 {activity.groupSizeMin}–{activity.groupSizeMax}
            </span>
            <span>⏱️ {activity.durationMinutes} min</span>
            <span>🔧 {activity.prepEffort}</span>
          </div>

          <div className="mt-4">
            <StarRating activityId={activity.id} />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setIndex((i) => randomIndex(activities.length, i))}
              className="flex-1 rounded-full bg-brand px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              🎲 Choose Another
            </button>
            <Link
              href={`/activities/${activity.id}`}
              className="flex-1 rounded-full border border-black/10 px-5 py-3 text-center font-semibold transition-colors hover:border-brand hover:text-brand dark:border-white/10"
            >
              View Full Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
