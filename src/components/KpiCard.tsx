"use client";

import { useState } from "react";

export function KpiCard({
  title,
  value,
  chart,
}: {
  title: string;
  value: string;
  chart: string;
}) {
  const [range, setRange] = useState<"today" | "yesterday">("today");
  return (
    <button
      type="button"
      onClick={() => setRange((r) => (r === "today" ? "yesterday" : "today"))}
      className="relative h-[111px] w-[259px] overflow-hidden rounded-[16px] border border-[var(--primary-100)] bg-[var(--base-alpha-50)] text-left shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]"
    >
      <div className="absolute left-[3px] top-[3px] h-20 w-[250px] rounded-xl bg-white" />
      <div className="absolute left-2 top-[11px] z-10">
        <p className="text-sm font-semibold leading-5">{title}</p>
        <p className="text-base font-semibold leading-6">{range === "today" ? value : String(Math.max(1, Number(value) - 4))}</p>
      </div>
      <div className="absolute left-[110px] top-3.5 h-[62px] w-[124px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={chart} alt="" width={124} height={42} className="absolute top-0 left-0" />
      </div>
      <div className="absolute bottom-0 left-[7px] flex w-[215px] items-end justify-between py-2 pl-2 pr-3">
        <span className="flex items-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/legend-today.svg" alt="" width={16} height={8} className="block" />
          <span className="text-[10px] leading-4">Today</span>
        </span>
        <span className="flex items-end gap-1">
          <span className="flex items-center gap-1">
            <span className="h-2 w-4 rounded-[20px] bg-[var(--primary-300)]" />
            <span className="text-[10px] leading-4">Yesterday</span>
          </span>
          <span className="text-[10px] leading-[18px] text-[#9d9893]">+12% vs yesterday</span>
        </span>
      </div>
    </button>
  );
}
