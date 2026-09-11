const swatches: { name: string; hex: string }[] = [
  { name: "Primary 100", hex: "#c2e0be" },
  { name: "Primary 200", hex: "#85c07d" },
  { name: "Primary 300", hex: "#519548" },
  { name: "Primary 400", hex: "#3f7438" },
  { name: "Primary 500", hex: "#2d5328" },
  { name: "Neutral 100", hex: "#ffffff" },
  { name: "Neutral 500", hex: "#a4a4a4" },
  { name: "Neutral 1000", hex: "#333333" },
  { name: "Tertiary 300", hex: "#88c425" },
  { name: "T2 400", hex: "#93bc02" },
  { name: "Red 100", hex: "#fb3748" },
  { name: "Yellow 200", hex: "#dfb400" },
  { name: "Green 200", hex: "#1fc16b" },
];

export default function TokensPage() {
  return (
    <div className="pt-4">
      <h1 className="text-2xl font-semibold">Design tokens</h1>
      <p className="mt-1 text-sm text-[var(--neutral-700)]">From Figma Color System 18:3484</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {swatches.map((s) => (
          <div key={s.name} className="overflow-hidden rounded-xl border border-[var(--neutral-200)]">
            <div className="h-16" style={{ background: s.hex }} />
            <div className="px-2 py-2 text-xs">
              <p className="font-semibold">{s.name}</p>
              <p className="text-[var(--neutral-700)]">{s.hex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
