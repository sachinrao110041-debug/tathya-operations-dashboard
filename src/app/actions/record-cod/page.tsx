"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";

export default function RecordCodPage() {
  const router = useRouter();
  const { orders, recordCod, recordCodById } = useDashboard();
  const codOrders = orders.filter((order) => order.status === "COD Pending");

  return (
    <section className="mx-auto mt-4 max-w-4xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[var(--neutral-1000)]">COD action center</h1>
        <Link href="/" className="text-sm text-[var(--primary-400)]">
          Back to overview
        </Link>
      </div>
      <p className="text-sm text-[var(--neutral-700)]">
        Confirm payment and move COD orders into shipped status.
      </p>

      <div className="rounded-2xl border border-[var(--primary-100)] bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-[var(--neutral-800)]">{codOrders.length} pending COD confirmations</p>
          <button
            type="button"
            onClick={() => recordCod()}
            className="rounded-lg bg-[var(--primary-400)] px-3 py-2 text-xs font-medium text-white"
          >
            Record earliest COD
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-[var(--neutral-200)]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-xs uppercase tracking-[0.6px] text-[var(--primary-300)]">
                <th className="px-4 py-3 font-normal">Order</th>
                <th className="px-2 py-3 font-normal">Customer</th>
                <th className="px-2 py-3 font-normal">Amount</th>
                <th className="px-2 py-3 font-normal">Status</th>
                <th className="px-4 py-3 text-right font-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              {codOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-[var(--neutral-600)]">
                    All COD orders are already resolved.
                  </td>
                </tr>
              ) : (
                codOrders.map((order) => (
                  <tr key={order.id} className="border-t border-[var(--neutral-200)]">
                    <td className="px-4 py-3 font-semibold">{order.id}</td>
                    <td className="px-2 py-3">{order.customer}</td>
                    <td className="px-2 py-3">{order.amount}</td>
                    <td className="px-2 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => recordCodById(order.id)}
                        className="rounded-md border border-[var(--primary-300)] px-2 py-1 text-xs text-[var(--primary-400)]"
                      >
                        Record
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => router.push("/orders?filter=cod")}
            className="rounded-lg border border-[var(--primary-200)] px-3 py-2 text-xs text-[var(--primary-400)]"
          >
            Open COD filtered orders
          </button>
        </div>
      </div>
    </section>
  );
}
