import { chargingHubs, routePhases } from "@/lib/hub-locations";

/**
 * Schematic of Precifarm's cities and Corridor routes, placed by latitude and longitude from
 * lib/hub-locations.ts. Not a map: no roads or borders, and no site on it is open.
 */
const box = { minLng: 33.9, maxLng: 41.2, minLat: -4.5, maxLat: 1.2 };
const W = 640;
const H = Math.round((W * (box.maxLat - box.minLat)) / (box.maxLng - box.minLng));

const x = (lng: number) => ((lng - box.minLng) / (box.maxLng - box.minLng)) * W;
const y = (lat: number) => ((box.maxLat - lat) / (box.maxLat - box.minLat)) * H;

const cities = ["nairobi", "kisumu", "nakuru", "mombasa", "eldoret", "kitui", "garissa", "voi", "mtito-andei"];
const labelSide: Record<string, "l" | "r" | "t" | "b"> = { nairobi: "l", kisumu: "l", nakuru: "t", mombasa: "l", eldoret: "t", kitui: "r", garissa: "r", voi: "r", "mtito-andei": "r" };

export default function RouteSchematic({ highlight }: { highlight?: string }) {
  const points = cities.map((id) => chargingHubs.find((h) => h.id === id)).filter((h): h is NonNullable<typeof h> => !!h);
  return (
    <figure className="overflow-hidden rounded-[1.75rem] bg-forest-950 p-4 text-white sm:p-6">
      <svg viewBox={`-60 -20 ${W + 120} ${H + 40}`} role="img" aria-labelledby="route-schematic-title" className="h-auto w-full">
        <title id="route-schematic-title">
          Schematic of Precifarm Corridor routes: Nairobi to Kisumu through Nakuru is the first route, being prepared; Nairobi to Mombasa and Nairobi to Garissa are planned.
        </title>
        {routePhases.map((r) => (
          <polyline
            key={r.id}
            points={r.path.map((p) => `${x(p.lng)},${y(p.lat)}`).join(" ")}
            fill="none"
            stroke={r.phase === "next" ? "#7ec09d" : "rgba(255,255,255,0.35)"}
            strokeWidth={r.phase === "next" ? 4 : 2}
            strokeDasharray={r.phase === "next" ? undefined : "6 7"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {points.map((h) => {
          const cx = x(h.lng);
          const cy = y(h.lat);
          const side = labelSide[h.id] ?? "r";
          const name = h.name.replace(/ (Hub|Engineering)$/, "");
          const on = highlight === h.id;
          const tx = side === "l" ? cx - 12 : side === "r" ? cx + 12 : cx;
          const ty = side === "t" ? cy - 14 : side === "b" ? cy + 24 : cy + 5;
          return (
            <g key={h.id}>
              {on ? <circle cx={cx} cy={cy} r={16} fill="rgba(126,192,157,0.25)" /> : null}
              <circle cx={cx} cy={cy} r={on ? 7 : 5} fill={on ? "#7ec09d" : "#111827"} stroke={on ? "#ffffff" : "#d1d5db"} strokeWidth={2} />
              <text
                x={tx}
                y={ty}
                textAnchor={side === "l" ? "end" : side === "r" ? "start" : "middle"}
                fontSize={on ? 19 : 16}
                fontWeight={on ? 700 : 500}
                fill={on ? "#ffffff" : "rgba(255,255,255,0.8)"}
              >
                {name}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-3 text-xs text-white/70">
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-1 w-6 rounded bg-brand-300" />
          First route, being prepared
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-0 w-6 border-t-2 border-dashed border-white/40" />
          Planned routes
        </span>
        <span>Schematic only. No site shown is open.</span>
      </figcaption>
    </figure>
  );
}
