"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, SortKey } from "@/lib/types";
import { DEFAULT_FILTERS, Filters, filterActivities, sortActivities } from "@/lib/filter";
import { shuffle } from "@/lib/shuffle";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { ActivityCard } from "./ActivityCard";
import { FilterPanel } from "./FilterPanel";

const PAGE_SIZE = 20; // desktop: 4 columns x 5 rows; mobile: infinite-scroll chunk

export function ActivityBrowser({ activities }: { activities: Activity[] }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortKey, setSortKey] = useState<SortKey | "random">("random");
  const [order, setOrder] = useState(activities);
  const [page, setPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Randomize once on the client after mount, so the server-rendered order
  // (used for the first paint / hydration) stays deterministic. This is a
  // one-time sync from a non-deterministic source (Date.now()), which is
  // exactly what an effect is for — not a derived-state anti-pattern.
  useEffect(() => {
    // One-time sync from a non-deterministic source, not derived state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(shuffle(activities, Date.now()));
  }, [activities]);

  const results = useMemo(() => {
    const filtered = filterActivities(order, filters);
    return sortActivities(filtered, sortKey);
  }, [order, filters, sortKey]);

  function updateFilters(next: Filters) {
    setFilters(next);
    setPage(1);
    setVisibleCount(PAGE_SIZE);
  }

  function updateSortKey(next: SortKey | "random") {
    setSortKey(next);
    setPage(1);
    setVisibleCount(PAGE_SIZE);
  }

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const pageItems = isDesktop
    ? results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : results.slice(0, visibleCount);

  // Infinite scroll on mobile: grow visibleCount once the sentinel is near
  // the viewport. Uses a scroll/resize listener (checked against
  // getBoundingClientRect) rather than IntersectionObserver, which proved
  // unreliable to trigger consistently across browser contexts. The initial
  // synchronous check (for a page that loads already scrolled, or a short
  // results list) is an intentional external-system sync, not derived state.
  useEffect(() => {
    if (isDesktop) return;

    function checkSentinel() {
      const el = sentinelRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 600) {
        setVisibleCount((v) => Math.min(v + PAGE_SIZE, results.length));
      }
    }

    checkSentinel();
    window.addEventListener("scroll", checkSentinel, { passive: true });
    window.addEventListener("resize", checkSentinel);
    return () => {
      window.removeEventListener("scroll", checkSentinel);
      window.removeEventListener("resize", checkSentinel);
    };
  }, [isDesktop, results.length]);

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

      <div className="mb-6 flex gap-3">
        <input
          type="search"
          placeholder="Search by name, summary or tag…"
          value={filters.search}
          onChange={(e) => updateFilters({ ...filters, search: e.target.value })}
          className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-brand dark:border-white/10 dark:bg-white/5"
        />
        <FilterPanel
          filters={filters}
          setFilters={updateFilters}
          sortKey={sortKey}
          setSortKey={updateSortKey}
          resultCount={results.length}
        />
      </div>

      <p className="mb-4 text-sm text-foreground/60">
        {results.length} activit{results.length === 1 ? "y" : "ies"} found
      </p>

      {results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-black/10 p-12 text-center text-foreground/60 dark:border-white/10">
          No activities match your filters. Try clearing a few.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pageItems.map((a) => (
              <ActivityCard key={a.id} activity={a} />
            ))}
          </div>

          {isDesktop ? (
            totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <PageButton disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                  ← Prev
                </PageButton>
                <span className="px-3 text-sm text-foreground/60">
                  Page {page} of {totalPages}
                </span>
                <PageButton disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                  Next →
                </PageButton>
              </div>
            )
          ) : (
            <div ref={sentinelRef} className="flex justify-center py-8">
              {visibleCount < results.length && (
                <span className="text-sm text-foreground/50">Loading more…</span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function PageButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-md border border-black/10 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40 hover:border-brand hover:text-brand dark:border-white/10"
    >
      {children}
    </button>
  );
}
