"use client";

import { StatusBadge } from "@/components/StatusBadge";
import { useDashboard } from "@/components/AppShell";

export default function ShipmentsPage() {
  const { query, shipments, resolveShipment } = useDashboard();
  const rows = shipments.filter((s) => `${s.id} ${s.order} ${s.carrier}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="pt-4">
      <h1 className="text-2xl font-semibold">Shipments</h1>
      <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--primary-100)]">
        {rows.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-[var(--neutral-600)]">No shipments match.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-[0.6px] text-[var(--primary-300)]">
                <th className="px-4 py-3 font-normal">Shipment</th>
                <th className="px-2 py-3 font-normal">Order</th>
                <th className="px-2 py-3 font-normal">Carrier</th>
                <th className="px-2 py-3 font-normal">ETA</th>
                <th className="px-2 py-3 font-normal">Status</th>
                <th className="px-4 py-3 text-right font-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-t border-[var(--neutral-200)]">
                  <td className="px-4 py-3 font-semibold">{s.id}</td>
                  <td className="px-2 py-3">{s.order}</td>
                  <td className="px-2 py-3">{s.carrier}</td>
                  <td className="px-2 py-3">{s.eta}</td>
                  <td className="px-2 py-3">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {s.status !== "Delivered" ? (
                      <button
                        type="button"
                        onClick={() => resolveShipment(s.id)}
                        className="rounded-md border border-[var(--primary-300)] px-2 py-1 text-xs text-[var(--primary-400)]"
                      >
                        Mark delivered
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
