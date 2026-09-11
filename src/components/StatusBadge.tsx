export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "COD Pending": "bg-[rgba(156,112,32,0.1)] text-[var(--yellow-200)] before:bg-[var(--yellow-200)]",
    Shipped: "bg-[var(--green-alpha-10)] text-[var(--base-500)] before:bg-[var(--base-500)]",
    Delayed: "bg-[rgba(196,56,40,0.1)] text-[var(--red-100)] before:bg-[var(--red-100)]",
    Delivered: "bg-[var(--surface)] text-[var(--neutral-1000)] before:bg-[var(--primary-300)]",
    Returned: "bg-[rgba(196,56,40,0.08)] text-[var(--red-200)] before:bg-[var(--red-200)]",
    "In transit": "bg-[var(--green-alpha-10)] text-[var(--base-500)] before:bg-[var(--base-500)]",
    "Pending pickup": "bg-[rgba(156,112,32,0.1)] text-[var(--yellow-200)] before:bg-[var(--yellow-200)]",
    Refunded: "bg-[var(--surface)] text-[var(--neutral-1000)] before:bg-[var(--primary-300)]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-xs leading-4 before:size-[5px] before:rounded-full ${map[status] ?? "bg-[var(--surface)]"}`}
    >
      {status}
    </span>
  );
}
