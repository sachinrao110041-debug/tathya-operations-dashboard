"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDashboard } from "@/components/AppShell";

export default function CreateOrderPage() {
  const router = useRouter();
  const { createOrder } = useDashboard();
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState(1299);
  const [items, setItems] = useState(1);
  const [payment, setPayment] = useState<"cod" | "prepaid">("cod");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!customer.trim()) return;
    const id = createOrder({
      customer: customer.trim(),
      amount: Number.isFinite(amount) ? amount : 0,
      items: Number.isFinite(items) ? items : 1,
      payment,
    });
    router.push(`/orders?created=${encodeURIComponent(id)}`);
  };

  return (
    <section className="mx-auto mt-4 max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[var(--neutral-1000)]">Create order</h1>
        <Link href="/" className="text-sm text-[var(--primary-400)]">
          Back to overview
        </Link>
      </div>
      <p className="text-sm text-[var(--neutral-700)]">Use this workflow to add a live order to your dashboard state.</p>

      <form onSubmit={submit} className="rounded-2xl border border-[var(--primary-100)] bg-white p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="text-sm text-[var(--neutral-900)]">
            Customer name
            <input
              required
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--neutral-300)] px-3 py-2 text-sm"
              placeholder="Neha Kapoor"
            />
          </label>
          <label className="text-sm text-[var(--neutral-900)]">
            Payment type
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value as "cod" | "prepaid")}
              className="mt-1 w-full rounded-lg border border-[var(--neutral-300)] px-3 py-2 text-sm"
            >
              <option value="cod">Cash on delivery</option>
              <option value="prepaid">Prepaid</option>
            </select>
          </label>
          <label className="text-sm text-[var(--neutral-900)]">
            Order amount (INR)
            <input
              required
              min={100}
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-[var(--neutral-300)] px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm text-[var(--neutral-900)]">
            Item count
            <input
              required
              min={1}
              type="number"
              value={items}
              onChange={(e) => setItems(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-[var(--neutral-300)] px-3 py-2 text-sm"
            />
          </label>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button
            type="submit"
            className="rounded-lg bg-[var(--primary-400)] px-4 py-2 text-sm font-medium text-white"
          >
            Create order
          </button>
          <button
            type="button"
            onClick={() => router.push("/orders")}
            className="rounded-lg border border-[var(--primary-200)] px-4 py-2 text-sm text-[var(--primary-400)]"
          >
            Open orders
          </button>
        </div>
      </form>
    </section>
  );
}
