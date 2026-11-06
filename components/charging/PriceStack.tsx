type Line = { id: string; item: string; detail: string; price: string; tag: string };

/**
 * Quote-style price breakdown. Lines in `bundle` share one published price (`bundlePrice`);
 * the rest stand alone. Nothing here is a number that is not already in site copy.
 */
export default function PriceStack({
  lines,
  bundle,
  bundleLabel,
  bundlePrice,
  bundleNote,
}: {
  lines: readonly Line[];
  bundle: readonly string[];
  bundleLabel: string;
  bundlePrice: string;
  bundleNote: string;
}) {
  const row = (l: Line) => (
    <li key={l.id} className="grid gap-2 px-4 py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto] sm:items-start sm:gap-5 sm:px-6">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-forest-500 sm:pt-0.5">{l.tag}</span>
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold text-forest-900">{l.item}</span>
        <span className="mt-1 block text-sm leading-relaxed text-forest-600">{l.detail}</span>
      </span>
      <span className="text-sm font-semibold text-forest-900 sm:text-right">{l.price}</span>
    </li>
  );
  const first = lines.findIndex((l) => bundle.includes(l.id));
  const before = lines.slice(0, first);
  const bundled = lines.filter((l) => bundle.includes(l.id));
  const after = lines.slice(first).filter((l) => !bundle.includes(l.id));

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-border">
      <ul className="divide-y divide-border">{before.map(row)}</ul>
      <div className="border-y border-forest-950/80 bg-[#f6f7f8]">
        <ul className="divide-y divide-border">{bundled.map(row)}</ul>
        <div className="flex flex-col gap-1 border-t border-border bg-white px-4 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:px-6">
          <p className="text-sm font-semibold text-forest-900">{bundleLabel}</p>
          <p className="font-display text-2xl font-semibold tracking-tight text-forest-950">{bundlePrice}</p>
        </div>
        <p className="bg-white px-4 pb-4 text-xs leading-relaxed text-forest-500 sm:px-6">{bundleNote}</p>
      </div>
      <ul className="divide-y divide-border">{after.map(row)}</ul>
    </div>
  );
}
