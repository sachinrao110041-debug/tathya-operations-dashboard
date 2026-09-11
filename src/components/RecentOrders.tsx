"use client";

import Link from "next/link";
import { orders } from "@/lib/data";
import { StatusBadge } from "./StatusBadge";

export function RecentOrders({ query }: { query: string }) {
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
        <Link href="/orders" className="py-2 text-xs text-[#1b7a43]">
          View all →
        </Link>
      </div>
      <div className="mt-3 overflow-hidden rounded-2xl border border-[var(--primary-100)] bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-[0.8px] border-[var(--neutral-200)] bg-[rgba(17,28,21,0.02)] text-xs uppercase tracking-[0.6px] text-[var(--primary-300)]">
              <th className="px-4 py-2 font-normal">Order</th>
              <th className="px-2 py-2 font-normal">Customer</th>
              <th className="px-2 py-2 font-normal">Amount</th>
              <th className="px-2 py-2 font-normal">Status</th>
              <th className="px-2 py-2 font-normal">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-[var(--neutral-600)]">
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
