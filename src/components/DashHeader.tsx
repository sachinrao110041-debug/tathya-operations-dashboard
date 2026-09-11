"use client";

import { useEffect, useRef } from "react";
import { AssetIcon } from "./AssetIcon";

export function DashHeader({
  query,
  onQuery,
}: {
  query: string;
  onQuery: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

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
        className="relative flex size-9 items-center justify-center rounded-[8px] border-[0.8px] border-[var(--primary-400)] bg-white"
        aria-label="Notifications"
      >
        <AssetIcon src="/icons/i-bell.svg" alt="" box={15} leaf={15} />
        <span className="absolute left-[20.4px] top-1.5 size-2 rounded-full border-[1.6px] border-white bg-[var(--red-100)]" />
      </button>
      <div className="flex size-9 items-center justify-center rounded-[18px] border-[0.8px] border-[var(--primary-300)] bg-[rgba(27,103,107,0.1)] text-[13.68px] font-semibold leading-[20.52px] text-[var(--primary-300)]">
        SC
      </div>
    </header>
  );
}
