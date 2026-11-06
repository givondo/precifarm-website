import type { DeliverableId } from "@/lib/engineering-page";

/**
 * A miniature of each deliverable type: drawing frame, title block and the layout of its content.
 * Placeholder rows only; no values, so nothing reads as a past project.
 */

function Preview({ id }: { id: DeliverableId }) {
  const line = "#c4cad1";
  const ink = "#1f2937";
  if (id === "sld")
    return (
      <svg viewBox="0 0 200 110" className="h-full w-full" aria-hidden fill="none">
        <path d="M100 8v14" stroke={ink} strokeWidth="1.5" />
        <circle cx="100" cy="26" r="5" stroke={ink} strokeWidth="1.2" />
        <path d="M100 31v10M40 41h120M40 41v14M100 41v14M160 41v14" stroke={ink} strokeWidth="1.5" />
        {[40, 100, 160].map((x) => (
          <g key={x}>
            <rect x={x - 6} y="55" width="12" height="9" stroke={ink} strokeWidth="1.2" />
            <path d={`M${x} 64v14`} stroke={ink} strokeWidth="1.5" />
            <rect x={x - 12} y="78" width="24" height="18" rx="3" stroke={ink} strokeWidth="1.2" fill={x === 160 ? "#111827" : "none"} />
          </g>
        ))}
        <path d="M150 87h20" stroke="#7EC09D" strokeWidth="1.5" />
      </svg>
    );
  if (id === "load")
    return (
      <svg viewBox="0 0 200 110" className="h-full w-full" aria-hidden fill="none">
        <path d="M16 96h176M16 10v86" stroke={line} />
        <path d="M16 30h176" stroke="#d94848" strokeDasharray="4 3" strokeWidth="1.2" />
        {Array.from({ length: 24 }, (_, i) => {
          const base = 18 + 16 * Math.sin(((i - 6) / 24) * Math.PI * 2) ** 2;
          const ev = i >= 19 || i <= 4 ? 22 : 0;
          return (
            <g key={i}>
              <rect x={20 + i * 7} y={96 - base} width="5" height={base} fill="#9aa4b2" />
              {ev ? <rect x={20 + i * 7} y={96 - base - ev} width="5" height={ev} fill="#1F6F4A" /> : null}
            </g>
          );
        })}
      </svg>
    );
  const cols = id === "cables" ? 6 : id === "protection" ? 5 : 4;
  return (
    <svg viewBox="0 0 200 110" className="h-full w-full" aria-hidden fill="none">
      <rect x="8" y="8" width="184" height="14" fill="#eef0f2" />
      {Array.from({ length: 6 }, (_, r) => (
        <path key={r} d={`M8 ${22 + (r + 1) * 14}h184`} stroke={line} strokeWidth="0.8" />
      ))}
      {Array.from({ length: cols - 1 }, (_, c) => (
        <path key={c} d={`M${8 + ((c + 1) * 184) / cols} 8v98`} stroke={line} strokeWidth="0.8" />
      ))}
      {Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <rect key={`${r}-${c}`} x={12 + (c * 184) / cols} y={27 + r * 14} width={((184 / cols) * (0.4 + ((r + c) % 3) * 0.15)) | 0} height="4" rx="2" fill={id === "commissioning" && c === cols - 1 ? "#7EC09D" : "#d1d5db"} />
        )),
      )}
    </svg>
  );
}

export default function DeliverableSheet({ id, index, title, text, fields }: { id: DeliverableId; index: number; title: string; text: string; fields: readonly string[] }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-28px_rgba(17,24,39,0.45)] ring-1 ring-border">
      <div className="m-3 rounded-lg border border-forest-200 bg-white">
        <div className="aspect-[200/110] p-2">
          <Preview id={id} />
        </div>
        <div className="grid grid-cols-[1fr_auto] border-t border-forest-200 font-mono text-[9.5px] uppercase tracking-wider text-forest-500">
          <span className="truncate px-2 py-1.5">Precifarm · {title}</span>
          <span className="border-l border-forest-200 px-2 py-1.5">Sheet {index + 1}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 sm:px-5 sm:pb-5">
        <h3 className="text-base font-semibold text-forest-900">{title}</h3>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-forest-600">{text}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {fields.map((f) => (
            <li key={f} className="rounded-md bg-[#f1f3f4] px-2 py-1 text-[11.5px] text-forest-700">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
