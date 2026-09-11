"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { DashHeader } from "./DashHeader";
import { SlideOver } from "./SlideOver";
import {
  initialInventory,
  initialOrders,
  initialReturns,
  initialShipments,
  suppliers,
  imageForCategory,
  type InventoryItem,
  type Order,
  type OrderStatus,
  type ReturnItem,
  type Shipment,
  type Supplier,
} from "@/lib/data";

type PanelAction = {
  label: string;
  onClick: () => void;
  tone?: "primary" | "neutral";
};

type PanelState = {
  title: string;
  body: React.ReactNode;
  actions?: PanelAction[];
};

type DashboardCtx = {
  query: string;
  setQuery: (v: string) => void;
  panel: PanelState | null;
  setPanel: (v: PanelState | null) => void;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  shipments: Shipment[];
  setShipments: React.Dispatch<React.SetStateAction<Shipment[]>>;
  returnsData: ReturnItem[];
  setReturnsData: React.Dispatch<React.SetStateAction<ReturnItem[]>>;
  suppliersData: Supplier[];
  addMockOrder: () => string;
  createOrder: (input: {
    customer: string;
    amount: number;
    items: number;
    payment: "cod" | "prepaid";
  }) => string;
  addMockProduct: () => string;
  createProduct: (input: {
    name: string;
    category: string;
    left: number;
    max: number;
  }) => string;
  recordCod: () => string;
  recordCodById: (id: string) => string;
  reorderItem: (name: string) => string;
  advanceOrderStatus: (id: string) => void;
  resolveShipment: (id: string) => void;
  refundReturn: (id: string) => void;
  notice: string;
};

export const SearchContext = createContext<DashboardCtx>({
  query: "",
  setQuery: () => {},
  setPanel: () => {},
  panel: null,
  orders: [],
  setOrders: () => {},
  inventory: [],
  setInventory: () => {},
  shipments: [],
  setShipments: () => {},
  returnsData: [],
  setReturnsData: () => {},
  suppliersData: [],
  addMockOrder: () => "",
  createOrder: () => "",
  addMockProduct: () => "",
  createProduct: () => "",
  recordCod: () => "",
  recordCodById: () => "",
  reorderItem: () => "",
  advanceOrderStatus: () => {},
  resolveShipment: () => {},
  refundReturn: () => {},
  notice: "",
});

export function useDashboard() {
  return useContext(SearchContext);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [panel, setPanel] = useState<PanelState | null>(null);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [returnsData, setReturnsData] = useState<ReturnItem[]>(initialReturns);
  const [notice, setNotice] = useState("");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2400);
    return () => clearTimeout(timer);
  }, [notice]);

  const addMockOrder = () => {
    const id = `#TH-${Math.floor(2100 + Math.random() * 200)}`;
    const names = ["Aarav Jain", "Diya Kapoor", "Sana Qureshi", "Rohan Iyer"];
    const customer = names[Math.floor(Math.random() * names.length)];
    const amount = `₹${Math.floor(900 + Math.random() * 4500).toLocaleString("en-IN")}`;
    const items = Math.floor(1 + Math.random() * 4);
    setOrders((prev) => [{ id, customer, amount, items, status: "COD Pending", date: "Today" }, ...prev]);
    setNotice(`Created mock order ${id} for ${customer}.`);
    return id;
  };

  const createOrder = (input: {
    customer: string;
    amount: number;
    items: number;
    payment: "cod" | "prepaid";
  }) => {
    const id = `#TH-${Math.floor(2200 + Math.random() * 300)}`;
    const status: OrderStatus = input.payment === "cod" ? "COD Pending" : "Shipped";
    const amount = `₹${input.amount.toLocaleString("en-IN")}`;
    setOrders((prev) => [
      { id, customer: input.customer, amount, items: input.items, status, date: "Today" },
      ...prev,
    ]);
    setNotice(`Order ${id} created for ${input.customer}.`);
    return id;
  };

  const addMockProduct = () => {
    const name = `New SKU ${inventory.length + 1}`;
    setInventory((prev) => [
      { name, category: "Accessory", left: 7, max: 80, image: imageForCategory("Accessory") },
      ...prev,
    ]);
    setNotice(`Added ${name} to inventory.`);
    return name;
  };

  const createProduct = (input: {
    name: string;
    category: string;
    left: number;
    max: number;
  }) => {
    setInventory((prev) => [{ ...input, image: imageForCategory(input.category, input.name) }, ...prev]);
    setNotice(`Product ${input.name} added to inventory.`);
    return input.name;
  };

  const recordCod = () => {
    const target = orders.find((o) => o.status === "COD Pending");
    if (!target) {
      setNotice("No COD pending orders found.");
      return "none";
    }
    setOrders((prev) =>
      prev.map((o) => (o.id === target.id ? { ...o, status: "Shipped", date: "Today" } : o)),
    );
    setNotice(`COD recorded for ${target.id}. Status moved to Shipped.`);
    return target.id;
  };

  const recordCodById = (id: string) => {
    const target = orders.find((o) => o.id === id && o.status === "COD Pending");
    if (!target) {
      setNotice("Selected order is not COD pending.");
      return "none";
    }
    setOrders((prev) =>
      prev.map((o) => (o.id === target.id ? { ...o, status: "Shipped", date: "Today" } : o)),
    );
    setNotice(`COD recorded for ${target.id}.`);
    return target.id;
  };

  const reorderItem = (name: string) => {
    setInventory((prev) =>
      prev.map((item) => (item.name === name ? { ...item, left: Math.min(item.max, item.left + 24) } : item)),
    );
    setNotice(`Reorder placed for ${name}. Stock inbound.`);
    return name;
  };

  const advanceOrderStatus = (id: string) => {
    const next: Record<OrderStatus, OrderStatus> = {
      "COD Pending": "Shipped",
      Shipped: "Delivered",
      Delayed: "Shipped",
      Delivered: "Delivered",
      Returned: "Returned",
    };
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: next[o.status], date: "Today" } : o)));
  };

  const resolveShipment = (id: string) => {
    setShipments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Delivered", eta: "Delivered" } : s)),
    );
    setNotice(`Shipment ${id} marked delivered.`);
  };

  const refundReturn = (id: string) => {
    setReturnsData((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Refunded" } : r)));
    setNotice(`Return ${id} marked refunded.`);
  };

  const ctx = useMemo(
    () => ({
      query,
      setQuery,
      panel,
      setPanel,
      orders,
      setOrders,
      inventory,
      setInventory,
      shipments,
      setShipments,
      returnsData,
      setReturnsData,
      suppliersData: suppliers,
      addMockOrder,
      createOrder,
      addMockProduct,
      createProduct,
      recordCod,
      recordCodById,
      reorderItem,
      advanceOrderStatus,
      resolveShipment,
      refundReturn,
      notice,
    }),
    [query, panel, orders, inventory, shipments, returnsData, notice],
  );

  return (
    <div className="flex min-h-dvh items-start bg-transparent">
      {navOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
        />
      ) : null}
      <AppSidebar mobileOpen={navOpen} onClose={() => setNavOpen(false)} />
      <SearchContext.Provider value={ctx}>
        <div className="flex min-w-0 flex-1 flex-col">
          <DashHeader query={query} onQuery={setQuery} onMenu={() => setNavOpen(true)} />
          <main className="min-w-0 flex-1 px-4 pb-10 pt-2 md:px-6">{children}</main>
        </div>
      </SearchContext.Provider>
      <SlideOver
        open={!!panel}
        title={panel?.title ?? ""}
        onClose={() => setPanel(null)}
        actions={panel?.actions ?? []}
      >
        <div className="text-sm text-[var(--neutral-800)]">{panel?.body}</div>
      </SlideOver>
      {notice ? (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-[var(--neutral-1000)] px-3 py-2 text-xs text-white">
          {notice}
        </div>
      ) : null}
    </div>
  );
}
