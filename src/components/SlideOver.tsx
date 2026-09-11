"use client";

export function SlideOver({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
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
      </aside>
    </div>
  );
}
