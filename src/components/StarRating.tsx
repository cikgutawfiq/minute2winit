"use client";

import { useState, useSyncExternalStore } from "react";
import { getRating, setRating, subscribeRatings } from "@/lib/ratings";

export function StarRating({
  activityId,
  size = "md",
}: {
  activityId: string;
  size?: "sm" | "md";
}) {
  const rating = useSyncExternalStore(
    subscribeRatings,
    () => getRating(activityId),
    () => 0 // server snapshot: no rating until the client reads localStorage
  );
  const [hover, setHover] = useState<number | null>(null);

  const dim = size === "sm" ? "text-base" : "text-xl";

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex ${dim}`}
        onMouseLeave={() => setHover(null)}
        role="radiogroup"
        aria-label="Rate this activity"
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = (hover ?? rating) >= star;
          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={rating === star}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              onMouseEnter={() => setHover(star)}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setRating(activityId, star);
              }}
              className={`leading-none transition-colors ${
                filled ? "text-amber-400" : "text-black/20 dark:text-white/20"
              }`}
            >
              ★
            </button>
          );
        })}
      </div>
      {rating > 0 && size === "md" && (
        <span className="text-xs text-foreground/50">your rating</span>
      )}
    </div>
  );
}
