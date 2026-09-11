"use client";

import { useEffect, useRef } from "react";
import { AssetIcon } from "./AssetIcon";
import { useDashboard } from "./AppShell";
import { useRouter } from "next/navigation";

export function DashHeader({
  query,
  onQuery,
}: {
  query: string;
  onQuery: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setPanel } = useDashboard();
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="flex items-center gap-3 px-3 py-2">
      <h1 className="min-w-0 flex-1 text-2xl font-semibold leading-8 tracking-normal text-[var(--neutral-1000)]">
        Good Morning, <span className="text-[var(--primary-400)]">Sachin</span>
      </h1>
      <label className="flex w-40 items-center gap-2 overflow-hidden rounded-2xl bg-white px-2 py-1">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="4.5" stroke="#3f7438" strokeWidth="1.2" />
          <path d="M10.5 10.5L13 13" stroke="#3f7438" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search"
          className="min-w-0 flex-1 bg-transparent text-sm leading-5 text-[var(--primary-400)] outline-none placeholder:text-[var(--primary-400)]"
        />
        <span className="w-5 rounded-[6px] border-[0.5px] border-[var(--primary-400)] text-center text-xs leading-4 text-[var(--primary-400)]">
          /
        </span>
      </label>
      <button
        type="button"
        onClick={() =>
          setPanel({
            title: "Notifications",
            body: (
              <div className="space-y-3">
                <div className="rounded-lg border border-[var(--neutral-200)] p-3">
                  <p className="text-sm font-medium text-[var(--neutral-1000)]">5 orders due for shipment today</p>
                  <p className="text-xs text-[var(--neutral-700)]">Open Orders and dispatch by 6 PM.</p>
                </div>
                <div className="rounded-lg border border-[var(--neutral-200)] p-3">
                  <p className="text-sm font-medium text-[var(--neutral-1000)]">6 SKUs are below reorder threshold</p>
                  <p className="text-xs text-[var(--neutral-700)]">Inventory watch recommends immediate PO.</p>
                </div>
                <div className="rounded-lg border border-[var(--neutral-200)] p-3">
                  <p className="text-sm font-medium text-[var(--neutral-1000)]">12 COD confirmations pending</p>
                  <p className="text-xs text-[var(--neutral-700)]">Record COD to avoid dispatch delays.</p>
                </div>
              </div>
            ),
            actions: [
              { label: "Open Orders", onClick: () => router.push("/orders") },
              { label: "Open COD Center", tone: "primary", onClick: () => router.push("/actions/record-cod") },
            ],
          })
        }
        className="relative flex size-9 items-center justify-center rounded-[8px] border-[0.8px] border-[var(--primary-400)] bg-white"
        aria-label="Notifications"
      >
        <AssetIcon src="/icons/i-bell.svg" alt="" box={15} leaf={15} />
        <span className="absolute left-[20.4px] top-1.5 size-2 rounded-full border-[1.6px] border-white bg-[var(--red-100)]" />
      </button>
      <button
        type="button"
        onClick={() =>
          setPanel({
            title: "Profile",
            body: (
              <div className="space-y-3">
                <div className="rounded-lg border border-[var(--neutral-200)] p-3">
                  <p className="text-sm font-semibold text-[var(--neutral-1000)]">Sachin C.</p>
                  <p className="text-xs text-[var(--neutral-700)]">Admin · Tathya Operations</p>
                </div>
                <div className="text-xs text-[var(--neutral-700)]">
                  Quick actions for profile, dashboard settings, and token reference.
                </div>
              </div>
            ),
            actions: [
              { label: "Design tokens", onClick: () => router.push("/tokens") },
              { label: "View suppliers", onClick: () => router.push("/suppliers") },
              { label: "Logout", tone: "primary", onClick: () => router.push("/") },
            ],
          })
        }
        className="flex size-9 items-center justify-center rounded-[18px] border-[0.8px] border-[var(--primary-300)] bg-[rgba(27,103,107,0.1)] text-[13.68px] font-semibold leading-[20.52px] text-[var(--primary-300)]"
        aria-label="Profile menu"
      >
        SC
      </button>
    </header>
  );
}
