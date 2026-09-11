export type OrderStatus = "COD Pending" | "Shipped" | "Delayed" | "Delivered" | "Returned";

export type Order = {
  id: string;
  customer: string;
  items: number;
  amount: string;
  status: OrderStatus;
  date: string;
};

export const initialOrders: Order[] = [
  { id: "#TH-2050", customer: "Neha Kapoor", items: 1, amount: "₹1,299", status: "COD Pending", date: "Today" },
  { id: "#TH-2049", customer: "Aditi Mehta", items: 3, amount: "₹2,499", status: "Shipped", date: "Yesterday" },
  { id: "#TH-2048", customer: "Riya Verma", items: 2, amount: "₹1,799", status: "Delayed", date: "Yesterday" },
  { id: "#TH-2047", customer: "Meera Joshi", items: 1, amount: "₹999", status: "Delivered", date: "Yesterday" },
  { id: "#TH-2046", customer: "Ananya Shah", items: 2, amount: "₹3,150", status: "Shipped", date: "17 Aug" },
  { id: "#TH-2045", customer: "Kavya Nair", items: 4, amount: "₹4,820", status: "Delivered", date: "16 Aug" },
];

export type ActionItem = {
  n: string;
  icon: string;
  title: string;
  body: Array<{ t: string; strong: boolean }>;
  href: string;
  cta: string;
  actionKey: "orders" | "stock" | "cod" | "shipments";
};

export const actionItems: ActionItem[] = [
  {
    n: "01",
    icon: "/icons/i-truck.svg",
    title: "5 orders are due to ship today",
    body: (
      [
        { t: "17 orders", strong: true },
        { t: " waiting for shipment. 5 must leave today.", strong: false },
      ]
    ),
    href: "/orders",
    cta: "View orders",
    actionKey: "orders",
  },
  {
    n: "02",
    icon: "/icons/i-package.svg",
    title: "6 products are running low on stock",
    body: [
      { t: "Most urgent: ", strong: false },
      { t: "Gold Hoop Earrings", strong: true },
      { t: " — 12 units remaining.", strong: false },
    ],
    href: "/inventory",
    cta: "Review stock",
    actionKey: "stock",
  },
  {
    n: "03",
    icon: "/icons/i-cash.svg",
    title: "12 COD confirmations pending",
    body: [
      { t: "₹38,420", strong: true },
      { t: " worth of orders require confirmation before dispatch.", strong: false },
    ],
    href: "/orders?filter=cod",
    cta: "Review COD",
    actionKey: "cod",
  },
  {
    n: "04",
    icon: "/icons/i-alert.svg",
    title: "3 shipments are delayed",
    body: [
      { t: "Oldest: ", strong: false },
      { t: "#TH-2048", strong: true },
      { t: " — delayed 2 days. Customer not notified.", strong: false },
    ],
    href: "/shipments",
    cta: "View shipments",
    actionKey: "shipments",
  },
];

export type InventoryItem = {
  name: string;
  category: string;
  left: number;
  max: number;
  glyph: string;
};

export const initialInventory: InventoryItem[] = [
  { name: "Silver Stack Ring", category: "Ring", left: 3, max: 80, glyph: "◻" },
  { name: "Minimal Chain Bracelet", category: "Bracelet", left: 5, max: 80, glyph: "⌒" },
  { name: "Pearl Drop Necklace", category: "Necklace", left: 8, max: 80, glyph: "○" },
  { name: "Temple Gold Necklace", category: "Necklace", left: 9, max: 80, glyph: "○" },
  { name: "Gold Hoop Earrings", category: "Earrings", left: 12, max: 80, glyph: "◇" },
];

export type Shipment = {
  id: string;
  order: string;
  carrier: string;
  eta: string;
  status: "In transit" | "Delayed" | "Delivered";
};

export const initialShipments: Shipment[] = [
  { id: "SH-8821", order: "#TH-2049", carrier: "Delhivery", eta: "18 Aug", status: "In transit" },
  { id: "SH-8820", order: "#TH-2048", carrier: "BlueDart", eta: "Overdue", status: "Delayed" },
  { id: "SH-8819", order: "#TH-2047", carrier: "Delhivery", eta: "Delivered", status: "Delivered" },
];

export type ReturnItem = {
  id: string;
  order: string;
  reason: string;
  status: "Pending pickup" | "Refunded";
};

export const initialReturns: ReturnItem[] = [
  { id: "RT-110", order: "#TH-2031", reason: "Size issue", status: "Pending pickup" },
  { id: "RT-109", order: "#TH-2028", reason: "Damaged", status: "Refunded" },
];

export type Supplier = {
  name: string;
  lead: string;
  openPos: number;
};

export const suppliers: Supplier[] = [
  { name: "Jaipur Gems Co.", lead: "4 days", openPos: 2 },
  { name: "Kerala Pearls", lead: "9 days", openPos: 1 },
  { name: "Mumbai Metals", lead: "6 days", openPos: 0 },
];
