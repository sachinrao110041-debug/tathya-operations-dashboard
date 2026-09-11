"use client";

import { StatusBadge } from "@/components/StatusBadge";
import { useDashboard } from "@/components/AppShell";

export default function ReturnsPage() {
  const { query, returnsData, refundReturn } = useDashboard();
  const rows = returnsData.filter((r) =>
    `${r.id} ${r.order} ${r.reason}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="pt-4">
      <h1 className="text-2xl font-semibold">Returns</h1>
      <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--primary-100)]">
        {rows.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-[var(--neutral-600)]">No returns match the search.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-[0.6px] text-[var(--primary-300)]">
                <th className="px-4 py-3 font-normal">Return</th>
                <th className="px-2 py-3 font-normal">Order</th>
                <th className="px-2 py-3 font-normal">Reason</th>
                <th className="px-2 py-3 font-normal">Status</th>
                <th className="px-4 py-3 text-right font-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-[var(--neutral-200)]">
                  <td className="px-4 py-3 font-semibold">{r.id}</td>
                  <td className="px-2 py-3">{r.order}</td>
                  <td className="px-2 py-3">{r.reason}</td>
                  <td className="px-2 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => refundReturn(r.id)}
                        className="rounded-md border border-[var(--primary-300)] px-2 py-1 text-xs text-[var(--primary-400)]"
                      >
                        Mark refunded
                      </button>
                    ) : (
                      <span className="text-xs text-[var(--neutral-600)]">Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
