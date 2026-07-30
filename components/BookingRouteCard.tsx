type BookingRouteCardProps = {
  from: string;
  to: string;
  duration: string;
  vehicle: string;
  fare: number;
  compact?: boolean;
};

function BusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4 16c0 1.1.9 2 2 2h1v2H6v2h12v-2h-1v-2h1c1.1 0 2-.9 2-2V6c0-2.21-1.79-4-4-4H8C5.79 2 4 3.79 4 6v10zm3-9h10v6H7V7zm2 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    </svg>
  );
}

export default function BookingRouteCard({
  from,
  to,
  duration,
  vehicle,
  fare,
  compact = false,
}: BookingRouteCardProps) {
  const fromInitial = from.slice(0, 1);
  const toInitial = to.slice(0, 1);

  return (
    <div className="booking-route-card">
      <div className="flex items-center gap-2">
        <div className="booking-route-dot">{fromInitial}</div>
        <div className="booking-route-track" aria-hidden />
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-charge-600 text-white shadow-sm">
          <BusIcon className="h-4 w-4" />
        </span>
        <div className="booking-route-track" aria-hidden />
        <div className="booking-route-dot">{toInitial}</div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={`font-semibold text-forest-900 ${compact ? "text-sm" : "text-base"}`}>
            {from} → {to}
          </p>
          <p className="mt-0.5 text-xs text-forest-500">
            {duration} · {vehicle}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-forest-500">
            From
          </p>
          <p className="font-mono text-lg font-bold tabular-nums text-charge-600">
            KSh {fare.toLocaleString()}
          </p>
          <p className="text-[10px] text-forest-500">per seat</p>
        </div>
      </div>
    </div>
  );
}
