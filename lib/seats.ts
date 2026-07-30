/** Yutong U18 intercity bus — 2+2 layout, 12 rows × 4 seats = 48 seats */
export const SEAT_ROWS = 12;
export const SEAT_LETTERS = ["A", "B", "C", "D"] as const;

export type SeatId = `${number}${(typeof SEAT_LETTERS)[number]}`;

export type SeatStatus = "available" | "selected" | "occupied";

export type Seat = {
  id: SeatId;
  row: number;
  letter: (typeof SEAT_LETTERS)[number];
};

export function buildSeatLayout(): Seat[] {
  const seats: Seat[] = [];
  for (let row = 1; row <= SEAT_ROWS; row++) {
    for (const letter of SEAT_LETTERS) {
      seats.push({ id: `${row}${letter}`, row, letter });
    }
  }
  return seats;
}

export const ALL_SEATS = buildSeatLayout();

export function isValidSeatId(id: string): id is SeatId {
  return ALL_SEATS.some((seat) => seat.id === id);
}

export function seatTripKey(routeId: string, date: string, time: string): string {
  return `${routeId}:${date}:${time}`;
}
