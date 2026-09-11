"use client";

import { actionItems } from "@/lib/data";
import { AssetIcon } from "./AssetIcon";

export function ActionItems({
  onAction,
}: {
  onAction: (key: "orders" | "stock" | "cod" | "shipments") => void;
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-[var(--primary-100)] bg-white p-4 lg:grid-cols-2">
      {actionItems.map((item) => (
        <div
          key={item.n}
          className="flex w-full items-start gap-4 rounded-xl border border-[var(--ink-line)] bg-[var(--surface)] px-4 py-4 transition hover:shadow-[var(--elev-1)]"
        >
          <div className="flex w-4 flex-col items-center gap-1.5 pt-1">
            <span className="h-5 w-px rounded-full bg-[var(--t2-400)]" />
            <span className="font-[family-name:var(--font-jetbrains)] text-[8px] tracking-[0.8px] text-[var(--t2-400)]">
              {item.n}
            </span>
          </div>
          <div className="flex size-7 items-center justify-center rounded-[8px] border-[0.8px] border-[var(--t2-400)] bg-[var(--t2-alpha-10)]">
            <AssetIcon src={item.icon} alt="" box={13} leaf={13} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold leading-[17.875px] text-[var(--neutral-1000)]">{item.title}</p>
            <p className="pt-0.5 text-xs leading-[19.5px] text-[var(--neutral-800)]">
              {item.body.map((p, i) =>
                p.strong ? (
                  <span key={i} className="font-semibold text-[var(--neutral-1000)]">
                    {p.t}
                  </span>
                ) : (
                  <span key={i}>{p.t}</span>
                ),
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onAction(item.actionKey)}
            className="mt-1.5 flex items-center gap-1.5 rounded-full border border-[var(--primary-100)] px-2 py-1 text-xs font-medium text-[var(--primary-400)]"
          >
            {item.cta}
            <AssetIcon src="/icons/i-arrow.svg" alt="" box={11} leaf={11} />
          </button>
        </div>
      ))}
    </div>
  );
}
