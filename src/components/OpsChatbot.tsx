"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { InventoryItem, Order, ReturnItem, Shipment } from "@/lib/data";

type ChatMessage = {
  role: "bot" | "user";
  text: string;
};

type QuickAction = {
  label: string;
  onClick: () => void;
};

export function OpsChatbot({
  orders,
  inventory,
  shipments,
  returnsData,
  createMockOrder,
  createMockProduct,
  recordCod,
}: {
  orders: Order[];
  inventory: InventoryItem[];
  shipments: Shipment[];
  returnsData: ReturnItem[];
  createMockOrder: () => string;
  createMockProduct: () => string;
  recordCod: () => string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Hi! I am your Tathya assistant. I can guide navigation, show key operations info, and perform quick actions.",
    },
  ]);

  const quickActions = useMemo<QuickAction[]>(
    () => [
      { label: "Open orders", onClick: () => router.push("/orders") },
      { label: "Check inventory", onClick: () => router.push("/inventory") },
      { label: "Go to shipments", onClick: () => router.push("/shipments") },
      {
        label: "Create order",
        onClick: () => {
          const id = createMockOrder();
          setMessages((prev) => [...prev, { role: "bot", text: `Created a new order ${id}.` }]);
        },
      },
      {
        label: "Add product",
        onClick: () => {
          const name = createMockProduct();
          setMessages((prev) => [...prev, { role: "bot", text: `Added product ${name} to inventory.` }]);
        },
      },
      {
        label: "Record COD",
        onClick: () => {
          const id = recordCod();
          const text = id === "none" ? "No COD pending orders found." : `Recorded COD for ${id}.`;
          setMessages((prev) => [...prev, { role: "bot", text }]);
        },
      },
    ],
    [createMockOrder, createMockProduct, recordCod, router],
  );

  const botReply = (text: string) => {
    const q = text.toLowerCase();
    if (q.includes("order")) {
      const pending = orders.filter((o) => o.status === "COD Pending").length;
      return `You have ${orders.length} orders total. ${pending} are COD pending. Use "Open orders" or "Record COD" quick actions.`;
    }
    if (q.includes("inventory") || q.includes("stock")) {
      const low = inventory.filter((i) => i.left <= 10).length;
      return `${low} items are low in stock. I can take you to Inventory or add a mock product instantly.`;
    }
    if (q.includes("shipment") || q.includes("delivery")) {
      const delayed = shipments.filter((s) => s.status === "Delayed").length;
      return `${delayed} shipments are delayed right now. Open Shipments to resolve them quickly.`;
    }
    if (q.includes("return") || q.includes("refund")) {
      const pending = returnsData.filter((r) => r.status !== "Refunded").length;
      return `${pending} returns are pending refund/pickup. Open Returns to process them.`;
    }
    if (q.includes("navigate") || q.includes("where")) {
      return "I can navigate you to Orders, Inventory, Shipments, Returns, Suppliers, and Onboarding.";
    }
    if (q.includes("onboard")) {
      return "Onboarding is available from the Overview action strip. I can also open it for you.";
    }
    return "I can help with orders, stock, shipments, returns, navigation, and quick actions. Try: 'show order status' or use the quick action buttons.";
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }, { role: "bot", text: botReply(text) }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-[340px] overflow-hidden rounded-2xl border border-[var(--primary-100)] bg-white shadow-[var(--elev-2)]">
          <div className="flex items-center justify-between border-b border-[var(--ink-line)] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[var(--neutral-1000)]">Tathya Assistant</p>
              <p className="text-xs text-[var(--neutral-700)]">Navigate, inform, and take quick actions</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-[var(--neutral-300)] px-2 py-1 text-xs"
            >
              Close
            </button>
          </div>
          <div className="max-h-[300px] space-y-2 overflow-auto px-3 py-3">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`rounded-xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-8 bg-[var(--primary-100)] text-[var(--primary-500)]"
                    : "mr-8 border border-[var(--ink-line)] bg-[var(--surface)] text-[var(--neutral-900)]"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--ink-line)] px-3 py-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick}
                  className="rounded-full border border-[var(--primary-100)] px-2 py-1 text-[11px] text-[var(--primary-400)]"
                >
                  {action.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Ask about orders, stock, shipments..."
                className="min-w-0 flex-1 rounded-lg border border-[var(--neutral-300)] px-3 py-2 text-sm outline-none"
              />
              <button
                type="button"
                onClick={send}
                className="rounded-lg bg-[var(--primary-400)] px-3 py-2 text-sm text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full bg-[var(--primary-400)] px-4 py-2 text-sm font-medium text-white shadow-[var(--elev-2)]"
        >
          Chat Assistant
        </button>
      )}
    </div>
  );
}

