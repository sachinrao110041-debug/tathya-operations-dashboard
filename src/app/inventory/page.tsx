"use client";

import { InventoryWatch } from "@/components/InventoryWatch";
import { useDashboard } from "@/components/AppShell";

export default function InventoryPage() {
  const { setPanel, reorderItem } = useDashboard();
  return (
    <div className="pt-4">
      <InventoryWatch
        onReorder={(name) =>
          setPanel({
            title: `Reorder ${name}`,
            body: `Confirm a purchase order to replenish ${name}.`,
            actions: [{ label: "Confirm reorder", tone: "primary", onClick: () => reorderItem(name) }],
          })
        }
      />
    </div>
  );
}
