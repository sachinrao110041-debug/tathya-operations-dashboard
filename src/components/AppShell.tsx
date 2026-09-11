"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { DashHeader } from "./DashHeader";
import { SlideOver } from "./SlideOver";

type DashboardCtx = {
  query: string;
  setQuery: (v: string) => void;
  setPanel: (v: { title: string; body: string } | null) => void;
};

export const SearchContext = createContext<DashboardCtx>({
  query: "",
  setQuery: () => {},
  setPanel: () => {},
});

export function useDashboard() {
  return useContext(SearchContext);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [panel, setPanel] = useState<{ title: string; body: string } | null>(null);
  const ctx = useMemo(() => ({ query, setQuery, setPanel }), [query]);

  return (
    <div className="flex min-h-screen bg-white">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashHeader query={query} onQuery={setQuery} />
        <SearchContext.Provider value={ctx}>
          <main className="min-h-0 flex-1 overflow-auto px-6 pb-10">{children}</main>
        </SearchContext.Provider>
      </div>
      <SlideOver open={!!panel} title={panel?.title ?? ""} onClose={() => setPanel(null)}>
        <p className="text-sm text-[var(--neutral-800)]">{panel?.body}</p>
      </SlideOver>
    </div>
  );
}
