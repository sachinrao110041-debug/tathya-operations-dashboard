"use client";

import { useState } from "react";

export function KpiCard({
  title,
  value,
  chart: _chart,
}: {
  title: string;
  value: string;
  chart: string;
}) {
  const [range, setRange] = useState<"today" | "yesterday">("today");
  const today = [42, 30, 18, 26, 34, 38];
  const yesterday = [20, 28, 32, 40, 22, 16];

  return (
    <button
      type="button"
      onClick={() => setRange((r) => (r === "today" ? "yesterday" : "today"))}
      className="h-[124px] w-full appearance-none overflow-hidden rounded-[16px] border border-[var(--primary-100)] bg-[var(--base-alpha-50)] p-[3px] text-left shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-200)] focus-visible:ring-offset-1"
    >
      <div className="grid h-full grid-rows-[78px_1fr] rounded-xl bg-white px-2 py-2">
        <div className="grid min-h-0 grid-cols-[1fr_116px] items-start gap-3">
          <div className="shrink-0 pt-0.5">
            <p className="text-sm font-semibold leading-5">{title}</p>
            <p className="text-base font-semibold leading-6">
              {range === "today" ? value : String(Math.max(1, Number(value) - 4))}
            </p>
          </div>
          <div className="mt-1 flex h-[58px] w-[116px] shrink-0 items-end gap-1.5 overflow-hidden">
            {today.map((h, i) => (
              <div key={`bar-${i}`} className="relative flex h-full w-[14px] items-end">
                <span
                  className="absolute bottom-0 left-0 w-[14px] rounded-t-[30px] bg-[var(--primary-100)]"
                  style={{ height: `${Math.min(58, h)}px` }}
                />
                <span
                  className="absolute bottom-0 left-[3px] w-[8px] rounded-t-[30px] bg-[var(--primary-300)]"
                  style={{ height: `${Math.min(58, yesterday[i])}px` }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 pb-0.5">
          <span className="flex items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/legend-today.svg" alt="" width={16} height={8} className="block" />
            <span className="text-[10px] leading-4">Today</span>
          </span>
          <span className="flex min-w-0 items-center gap-1.5">
            <span className="h-2 w-4 shrink-0 rounded-[20px] bg-[var(--primary-300)]" />
            <span className="text-[10px] leading-4">Yesterday</span>
            <span className="truncate text-[10px] leading-[18px] text-[#9d9893]">+12% vs yesterday</span>
          </span>
        </div>
      </div>
    </button>
  );
}
