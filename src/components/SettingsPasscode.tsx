"use client";

import { useEffect, useRef, useState } from "react";
import { parseCsv } from "@/lib/csv";
import { SHEET_ID } from "@/lib/sheet";

const PASSCODE = "80081";
const SHEET_EDIT_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit?gid=0`;
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

export function SettingsPasscode() {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [rows, setRows] = useState<string[][] | null>(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setOpen(false);
    setUnlocked(false);
    setCode("");
    setError(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (code !== PASSCODE) {
      setError(true);
      return;
    }
    setError(false);
    setUnlocked(true);
    setLoading(true);
    try {
      const text = await (await fetch(SHEET_CSV_URL, { cache: "no-store" })).text();
      setRows(parseCsv(text));
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Settings"
        className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/60 transition-colors hover:text-brand"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx={12} cy={12} r={3} />
          <path
            strokeLinecap="round"
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
          />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute right-0 z-30 mt-2 rounded-xl border border-black/10 bg-white shadow-xl dark:border-white/10 dark:bg-zinc-900 ${
            unlocked ? "w-[min(90vw,44rem)]" : "w-72"
          }`}
        >
          {!unlocked ? (
            <form onSubmit={submit} className="space-y-3 p-5">
              <h3 className="font-semibold">Admin access</h3>
              <p className="text-xs text-foreground/60">
                Enter the passcode to view the raw Google Sheet database.
              </p>
              <input
                type="password"
                inputMode="numeric"
                autoFocus
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(false);
                }}
                placeholder="Passcode"
                className={`w-full rounded-md border px-3 py-2 text-sm outline-none dark:bg-white/10 ${
                  error ? "border-red-500" : "border-black/10 focus:border-brand dark:border-white/10"
                }`}
              />
              {error && <p className="text-xs text-red-500">Incorrect passcode.</p>}
              <button
                type="submit"
                className="w-full rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Unlock
              </button>
            </form>
          ) : (
            <div className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Google Sheet database</h3>
                <a
                  href={SHEET_EDIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-brand hover:underline"
                >
                  Open in Google Sheets ↗
                </a>
              </div>
              {loading ? (
                <p className="py-8 text-center text-sm text-foreground/60">Loading sheet…</p>
              ) : (
                <div className="max-h-[60vh] overflow-auto rounded-md border border-black/10 dark:border-white/10">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead className="sticky top-0 bg-black/5 dark:bg-white/10">
                      <tr>
                        {rows?.[0]?.map((h, i) => (
                          <th key={i} className="whitespace-nowrap px-2 py-1.5 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows?.slice(1).map((r, i) => (
                        <tr key={i} className="border-t border-black/5 dark:border-white/5">
                          {r.map((c, j) => (
                            <td key={j} className="max-w-[16rem] truncate px-2 py-1.5" title={c}>
                              {c}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <button
                onClick={close}
                className="mt-3 text-xs font-medium text-foreground/60 hover:text-brand"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
