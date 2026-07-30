import { vehicles } from "@/lib/vehicles";

export const nairobiKisumuRoute = {
  id: "nairobi-kisumu",
  label: "Nairobi – Kisumu",
  from: "Nairobi",
  to: "Kisumu",
  duration: "4h 45m",
  distance: "~345 km",
  vehicle: vehicles.intercity.model,
  fare: 1550,
  departures: ["06:00", "08:00", "10:00", "14:00", "16:00"],
  status: "Booking open",
} as const;

export const bookingHighlights = [
  {
    title: "One booking flow",
    text: "Route, date, departure and seats in a single step.",
  },
  {
    title: "M-Pesa at launch",
    text: "Pay on your phone and receive your ticket by SMS.",
  },
  {
    title: "Charging locked in",
    text: "Hub energy reserved before every Yutong U18 leaves.",
  },
  {
    title: "Honest updates",
    text: "SMS notice if the departure time or boarding point changes.",
  },
] as const;
