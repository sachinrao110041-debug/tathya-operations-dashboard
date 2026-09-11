"use client";

import { ActionItems } from "@/components/ActionItems";
import { AssetIcon } from "@/components/AssetIcon";
import { InventoryWatch } from "@/components/InventoryWatch";
import { KpiCard } from "@/components/KpiCard";
import { RecentOrders } from "@/components/RecentOrders";
import { useDashboard } from "@/components/AppShell";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function OverviewPage() {
  const { query, setPanel, recordCod, reorderItem } = useDashboard();
  const router = useRouter();
  const [range, setRange] = useState<"today" | "week" | "month">("today");
  const [focus, setFocus] = useState<"all" | "orders" | "shipments" | "inventory" | "cod">("all");

  const metrics = useMemo(() => {
    if (range === "week") {
      return {
        kpis: [
          { title: "Orders", value: "286", chart: "/icons/chart-orders.svg", href: "/orders" },
          { title: "To Ship", value: "42", chart: "/icons/chart-ship.svg", href: "/shipments" },
          { title: "Stock", value: "91", chart: "/icons/chart-orders.svg", href: "/inventory" },
        ],
        snapshot: [
          ["286", "Orders this week", "+18% vs last week"],
          ["94%", "Fulfilment rate", "Target 96%"],
          ["8", "Returns", "2.8% return rate"],
          ["₹1,649", "Avg order value", "+₹142 vs last week"],
        ],
      };
    }
    if (range === "month") {
      return {
        kpis: [
          { title: "Orders", value: "1124", chart: "/icons/chart-orders.svg", href: "/orders" },
          { title: "To Ship", value: "126", chart: "/icons/chart-ship.svg", href: "/shipments" },
          { title: "Stock", value: "88", chart: "/icons/chart-orders.svg", href: "/inventory" },
        ],
        snapshot: [
          ["1,124", "Orders this month", "+11% vs last month"],
          ["95%", "Fulfilment rate", "Target 96%"],
          ["31", "Returns", "2.7% return rate"],
          ["₹1,602", "Avg order value", "+₹95 vs last month"],
        ],
      };
    }
    return {
      kpis: [
        { title: "Orders", value: "48", chart: "/icons/chart-orders.svg", href: "/orders" },
        { title: "To Ship", value: "12", chart: "/icons/chart-ship.svg", href: "/shipments" },
        { title: "Stock", value: "86", chart: "/icons/chart-orders.svg", href: "/inventory" },
      ],
      snapshot: [
        ["48", "Orders today", "+6 from yesterday"],
        ["92%", "Fulfilment rate", "Target 96%"],
        ["2", "Returns", "4.1% return rate"],
        ["₹1,724", "Avg order value", "+₹120 vs yesterday"],
      ],
    };
  }, [range]);

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
          <div className="mr-2 flex rounded-lg border border-[var(--green-alpha-10)] p-1">
            {[
              ["today", "Today"],
              ["week", "This week"],
              ["month", "This month"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setRange(key as "today" | "week" | "month")}
                className={`rounded-md px-2 py-1 text-xs ${
                  range === key ? "bg-[var(--primary-200)] text-white" : "text-[var(--neutral-800)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => router.push("/actions/create-order")}
            className="flex items-center gap-2 rounded-[8px] bg-[var(--surface)] px-4 py-2 text-[13px] font-medium text-[var(--primary-400)]"
          >
            <AssetIcon src="/icons/i-plus.svg" alt="" box={12} leaf={12} />
            Create order
          </button>
          <button
            type="button"
            onClick={() => router.push("/actions/add-product")}
            className="rounded-[8px] border-[0.8px] border-[var(--green-alpha-10)] bg-[var(--primary-200)] px-3 py-2 text-[13px] text-[var(--surface)]"
          >
            Add product
          </button>
          <button
            type="button"
            onClick={() => router.push("/actions/record-cod")}
            className="rounded-[8px] border-[0.8px] border-[var(--green-alpha-10)] bg-[var(--primary-200)] px-3 py-2 text-[13px] text-[var(--surface)]"
          >
            Record COD
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {[
          ["all", "All"],
          ["orders", "Orders"],
          ["shipments", "Shipments"],
          ["inventory", "Inventory"],
          ["cod", "COD"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setFocus(key as "all" | "orders" | "shipments" | "inventory" | "cod");
              if (key === "orders") router.push("/orders");
              if (key === "shipments") router.push("/shipments");
              if (key === "inventory") router.push("/inventory");
              if (key === "cod") router.push("/orders?filter=cod");
            }}
            className={`rounded-full px-3 py-1 text-xs ${
              focus === key
                ? "bg-[var(--primary-400)] text-white"
                : "border border-[var(--green-alpha-10)] text-[var(--neutral-800)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {metrics.kpis.map((kpi) => (
          <button key={kpi.title} type="button" onClick={() => router.push(kpi.href)} className="text-left">
            <KpiCard title={kpi.title} value={kpi.value} chart={kpi.chart} />
          </button>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-[24px] leading-7 text-[var(--ink)]">Needs your attention</h2>
        <p className="mt-1 text-sm leading-5 text-[var(--neutral-800)]">A few things need action today.</p>
        <div className="mt-4">
          <ActionItems
            onAction={(key) => {
              if (key === "orders") router.push("/orders");
              if (key === "stock") router.push("/inventory");
              if (key === "shipments") router.push("/shipments");
              if (key === "cod") {
                setPanel({
                  title: "Review COD",
                  body: "Instant action: mark one COD pending order as shipped.",
                  actions: [
                    {
                      label: "Record COD",
                      tone: "primary",
                      onClick: () => recordCod(),
                    },
                    { label: "Open COD Center", onClick: () => router.push("/actions/record-cod") },
                  ],
                });
              }
            }}
          />
        </div>
      </div>

      <div className="mt-10">
        <RecentOrders query={query} />
      </div>

      <div className="mt-10">
        <InventoryWatch
          onReorder={(name) =>
            setPanel({
              title: `Reorder ${name}`,
              body: `Purchase order drafted for ${name}.`,
              actions: [
                {
                  label: "Confirm reorder",
                  tone: "primary",
                  onClick: () => reorderItem(name),
                },
              ],
            })
          }
        />
      </div>

      <section className="mt-10 rounded-2xl px-4 py-4">
        <h2 className="text-2xl leading-8 text-[var(--ink)]">
          Operations snapshot · {range === "today" ? "Today" : range === "week" ? "This week" : "This month"}
        </h2>
        <div className="mt-3 grid grid-cols-4 gap-6">
          {metrics.snapshot.map(([a, b, c]) => (
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
