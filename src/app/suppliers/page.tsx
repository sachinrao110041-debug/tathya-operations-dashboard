"use client";

import { suppliers } from "@/lib/data";
import { useDashboard } from "@/components/AppShell";

export default function SuppliersPage() {
  const { query, setPanel } = useDashboard();
  const rows = suppliers.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="pt-4">
      <h1 className="text-2xl font-semibold">Suppliers</h1>
      <div className="mt-4 grid gap-3">
        {rows.map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setPanel({ title: s.name, body: `Lead time ${s.lead}. Open POs: ${s.openPos}.` })}
            className="flex items-center justify-between rounded-2xl border border-[var(--primary-100)] bg-white px-4 py-3 text-left"
          >
            <span>
              <p className="font-semibold">{s.name}</p>
              <p className="text-xs text-[var(--primary-400)]">Lead time {s.lead}</p>
            </span>
            <span className="text-sm text-[var(--neutral-700)]">{s.openPos} open POs</span>
          </button>
        ))}
      </div>
    </div>
  );
}
