"use client";

import Link from "next/link";
import { inventory } from "@/lib/data";

export function InventoryWatch({ onReorder }: { onReorder: (name: string) => void }) {
  return (
    <section>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl leading-8 text-[var(--neutral-1000)]">Inventory watch</h2>
          <p className="pt-1 text-xs font-semibold leading-4 text-[var(--primary-400)]">Products needing attention</p>
        </div>
        <Link href="/inventory" className="p-2 text-sm text-[var(--yellow-200)]">
          Review all →
        </Link>
      </div>
      <div className="mt-3 overflow-hidden rounded-2xl bg-[var(--surface)]">
        {inventory.map((item) => {
          const pct = Math.max(4, (item.left / item.max) * 100);
          const urgent = item.left <= 5;
          return (
            <div
              key={item.name}
              className="flex items-center gap-3 border-b-[0.8px] border-[rgba(51,51,51,0.1)] px-4 py-3 last:border-0"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-[rgba(51,51,51,0.1)] text-sm text-[rgba(51,51,51,0.35)]">
                {item.glyph}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-[var(--neutral-1000)]">{item.name}</p>
                <p className="pt-1 text-xs font-semibold text-[var(--primary-400)]">{item.category}</p>
              </div>
              <div className="flex min-w-[140px] flex-1 items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className={`text-base leading-6 ${urgent ? "text-[var(--red-100)]" : "text-[var(--yellow-200)]"}`}>
                    {item.left} left
                  </p>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-[rgba(51,51,51,0.1)]">
                    <div
                      className={`h-1 rounded-full ${urgent ? "bg-[var(--red-100)]" : "bg-[var(--yellow-200)]"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onReorder(item.name)}
                  className="h-8 min-w-[72px] rounded-full border-[0.8px] border-[var(--yellow-200)] px-2 text-xs font-semibold text-[var(--yellow-200)]"
                >
                  Reorder
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
