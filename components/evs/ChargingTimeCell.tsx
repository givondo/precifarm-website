import type { ChargingTime } from "@/lib/kenya-ev-charging-time";

const labelClass = "w-9 shrink-0 text-[10px] font-semibold uppercase tracking-wide text-forest-400";
const valueClass = "font-mono text-sm font-medium tabular-nums text-forest-900";

export default function ChargingTimeCell({ time }: { time: ChargingTime }) {
  const rows: { key: keyof ChargingTime; label: string; value: string }[] = [];

  if (time.swap) rows.push({ key: "swap", label: "Swap", value: time.swap });
  if (time.home) rows.push({ key: "home", label: "Home", value: time.home });
  if (time.dc) rows.push({ key: "dc", label: "DC", value: time.dc });

  return (
    <ul className="space-y-1">
      {rows.map((row) => (
        <li key={row.key} className="flex items-baseline gap-2">
          <span className={labelClass}>{row.label}</span>
          <span className={valueClass}>{row.value}</span>
        </li>
      ))}
    </ul>
  );
}
