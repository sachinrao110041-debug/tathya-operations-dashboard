"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Step = {
  id: string;
  title: string;
  hint: string;
  cta: string;
  route?: string;
};

const steps: Step[] = [
  {
    id: "workspace",
    title: "Workspace setup",
    hint: "Review navigation, role access, and daily operational goals for your team.",
    cta: "Continue",
  },
  {
    id: "orders",
    title: "Orders workflow",
    hint: "Create your first order and test status transitions from COD pending to delivered.",
    cta: "Open create order",
    route: "/actions/create-order",
  },
  {
    id: "inventory",
    title: "Inventory workflow",
    hint: "Add a product and confirm stock thresholds are reflected in inventory watch.",
    cta: "Open add product",
    route: "/actions/add-product",
  },
  {
    id: "cod",
    title: "COD operations",
    hint: "Use COD action center to record pending collections and clear shipment blockers.",
    cta: "Open COD center",
    route: "/actions/record-cod",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);

  const progress = useMemo(() => Math.round((completed.length / steps.length) * 100), [completed.length]);
  const step = steps[active];

  const markDone = (index: number) => {
    setCompleted((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  return (
    <section className="mx-auto mt-4 max-w-[1100px] space-y-5">
      <div className="rounded-2xl border border-[var(--primary-100)] bg-[var(--base-alpha-50)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--neutral-1000)]">Dashboard onboarding</h1>
            <p className="mt-1 text-sm text-[var(--neutral-700)]">
              Configure core workflows before handing the dashboard to your ops team.
            </p>
          </div>
          <Link href="/" className="rounded-lg border border-[var(--primary-200)] px-3 py-2 text-sm text-[var(--primary-400)]">
            Back to dashboard
          </Link>
        </div>
        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--neutral-200)]">
            <div className="h-full rounded-full bg-[var(--primary-400)] transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1 text-xs text-[var(--neutral-700)]">{progress}% complete</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-[var(--ink-line)] bg-white p-3">
          <p className="px-2 pb-2 text-xs uppercase tracking-[0.5px] text-[var(--neutral-600)]">Onboarding steps</p>
          <div className="space-y-1">
            {steps.map((item, index) => {
              const isDone = completed.includes(index);
              const isActive = active === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`flex w-full items-start gap-2 rounded-xl px-3 py-2 text-left ${
                    isActive ? "bg-[var(--primary-100)]" : "hover:bg-[var(--base-alpha-50)]"
                  }`}
                >
                  <span
                    className={`mt-1 inline-block h-2.5 w-2.5 rounded-full ${
                      isDone ? "bg-[var(--green-200)]" : "bg-[var(--neutral-400)]"
                    }`}
                  />
                  <span>
                    <span className="block text-sm font-medium text-[var(--neutral-900)]">{item.title}</span>
                    <span className="block text-xs text-[var(--neutral-700)]">{isDone ? "Completed" : "Pending"}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="rounded-2xl border border-[var(--ink-line)] bg-white p-5">
          <p className="text-xs uppercase tracking-[0.6px] text-[var(--neutral-600)]">Current step</p>
          <h2 className="mt-1 text-xl font-semibold text-[var(--neutral-1000)]">{step.title}</h2>
          <p className="mt-2 text-sm text-[var(--neutral-700)]">{step.hint}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                markDone(active);
                if (step.route) router.push(step.route);
                else if (active < steps.length - 1) setActive(active + 1);
              }}
              className="rounded-lg bg-[var(--primary-400)] px-4 py-2 text-sm font-medium text-white"
            >
              {step.cta}
            </button>
            <button
              type="button"
              onClick={() => {
                markDone(active);
                if (active < steps.length - 1) setActive(active + 1);
              }}
              className="rounded-lg border border-[var(--primary-200)] px-4 py-2 text-sm text-[var(--primary-400)]"
            >
              Mark complete
            </button>
            {active > 0 ? (
              <button
                type="button"
                onClick={() => setActive(active - 1)}
                className="rounded-lg border border-[var(--neutral-300)] px-4 py-2 text-sm text-[var(--neutral-800)]"
              >
                Previous
              </button>
            ) : null}
          </div>

          {completed.length === steps.length ? (
            <div className="mt-6 rounded-xl border border-[var(--green-alpha-10)] bg-[var(--base-alpha-50)] p-3 text-sm text-[var(--primary-400)]">
              Onboarding completed. Your team can now run daily operations from the dashboard.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
