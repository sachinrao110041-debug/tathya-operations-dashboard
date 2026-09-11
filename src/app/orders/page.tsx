"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { type OrderStatus } from "@/lib/data";
import { StatusBadge } from "@/components/StatusBadge";
import { useDashboard } from "@/components/AppShell";

const filters: Array<"All" | OrderStatus> = ["All", "COD Pending", "Shipped", "Delayed", "Delivered"];

function OrdersTable() {
  const params = useSearchParams();
  const { query, orders, advanceOrderStatus } = useDashboard();
  const [status, setStatus] = useState<typeof filters[number]>("All");

  useEffect(() => {
    if (params.get("filter") === "cod") setStatus("COD Pending");
  }, [params]);

  const rows = useMemo(() => {
    return orders.filter((o) => {
      const q = query.toLowerCase();
      const matchQ = `${o.id} ${o.customer} ${o.status}`.toLowerCase().includes(q);
      const matchS = status === "All" || o.status === status;
      return matchQ && matchS;
    });
  }, [orders, query, status]);

  return (
    <div className="pt-4">
      <h1 className="text-2xl font-semibold text-[var(--neutral-1000)]">Orders</h1>
      <p className="mt-1 text-sm text-[var(--neutral-700)]">Filter and search the mock order book.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setStatus(f)}
            className={`rounded-full px-3 py-1.5 text-sm ${
              status === f ? "bg-[var(--primary-100)] text-[var(--primary-400)]" : "bg-[var(--surface)] text-[var(--neutral-800)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--primary-100)] bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-xs uppercase tracking-[0.6px] text-[var(--primary-300)]">
              <th className="px-4 py-3 font-normal">Order</th>
              <th className="px-2 py-3 font-normal">Customer</th>
              <th className="px-2 py-3 font-normal">Amount</th>
              <th className="px-2 py-3 font-normal">Status</th>
              <th className="px-2 py-3 font-normal">Date</th>
              <th className="px-4 py-3 text-right font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-[var(--neutral-600)]">
                  Empty — no orders for this filter.
                </td>
              </tr>
            ) : (
              rows.map((o) => (
                <tr key={o.id} className="border-t border-[var(--neutral-200)]">
                  <td className="px-4 py-3 font-semibold">{o.id}</td>
                  <td className="px-2 py-3">{o.customer}</td>
                  <td className="px-2 py-3">{o.amount}</td>
                  <td className="px-2 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-2 py-3 text-sm text-[var(--primary-300)]">{o.date}</td>
                  <td className="px-4 py-3 text-right">
                      className="rounded-md border border-[var(--primary-300)] px-2 py-1 text-xs text-[var(--primary-400)]"
                    >
                      Advance
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<p className="pt-6 text-sm">Loading orders…</p>}>
      <OrdersTable />
    </Suspense>
  );
}
