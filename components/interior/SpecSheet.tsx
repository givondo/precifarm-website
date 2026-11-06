export type SpecRow = { label: string; value: string; note?: string };
export type SpecGroup = { title?: string; rows: readonly SpecRow[] };

/** Definition-list spec sheet: label left, value right, optional note below the value. */
export default function SpecSheet({ groups, tone = "light", source }: { groups: readonly SpecGroup[]; tone?: "light" | "dark"; source?: string }) {
  const dark = tone === "dark";
  return (
    <div className={`overflow-hidden rounded-2xl ring-1 ${dark ? "ring-white/10" : "ring-border"}`}>
      {groups.map((g, gi) => (
        <div key={g.title ?? gi}>
          {g.title ? (
            <p
              className={`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest sm:px-5 ${
                dark ? "bg-white/[0.04] text-white/60" : "bg-[#f6f7f8] text-forest-500"
              } ${gi > 0 ? (dark ? "border-t border-white/10" : "border-t border-border") : ""}`}
            >
              {g.title}
            </p>
          ) : null}
          <dl>
            {g.rows.map((r) => (
              <div
                key={r.label}
                className={`grid gap-1 px-4 py-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6 sm:px-5 ${
                  dark ? "border-t border-white/10" : "border-t border-border"
                }`}
              >
                <dt className={`text-sm ${dark ? "text-white/65" : "text-forest-600"}`}>{r.label}</dt>
                <dd className={`text-sm font-medium ${dark ? "text-white" : "text-forest-900"}`}>
                  {r.value}
                  {r.note ? <span className={`mt-0.5 block text-xs font-normal ${dark ? "text-white/55" : "text-forest-500"}`}>{r.note}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
      {source ? (
        <p className={`px-4 py-3 text-xs sm:px-5 ${dark ? "border-t border-white/10 text-white/55" : "border-t border-border text-forest-500"}`}>{source}</p>
      ) : null}
    </div>
  );
}
