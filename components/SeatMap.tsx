"use client";

import { ALL_SEATS, type SeatId, type SeatStatus } from "@/lib/seats";

type SeatMapProps = {
  selected: SeatId[];
  occupied: Set<string>;
  maxSelectable: number;
  onToggle: (seatId: SeatId) => void;
  compact?: boolean;
};

function seatStatus(
  seatId: SeatId,
  selected: SeatId[],
  occupied: Set<string>
): SeatStatus {
  if (occupied.has(seatId)) return "occupied";
  if (selected.includes(seatId)) return "selected";
  return "available";
}

const statusClasses: Record<SeatStatus, string> = {
  available:
    "border-border bg-white text-forest-700 hover:border-forest-900 hover:bg-muted hover:shadow-sm",
  selected:
    "border-charge-600 bg-charge-600 text-white shadow-md shadow-blue-900/10 ring-2 ring-charge-500/20 ring-offset-1",
  occupied:
    "cursor-not-allowed border-border bg-muted text-forest-400 line-through opacity-60",
};

export default function SeatMap({
  selected,
  occupied,
  maxSelectable,
  onToggle,
  compact = false,
}: SeatMapProps) {
  const rows = Array.from({ length: 12 }, (_, i) => i + 1);
  const seatSize = compact ? "h-9 w-9 text-[10px]" : "h-10 w-10 text-xs sm:h-11 sm:w-11";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <div
          className={`rounded-t-2xl border border-b-0 border-forest-200 bg-gradient-to-b from-forest-50 to-white text-center font-semibold text-forest-500 ${
            compact ? "w-28 px-3 py-2 text-[10px]" : "w-32 px-4 py-2.5 text-xs"
          }`}
        >
          ↑ Front · Driver
        </div>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className={`mx-auto min-w-[16rem] ${compact ? "max-w-sm" : "max-w-md"}`}>
          {rows.map((row) => {
            const rowSeats = ALL_SEATS.filter((seat) => seat.row === row);
            const left = rowSeats.filter((seat) => seat.letter === "A" || seat.letter === "B");
            const right = rowSeats.filter((seat) => seat.letter === "C" || seat.letter === "D");

            return (
              <div key={row} className="mb-1.5 flex items-center justify-center gap-2 sm:gap-3">
                <span
                  className={`shrink-0 text-center font-medium text-forest-500 ${
                    compact ? "w-4 text-[10px]" : "w-5 text-xs"
                  }`}
                >
                  {row}
                </span>
                <div className="flex gap-1 sm:gap-1.5">
                  {left.map((seat) => {
                    const status = seatStatus(seat.id, selected, occupied);
                    const atMax = selected.length >= maxSelectable && status === "available";
                    return (
                      <button
                        key={seat.id}
                        type="button"
                        aria-label={`Seat ${seat.id}${status === "occupied" ? ", occupied" : ""}${
                          status === "selected" ? ", selected" : ""
                        }`}
                        aria-pressed={status === "selected"}
                        disabled={status === "occupied" || atMax}
                        onClick={() => onToggle(seat.id)}
                        className={`rounded-lg border font-semibold transition-colors ${seatSize} ${statusClasses[status]} ${
                          atMax ? "opacity-40" : ""
                        }`}
                      >
                        {seat.letter}
                      </button>
                    );
                  })}
                </div>
                <div
                  className={`shrink-0 border-t border-dashed border-forest-200 ${
                    compact ? "w-5" : "w-6 sm:w-8"
                  }`}
                  aria-hidden
                />
                <div className="flex gap-1 sm:gap-1.5">
                  {right.map((seat) => {
                    const status = seatStatus(seat.id, selected, occupied);
                    const atMax = selected.length >= maxSelectable && status === "available";
                    return (
                      <button
                        key={seat.id}
                        type="button"
                        aria-label={`Seat ${seat.id}${status === "occupied" ? ", occupied" : ""}${
                          status === "selected" ? ", selected" : ""
                        }`}
                        aria-pressed={status === "selected"}
                        disabled={status === "occupied" || atMax}
                        onClick={() => onToggle(seat.id)}
                        className={`rounded-lg border font-semibold transition-colors ${seatSize} ${statusClasses[status]} ${
                          atMax ? "opacity-40" : ""
                        }`}
                      >
                        {seat.letter}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-forest-600">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border border-border bg-white" />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border border-charge-600 bg-charge-600" />
          Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border border-border bg-forest-100" />
          Taken
        </span>
      </div>
    </div>
  );
}
