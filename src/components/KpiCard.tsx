"use client";

export function KpiCard({
  title,
  value,
  chart: _chart,
}: {
  title: string;
  value: string;
  chart: string;
}) {
  const current = [58, 44, 36, 51, 42, 63];
  const previous = [46, 40, 39, 42, 45, 54];
  const labels = ["M", "T", "W", "T", "F", "S"];

  return (
    <div className="w-full rounded-2xl border border-[var(--primary-100)] bg-white p-6 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold leading-5 text-[var(--neutral-900)]">{title}</p>
          <p className="text-[28px] font-semibold leading-8 text-[var(--neutral-1000)]">{value}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-medium uppercase tracking-[0.6px] text-[var(--neutral-600)]">6-day trend</p>
          <p className="text-xs text-[var(--primary-300)]">+12% vs previous</p>
        </div>
      </div>

      <div className="grid h-[74px] grid-cols-6 gap-2">
        {current.map((h, i) => (
          <div key={`${title}-${i}`} className="flex h-full flex-col items-center justify-end gap-1">
            <div className="flex h-[62px] items-end gap-[3px]">
              <span
                className="block w-[8px] rounded-t-sm bg-[var(--primary-100)]"
                style={{ height: `${Math.max(10, Math.min(62, previous[i]))}px` }}
              />
              <span
                className="block w-[8px] rounded-t-sm bg-[var(--primary-400)]"
                style={{ height: `${Math.max(10, Math.min(62, h))}px` }}
              />
            </div>
            <span className="text-[10px] text-[var(--neutral-600)]">{labels[i]}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 text-[10px] text-[var(--neutral-700)]">
        <span className="inline-flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-[var(--primary-400)]" />
          Current
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-[var(--primary-100)]" />
          Previous
        </span>
      </div>
    </div>
  );
}
