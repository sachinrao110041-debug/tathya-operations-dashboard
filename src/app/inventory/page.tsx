"use client";

import { InventoryWatch } from "@/components/InventoryWatch";
import { useDashboard } from "@/components/AppShell";

export default function InventoryPage() {
  const { setPanel } = useDashboard();
  return (
    <div className="pt-4">
      <InventoryWatch
        onReorder={(name) => setPanel({ title: `Reorder ${name}`, body: `Purchase order drafted for ${name} (mock).` })}
      />
    </div>
  );
}
