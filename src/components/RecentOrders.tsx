"use client";

import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import { useDashboard } from "./AppShell";

export function RecentOrders({ query }: { query: string }) {
  const { orders, setPanel } = useDashboard();
  const rows = orders.filter((o) =>
    `${o.id} ${o.customer} ${o.status}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl leading-8 text-[var(--ink)]">Recent orders</h2>
          <p className="pt-1 text-xs font-semibold leading-4 text-[var(--ink-muted)]">Last 24 hours</p>
        </div>
        <Link href="/orders" className="rounded-full border border-[var(--primary-100)] px-3 py-1.5 text-xs text-[var(--primary-400)]">
          View all →
        </Link>
      </div>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--primary-100)] bg-white shadow-[var(--elev-1)]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-[0.8px] border-[var(--neutral-200)] bg-[rgba(17,28,21,0.02)] text-xs uppercase tracking-[0.6px] text-[var(--primary-300)]">
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
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-[var(--neutral-600)]">
                  No orders match “{query}”.
                </td>
              </tr>
            ) : (
              rows.slice(0, 4).map((o) => (
                <tr key={o.id} className="border-b-[0.8px] border-[var(--neutral-200)] last:border-0">
                  <td className="px-4 py-3 text-sm font-semibold">{o.id}</td>
                  <td className="px-2 py-3">
                    <p className="text-sm">{o.customer}</p>
                    <p className="text-xs font-semibold text-[var(--primary-300)]">
                      {o.items} item{o.items === 1 ? "" : "s"}
                    </p>
                  </td>
                  <td className="px-2 py-3 text-sm">{o.amount}</td>
                  <td className="px-2 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-2 py-3 text-xs text-[var(--primary-300)]">{o.date}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setPanel({
                          title: `Order ${o.id}`,
                          body: `${o.customer} • ${o.amount} • ${o.items} item(s) • ${o.status}`,
                        })
                      }
                      className="rounded-full border border-[var(--primary-100)] px-2 py-1 text-xs text-[var(--primary-400)]"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
