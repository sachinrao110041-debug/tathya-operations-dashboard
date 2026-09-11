"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDashboard } from "@/components/AppShell";

const categories = ["Ring", "Bracelet", "Necklace", "Earrings", "Accessory"];

export default function AddProductPage() {
  const router = useRouter();
  const { createProduct } = useDashboard();
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [left, setLeft] = useState(8);
  const [max, setMax] = useState(80);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    createProduct({
      name: name.trim(),
      category,
      left: Number.isFinite(left) ? left : 0,
      max: Number.isFinite(max) ? Math.max(left, max) : left,
    });
    router.push("/inventory");
  };

  return (
    <section className="mx-auto mt-4 max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[var(--neutral-1000)]">Add product</h1>
        <Link href="/" className="text-sm text-[var(--primary-400)]">
          Back to overview
        </Link>
      </div>
      <p className="text-sm text-[var(--neutral-700)]">Create a SKU and immediately reflect it in the inventory board.</p>

      <form onSubmit={submit} className="rounded-2xl border border-[var(--primary-100)] bg-white p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="text-sm text-[var(--neutral-900)]">
            Product name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--neutral-300)] px-3 py-2 text-sm"
              placeholder="Gold Hoop Earrings"
            />
          </label>

          <label className="text-sm text-[var(--neutral-900)]">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--neutral-300)] px-3 py-2 text-sm"
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-[var(--neutral-900)]">
            Current stock
            <input
              required
              min={0}
              type="number"
              value={left}
              onChange={(e) => setLeft(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-[var(--neutral-300)] px-3 py-2 text-sm"
            />
          </label>

          <label className="text-sm text-[var(--neutral-900)]">
            Max stock
            <input
              required
              min={1}
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-[var(--neutral-300)] px-3 py-2 text-sm"
            />
          </label>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button
            type="submit"
            className="rounded-lg bg-[var(--primary-400)] px-4 py-2 text-sm font-medium text-white"
          >
            Add product
          </button>
          <button
            type="button"
            onClick={() => router.push("/inventory")}
            className="rounded-lg border border-[var(--primary-200)] px-4 py-2 text-sm text-[var(--primary-400)]"
          >
            Open inventory
          </button>
        </div>
      </form>
    </section>
  );
}
