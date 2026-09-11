"use client";

import { ActionItems } from "@/components/ActionItems";
import { AssetIcon } from "@/components/AssetIcon";
import { InventoryWatch } from "@/components/InventoryWatch";
import { KpiCard } from "@/components/KpiCard";
import { RecentOrders } from "@/components/RecentOrders";
import { useDashboard } from "@/components/AppShell";

export default function OverviewPage() {
  const { query, setPanel } = useDashboard();

  return (
    <div className="block w-full space-y-4">
      <div className="flex h-12 items-center px-3">
        <p className="text-sm leading-5 text-[var(--neutral-800)]">Monday, 17 August 2026</p>
        <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-[var(--green-alpha-10)] px-2 py-1 text-sm text-[var(--primary-400)]">
          <span className="size-1.5 rounded-full bg-[var(--green-200)]" />
          Today
        </span>
      </div>

      <div className="flex w-full items-center justify-between rounded-2xl border border-[var(--green-alpha-10)] px-3 py-1">
        <p className="text-base font-semibold leading-6 text-[var(--primary-400)]">Todays Overview</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setPanel({
                title: "Create order",
                body: "Draft a new order. This is mock data — no backend is wired yet.",
              })
            }
            className="flex items-center gap-2 rounded-[8px] bg-[var(--surface)] px-4 py-2 text-[13px] font-medium text-[var(--primary-400)]"
          >
            <AssetIcon src="/icons/i-plus.svg" alt="" box={12} leaf={12} />
            Create order
          </button>
          <button
            type="button"
            onClick={() => setPanel({ title: "Add product", body: "Add a SKU to inventory (mock)." })}
            className="rounded-[8px] border-[0.8px] border-[var(--green-alpha-10)] bg-[var(--primary-200)] px-3 py-2 text-[13px] text-[var(--surface)]"
          >
            Add product
          </button>
          <button
            type="button"
            onClick={() => setPanel({ title: "Record COD", body: "Log a cash-on-delivery confirmation (mock)." })}
            className="rounded-[8px] border-[0.8px] border-[var(--green-alpha-10)] bg-[var(--primary-200)] px-3 py-2 text-[13px] text-[var(--surface)]"
          >
            Record COD
          </button>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-wrap justify-center gap-8">
        <KpiCard title="Orders" value="48" chart="/icons/chart-orders.svg" />
        <KpiCard title="To Ship" value="12" chart="/icons/chart-ship.svg" />
        <KpiCard title="Stock" value="86" chart="/icons/chart-orders.svg" />
      </div>

      <div className="mt-8">
        <h2 className="text-[24px] leading-7 text-[var(--ink)]">Needs your attention</h2>
        <p className="mt-1 text-sm leading-5 text-[var(--neutral-800)]">A few things need action today.</p>
        <div className="mt-4">
          <ActionItems />
        </div>
      </div>

      <div className="mt-10">
        <RecentOrders query={query} />
      </div>

      <div className="mt-10">
        <InventoryWatch
          onReorder={(name) =>
            setPanel({ title: `Reorder ${name}`, body: `Purchase order drafted for ${name} (mock).` })
          }
        />
      </div>

      <section className="mt-10 rounded-2xl px-4 py-4">
        <h2 className="text-2xl leading-8 text-[var(--ink)]">Operations snapshot · This week</h2>
        <div className="mt-3 grid grid-cols-4 gap-6">
          {[
            ["286", "Orders this week", "+18% vs last week"],
            ["94%", "Fulfilment rate", "Target 96%"],
            ["8", "Returns", "2.8% return rate"],
            ["₹1,649", "Avg order value", "+₹142 vs last week"],
          ].map(([a, b, c]) => (
            <div key={b} className="border-r border-[var(--neutral-200)] last:border-0">
              <p className="text-[28px] leading-7 font-normal">{a}</p>
              <p className="mt-1 text-sm leading-6">{b}</p>
              <p className="text-xs leading-5 text-[var(--primary-300)]">{c}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
