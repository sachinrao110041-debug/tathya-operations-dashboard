"use client";

export function SlideOver({
  open,
  title,
  onClose,
  actions,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  actions?: Array<{ label: string; onClick: () => void; tone?: "primary" | "neutral" }>;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20" onClick={onClose}>
      <aside
        className="flex h-full w-[460px] flex-col bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--ink-line)] px-6 py-4">
          <h2 className="text-lg font-semibold text-[var(--neutral-1000)]">{title}</h2>
          <button type="button" onClick={onClose} className="text-sm text-[var(--neutral-700)]">
            Close
          </button>
        </div>
        <div className="flex-1 overflow-auto px-6 py-4">{children}</div>
        {actions && actions.length > 0 ? (
          <div className="flex gap-2 border-t border-[var(--ink-line)] px-6 py-4">
            {actions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => {
                  action.onClick();
                  onClose();
                }}
                className={`rounded-md px-3 py-2 text-sm ${
                  action.tone === "primary"
                    ? "bg-[var(--primary-400)] text-white"
                    : "border border-[var(--neutral-300)] text-[var(--neutral-800)]"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : null}
      </aside>
    </div>
  );
}
