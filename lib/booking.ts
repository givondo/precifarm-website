import { nairobiKisumuRoute } from "@/lib/route";
import { isValidSeatId } from "@/lib/seats";

export const MAX_PASSENGERS = 6;
export const MIN_PASSENGERS = 1;

export function getLocalDateString(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export type BookingStatus = "pending" | "paid" | "failed";

export type Booking = {
  id: string;
  reference: string;
  routeId: string;
  from: string;
  to: string;
  vehicle: string;
  date: string;
  time: string;
  passengers: number;
  seats: string[];
  farePerSeat: number;
  total: number;
  name: string;
  phone: string;
  email?: string;
  status: BookingStatus;
  mpesaReceipt?: string;
  paidAt?: string;
  createdAt: string;
};

export type CreateBookingInput = {
  routeId: string;
  date: string;
  time: string;
  passengers: number;
  seats: string[];
  name: string;
  phone: string;
  idNumber: string;
  email?: string;
};

export type PaymentResult = {
  status: "success" | "pending" | "failed";
  reference: string;
  bookingId?: string;
  mpesaReceipt?: string;
  paidAt?: string;
  message?: string;
  demo?: boolean;
  checkoutRequestId?: string;
};

export function isDemoPayment(): boolean {
  return process.env.DEMO_PAYMENT !== "false";
}

export function hasMpesaCredentials(): boolean {
  return Boolean(
    process.env.MPESA_CONSUMER_KEY &&
      process.env.MPESA_CONSUMER_SECRET &&
      process.env.MPESA_PASSKEY &&
      process.env.MPESA_SHORTCODE
  );
}

export function calculateFare(passengers: number, farePerSeat = nairobiKisumuRoute.fare): number {
  return farePerSeat * passengers;
}

export function generateBookingReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `PF-${code}`;
}

export function normalizeKenyanPhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (/^0[17]\d{8}$/.test(digits)) {
    return `254${digits.slice(1)}`;
  }
  if (/^254[17]\d{8}$/.test(digits)) {
    return digits;
  }
  return null;
}

export function formatPhoneDisplay(phone: string): string {
  const normalized = normalizeKenyanPhone(phone);
  if (!normalized) return phone;
  const local = `0${normalized.slice(3)}`;
  return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7)}`;
}

export function validateIdNumber(idNumber: string): boolean {
  const normalized = idNumber.trim().replace(/\s/g, "");
  if (normalized.length < 6 || normalized.length > 20) return false;
  return /^[A-Za-z0-9]+$/.test(normalized);
}

export function addDaysToDateString(base: Date, days: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return getLocalDateString(d);
}

export function validateBookingInput(input: CreateBookingInput): string | null {
  if (input.routeId !== nairobiKisumuRoute.id) {
    return "Route not available.";
  }

  if (!input.date) {
    return "Travel date is required.";
  }

  const today = getLocalDateString();
  if (input.date < today) {
    return "Travel date cannot be in the past.";
  }

  if (
    !Number.isInteger(input.passengers) ||
    input.passengers < MIN_PASSENGERS ||
    input.passengers > MAX_PASSENGERS
  ) {
    return `Passengers must be between ${MIN_PASSENGERS} and ${MAX_PASSENGERS}.`;
  }

  if (!nairobiKisumuRoute.departures.includes(input.time as (typeof nairobiKisumuRoute.departures)[number])) {
    return "Invalid departure time.";
  }

  if (!Array.isArray(input.seats) || input.seats.length === 0) {
    return "Select at least one seat.";
  }

  if (input.seats.length !== input.passengers) {
    return `Select exactly ${input.passengers} seat${input.passengers > 1 ? "s" : ""}.`;
  }

  const uniqueSeats = new Set(input.seats);
  if (uniqueSeats.size !== input.seats.length) {
    return "Each seat can only be selected once.";
  }

  for (const seat of input.seats) {
    if (!isValidSeatId(seat)) {
      return `Invalid seat: ${seat}.`;
    }
  }

  const name = input.name.trim();
  if (name.length < 2) {
    return "Full name is required.";
  }

  if (!normalizeKenyanPhone(input.phone)) {
    return "Enter a valid Kenyan phone number (e.g. 07XX XXX XXX).";
  }

  if (!input.idNumber?.trim()) {
    return "National ID or passport number is required.";
  }

  if (!validateIdNumber(input.idNumber)) {
    return "Enter a valid National ID or passport number (6–20 letters/numbers).";
  }

  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    return "Enter a valid email address.";
  }

  return null;
}

export function buildBooking(input: CreateBookingInput): Booking {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    reference: generateBookingReference(),
    routeId: nairobiKisumuRoute.id,
    from: nairobiKisumuRoute.from,
    to: nairobiKisumuRoute.to,
    vehicle: nairobiKisumuRoute.vehicle,
    date: input.date,
    time: input.time,
    passengers: input.passengers,
    seats: [...input.seats],
    farePerSeat: nairobiKisumuRoute.fare,
    total: calculateFare(input.passengers),
    name: input.name.trim(),
    phone: normalizeKenyanPhone(input.phone)!,
    email: input.email?.trim() || undefined,
    status: "pending",
    createdAt: now,
  };
}
