"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AssetIcon } from "./AssetIcon";

const items = [
  { href: "/", label: "Overview", src: "/icons/nav-overview.svg" },
  { href: "/orders", label: "Orders", src: "/icons/nav-orders.svg" },
  { href: "/returns", label: "Returns", src: "/icons/nav-returns.svg" },
  { href: "/suppliers", label: "Suppliers", src: "/icons/nav-suppliers.svg" },
  { href: "/shipments", label: "Shipments", src: "/icons/nav-shipments.svg" },
];

export function AppSidebar() {
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex h-screen flex-col overflow-hidden border-r border-[var(--ink-line)] bg-white transition-[width] duration-200 ${
        collapsed ? "w-[76px] min-w-[76px]" : "w-[228px] min-w-[228px]"
      }`}
    >
      <div className={`flex h-[58px] items-center gap-2.5 border-b border-[var(--ink-line)] ${collapsed ? "px-2" : "px-3.5"}`}>
        {collapsed ? null : (
          <p className="flex-1 font-[family-name:var(--font-space)] text-[15px] font-bold leading-[22.5px] tracking-[-0.3px] text-[var(--ink)]">
            Tathya Dashboard
          </p>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className={`flex size-7 items-center justify-center rounded-[7px] ${collapsed ? "mx-auto" : ""}`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
        >
          <AssetIcon src="/icons/nav-collapse.svg" alt="" box={13} leaf={13} />
        </button>
      </div>
      <nav className={`flex flex-1 flex-col gap-1 overflow-auto py-2.5 ${collapsed ? "px-2" : "px-2"}`}>
        {/* Nav icons are Figma exports at 16×16 */}
        {items.map((item) => {
          const active = path === item.href || (item.href !== "/" && path.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`relative flex h-[41px] w-full items-center rounded-[8px] py-2.5 text-[13.5px] leading-[20.25px] ${
                active
                  ? "bg-[var(--primary-100)] font-medium text-[var(--primary-400)] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.2),0px_0px_12px_0px_rgba(255,255,255,0.2)]"
                  : "font-normal text-[var(--primary-300)] hover:bg-[var(--base-alpha-50)]"
              } ${collapsed ? "justify-center px-2" : "gap-3 px-3"}`}
            >
              {active ? (
                <span className="absolute left-0 top-[10px] h-5 w-0.5 rounded-r-full bg-[var(--primary-400)]" />
              ) : null}
              <AssetIcon src={item.src} alt="" box={16} leaf={16} />
              {collapsed ? null : item.label}
            </Link>
          );
        })}
      </nav>
      <div className={`flex h-[51px] items-center px-2.5 pb-2 pt-2.5 ${collapsed ? "justify-center" : "gap-2.5"}`}>
        <div className="flex size-[30px] items-center justify-center rounded-[15px] border-[0.8px] border-[#1b7a43] bg-[var(--primary-100)]">
          <span className="font-[family-name:var(--font-space)] text-[11px] font-bold leading-[16.5px] text-[#1b7a43]">
            SC
          </span>
        </div>
        {collapsed ? null : (
          <div>
            <p className="font-[family-name:var(--font-space)] text-[13px] font-medium leading-[16.9px] text-[var(--ink)]">
              Sachin C.
            </p>
            <p className="font-[family-name:var(--font-space)] text-[11px] leading-[15.4px] text-[var(--ink-muted)]">
              Admin
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
