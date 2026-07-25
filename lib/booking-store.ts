import type { Booking } from "@/lib/booking";
import { seatTripKey } from "@/lib/seats";

const globalStore = globalThis as typeof globalThis & {
  __precifarmBookings?: Map<string, Booking>;
  __precifarmSeatLocks?: Map<string, Set<string>>;
};

function getStore(): Map<string, Booking> {
  if (!globalStore.__precifarmBookings) {
    globalStore.__precifarmBookings = new Map();
  }
  return globalStore.__precifarmBookings;
}

function getSeatLocks(): Map<string, Set<string>> {
  if (!globalStore.__precifarmSeatLocks) {
    globalStore.__precifarmSeatLocks = new Map();
  }
  return globalStore.__precifarmSeatLocks;
}

export function saveBooking(booking: Booking): void {
  getStore().set(booking.id, booking);
  reserveSeats(booking.routeId, booking.date, booking.time, booking.seats);
}

export function getBooking(id: string): Booking | undefined {
  return getStore().get(id);
}

export function updateBooking(id: string, patch: Partial<Booking>): Booking | undefined {
  const existing = getStore().get(id);
  if (!existing) return undefined;
  const updated = { ...existing, ...patch };
  getStore().set(id, updated);
  return updated;
}

export function getBookedSeats(routeId: string, date: string, time: string): string[] {
  const key = seatTripKey(routeId, date, time);
  const locked = getSeatLocks().get(key);
  return locked ? Array.from(locked) : [];
}

export function areSeatsAvailable(
  routeId: string,
  date: string,
  time: string,
  seats: string[]
): boolean {
  const key = seatTripKey(routeId, date, time);
  const locked = getSeatLocks().get(key) ?? new Set<string>();
  return seats.every((seat) => !locked.has(seat));
}

export function reserveSeats(
  routeId: string,
  date: string,
  time: string,
  seats: string[]
): void {
  const key = seatTripKey(routeId, date, time);
  const locks = getSeatLocks();
  const existing = locks.get(key) ?? new Set<string>();
  for (const seat of seats) {
    existing.add(seat);
  }
  locks.set(key, existing);
}
