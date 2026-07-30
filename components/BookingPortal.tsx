"use client";

import { useCallback, useEffect, useState } from "react";
import SeatMap from "@/components/SeatMap";
import BookingRouteCard from "@/components/BookingRouteCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import StepIndicator from "@/components/ui/StepIndicator";
import {
  addDaysToDateString,
  calculateFare,
  formatPhoneDisplay,
  getLocalDateString,
  MAX_PASSENGERS,
  MIN_PASSENGERS,
  normalizeKenyanPhone,
  validateIdNumber,
} from "@/lib/booking";
import {
  MPESA_POLL_INTERVAL_MS,
  MPESA_POLL_TIMEOUT_MS,
  mpesaTrustCopy,
  type PaymentMode,
  type StkPaymentResult,
} from "@/lib/payment";
import { nairobiKisumuRoute } from "@/lib/route";
import type { SeatId } from "@/lib/seats";
import { getBookingAnalyticsPayload, trackEvent } from "@/lib/analytics";

const { from, to, duration, fare, departures, vehicle } = nairobiKisumuRoute;

type Step = "search" | "seats" | "details" | "confirm" | "paying" | "done";

const STEPS: { id: Step; label: string }[] = [
  { id: "search", label: "Journey" },
  { id: "seats", label: "Seats" },
  { id: "details", label: "Details" },
  { id: "confirm", label: "Pay" },
];

type BookingResponse = {
  bookingId: string;
  reference: string;
  total: number;
};

function formatSeats(seats: string[]): string {
  return [...seats].sort((a, b) => {
    const rowA = parseInt(a, 10);
    const rowB = parseInt(b, 10);
    if (rowA !== rowB) return rowA - rowB;
    return a.localeCompare(b);
  }).join(", ");
}

export default function BookingPortal({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState<Step>("search");
  const [date, setDate] = useState(() => addDaysToDateString(new Date(), 1));
  const [time, setTime] = useState("08:00");
  const [passengers, setPassengers] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<SeatId[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<Set<string>>(new Set());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [mpesaReceipt, setMpesaReceipt] = useState("");
  const [isDemo, setIsDemo] = useState(false);
  const [paymentMode, setPaymentMode] = useState<PaymentMode | null>(null);
  const [pendingBookingId, setPendingBookingId] = useState("");
  const [pendingReference, setPendingReference] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [payingLoading, setPayingLoading] = useState(false);

  const total = calculateFare(passengers);
  const minDate = getLocalDateString();
  const dateQuickPicks = [
    { label: "Today", value: getLocalDateString() },
    { label: "Tomorrow", value: addDaysToDateString(new Date(), 1) },
    { label: "In 3 days", value: addDaysToDateString(new Date(), 3) },
  ];
  const seatProgress = passengers > 0 ? selectedSeats.length / passengers : 0;

  const shell = compact
    ? "rounded-2xl border-0 bg-transparent shadow-none"
    : "card-elevated overflow-hidden";
  const bodyPad = compact ? "p-0" : "p-6";
  const formGap = compact ? "space-y-4" : "space-y-5";

  const fetchOccupiedSeats = useCallback(async () => {
    if (!date || !time) return;
    try {
      const params = new URLSearchParams({
        routeId: nairobiKisumuRoute.id,
        date,
        time,
      });
      const res = await fetch(`/api/seats?${params}`);
      const data = (await res.json()) as { occupied?: string[]; error?: string };
      if (res.ok && data.occupied) {
        setOccupiedSeats(new Set(data.occupied));
      }
    } catch {
      // Non-blocking — seat map still works without live occupancy
    }
  }, [date, time]);

  useEffect(() => {
    if (step === "seats") {
      void fetchOccupiedSeats();
    }
  }, [step, fetchOccupiedSeats]);

  useEffect(() => {
    fetch("/api/cms/health")
      .then((r) => r.json())
      .then((json) => {
        if (json.paymentMode) setPaymentMode(json.paymentMode);
        else if (json.data?.paymentMode) setPaymentMode(json.data.paymentMode);
      })
      .catch(() => setPaymentMode(null));
  }, []);

  useEffect(() => {
    if (step !== "paying" || !pendingBookingId) return;

    let cancelled = false;
    const started = Date.now();

    const poll = async () => {
      while (!cancelled && Date.now() - started < MPESA_POLL_TIMEOUT_MS) {
        await new Promise((r) => setTimeout(r, MPESA_POLL_INTERVAL_MS));
        try {
          const res = await fetch(
            `/api/payment/status?bookingId=${encodeURIComponent(pendingBookingId)}`
          );
          const data = (await res.json()) as {
            paid?: boolean;
            failed?: boolean;
            reference?: string;
            mpesaReceipt?: string;
            error?: string;
          };
          if (!res.ok) continue;
          if (data.paid) {
            trackEvent("website_payment_succeeded", {
              booking_reference: data.reference ?? pendingReference,
            });
            setBookingRef(data.reference ?? pendingReference);
            setMpesaReceipt(data.mpesaReceipt ?? "");
            setIsDemo(false);
            setPendingBookingId("");
            setStep("done");
            return;
          }
          if (data.failed) {
            trackEvent("website_payment_failed", { reason: "declined_or_cancelled" });
            setError("M-Pesa payment was declined or cancelled.");
            setStep("confirm");
            setPendingBookingId("");
            return;
          }
        } catch {
          /* keep polling */
        }
      }
      if (!cancelled) {
        trackEvent("website_payment_failed", { reason: "timeout" });
        setError("Payment timed out. Tap Retry M-Pesa or check status.");
        setStep("confirm");
        setPendingBookingId("");
      }
    };

    void poll();
    return () => {
      cancelled = true;
    };
  }, [step, pendingBookingId, pendingReference]);

  function resetForm() {
    setStep("search");
    setDate(addDaysToDateString(new Date(), 1));
    setTime("08:00");
    setPassengers(1);
    setSelectedSeats([]);
    setOccupiedSeats(new Set());
    setName("");
    setPhone("");
    setIdNumber("");
    setEmail("");
    setError("");
    setBookingRef("");
    setMpesaReceipt("");
    setIsDemo(false);
    setPendingBookingId("");
    setPendingReference("");
    setPaymentMessage("");
  }

  function handlePassengersChange(count: number) {
    setPassengers(count);
    setSelectedSeats((prev) => (prev.length > count ? prev.slice(0, count) : prev));
  }

  function toggleSeat(seatId: SeatId) {
    setError("");
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      }
      if (prev.length >= passengers) return prev;
      return [...prev, seatId];
    });
  }

  function goToSearch() {
    setError("");
    setStep("search");
  }

  function goToSeats() {
    setError("");
    if (!date) {
      setError("Please select a travel date.");
      return;
    }
    setStep("seats");
    trackEvent("website_booking_search_submitted", {
      route_id: nairobiKisumuRoute.id,
      date,
      time,
      passengers,
    });
  }

  function goToDetails() {
    setError("");
    if (selectedSeats.length !== passengers) {
      setError(
        `Select ${passengers} seat${passengers > 1 ? "s" : ""} to continue (${selectedSeats.length} selected).`
      );
      return;
    }
    setStep("details");
    trackEvent("website_booking_seats_selected", {
      seat_count: selectedSeats.length,
      seats: selectedSeats.join(","),
    });
  }

  function goToConfirm() {
    setError("");
    if (name.trim().length < 2) {
      setError("Enter your full name.");
      return;
    }
    if (!normalizeKenyanPhone(phone)) {
      setError("Enter a valid Kenyan phone number (e.g. 07XX XXX XXX).");
      return;
    }
    if (!idNumber.trim()) {
      setError("National ID or passport number is required for boarding.");
      return;
    }
    if (!validateIdNumber(idNumber)) {
      setError("Enter a valid National ID or passport (6–20 letters/numbers).");
      return;
    }
    setStep("confirm");
    trackEvent("website_booking_details_submitted", { passengers });
  }

  async function handlePayment() {
    setError("");
    setPayingLoading(true);
    setStep("paying");

    try {
      const bookingRes = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          routeId: nairobiKisumuRoute.id,
          date,
          time,
          passengers,
          seats: selectedSeats,
          name,
          phone,
          idNumber,
          email: email || undefined,
          analytics: getBookingAnalyticsPayload(),
        }),
      });

      const bookingData = (await bookingRes.json()) as BookingResponse & { error?: string };
      if (!bookingRes.ok) {
        trackEvent("website_booking_failed", { step: "create" });
        throw new Error(bookingData.error ?? "Could not create booking.");
      }

      trackEvent("website_booking_created", {
        booking_reference: bookingData.reference,
        amount_kes: bookingData.total,
      });

      trackEvent("website_payment_started", { booking_reference: bookingData.reference });

      const paymentRes = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: bookingData.bookingId }),
      });

      const paymentData = (await paymentRes.json()) as StkPaymentResult & { error?: string };
      if (!paymentRes.ok) {
        throw new Error(paymentData.error ?? "Payment failed.");
      }

      if (paymentData.status === "pending") {
        trackEvent("website_payment_pending", { booking_reference: bookingData.reference });
        setPendingBookingId(bookingData.bookingId);
        setPendingReference(paymentData.reference || bookingData.reference);
        setPaymentMessage(
          paymentData.message ??
            "M-Pesa Express STK sent. Enter your PIN on your phone to complete payment."
        );
        return;
      }

      setBookingRef(paymentData.reference || bookingData.reference);
      setMpesaReceipt(paymentData.mpesaReceipt ?? "");
      setIsDemo(paymentData.demo ?? false);
      trackEvent("website_payment_succeeded", {
        booking_reference: paymentData.reference || bookingData.reference,
        is_demo: paymentData.demo ?? false,
      });
      setStep("done");
    } catch (err) {
      trackEvent("website_payment_failed", { step: "payment" });
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep("confirm");
      setPendingBookingId("");
    } finally {
      setPayingLoading(false);
    }
  }

  async function handleRetryPayment() {
    if (!pendingBookingId) return;
    setPayingLoading(true);
    setError("");
    try {
      const paymentRes = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: pendingBookingId }),
      });
      const paymentData = (await paymentRes.json()) as StkPaymentResult & { error?: string };
      if (!paymentRes.ok) {
        throw new Error(paymentData.error ?? "Could not resend STK push.");
      }
      if (paymentData.status === "success") {
        setBookingRef(paymentData.reference ?? pendingReference);
        setMpesaReceipt(paymentData.mpesaReceipt ?? "");
        setIsDemo(paymentData.demo ?? false);
        setPendingBookingId("");
        setStep("done");
        return;
      }
      setPaymentMessage(paymentData.message ?? "STK push sent again. Enter your PIN to pay.");
      setStep("paying");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not retry payment.");
      setStep("confirm");
    } finally {
      setPayingLoading(false);
    }
  }

  async function handleCheckPayment() {
    if (!pendingBookingId) return;
    setCheckingPayment(true);
    setError("");
    try {
      const res = await fetch(
        `/api/payment/status?bookingId=${encodeURIComponent(pendingBookingId)}`
      );
      const data = (await res.json()) as {
        paid?: boolean;
        failed?: boolean;
        reference?: string;
        mpesaReceipt?: string;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error ?? "Could not verify payment.");
      }
      if (data.paid) {
        trackEvent("website_payment_succeeded", {
          booking_reference: data.reference ?? pendingReference,
        });
        setBookingRef(data.reference ?? pendingReference);
        setMpesaReceipt(data.mpesaReceipt ?? "");
        setIsDemo(false);
        setPendingBookingId("");
        setStep("done");
        return;
      }
      if (data.failed) {
        trackEvent("website_payment_failed", { reason: "declined_or_cancelled" });
        setError("M-Pesa payment failed. Tap Retry M-Pesa to try again.");
        setStep("confirm");
        setPendingBookingId("");
        return;
      }
      setPaymentMessage("Payment not received yet. Complete M-Pesa on your phone or tap Retry.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not verify payment.");
    } finally {
      setCheckingPayment(false);
    }
  }

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  if (step === "done") {
    return (
      <div className={compact ? "rounded-2xl border border-border bg-white p-6 shadow-sm" : `${shell} overflow-hidden`}>
        <div className="p-6 text-center">
          <span className="booking-pulse-ring mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-charge-100">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3 className="mt-5 text-xl font-bold text-forest-900">You&apos;re booked!</h3>
          <p className="mt-1 text-sm text-forest-600">Ticket confirmed · SMS sent</p>
          <p className="mt-4 font-mono text-3xl font-bold tracking-wide text-charge-600">{bookingRef}</p>
          <p className="mt-1 text-xs text-forest-500">Show this reference at boarding</p>

          <div className="mt-6 space-y-2.5 rounded-2xl border border-border bg-gradient-to-br from-muted/50 to-white p-4 text-left text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-forest-600">Route</span>
              <span className="font-medium text-forest-900">
                {from} → {to}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-forest-600">Date & time</span>
              <span className="font-medium text-forest-900">
                {date} at {time}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-forest-600">Seats</span>
              <span className="font-medium text-forest-900">{formatSeats(selectedSeats)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-forest-600">Passenger</span>
              <span className="font-medium text-forest-900">{name}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-border pt-2">
              <span className="text-forest-600">Amount paid</span>
              <span className="font-semibold text-forest-900">KSh {total.toLocaleString()}</span>
            </div>
            {mpesaReceipt && (
              <div className="flex justify-between gap-4">
                <span className="text-forest-600">M-Pesa receipt</span>
                <span className="font-medium text-forest-900">{mpesaReceipt}</span>
              </div>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-forest-600/80">
            Your ticket has been sent by SMS to{" "}
            <span className="font-medium text-forest-900">{formatPhoneDisplay(phone)}</span>.
            Show your booking reference at boarding.
          </p>

          {isDemo && (
            <p className="mt-3 rounded-lg bg-forest-100 px-3 py-2 text-xs text-forest-700">
              Demo payment — no real M-Pesa charge was made.
            </p>
          )}

          <button
            type="button"
            onClick={resetForm}
            className="btn-secondary mt-6 rounded-full px-6 py-2.5 text-sm"
          >
            Book another journey
          </button>
        </div>
      </div>
    );
  }

  if (step === "paying") {
    return (
      <div className={compact ? "rounded-2xl border border-border bg-white p-6 shadow-sm" : `${shell} overflow-hidden`}>
        <div className="p-6 py-8 text-center">
          <span className="relative mx-auto flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-green-400/20" aria-hidden />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-green-700" fill="currentColor" aria-hidden>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8v-2h3V9h2v4h3v2h-3v4h-2z" />
              </svg>
            </span>
          </span>
          <h3 className="mt-5 text-lg font-bold text-forest-900">Check your phone</h3>
          <p className="mt-2 text-sm leading-relaxed text-forest-600">
            {paymentMessage ||
              `M-Pesa STK sent to ${formatPhoneDisplay(phone)}. Enter your PIN to pay.`}
          </p>
          {pendingReference ? (
            <p className="mt-3 font-mono text-sm font-semibold text-charge-600">{pendingReference}</p>
          ) : null}
          <div className="booking-fare-highlight mx-auto mt-5 max-w-xs">
            <p className="text-xs text-forest-500">{from} → {to}</p>
            <p className="font-mono text-xl font-bold text-charge-600">KSh {total.toLocaleString()}</p>
          </div>
          <p className="mt-4 text-xs font-medium text-forest-500 animate-pulse">
            Waiting for payment confirmation…
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleCheckPayment}
              disabled={checkingPayment || payingLoading}
              className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-forest-700 hover:bg-muted disabled:opacity-50"
            >
              {checkingPayment ? "Checking…" : "I've paid — check status"}
            </button>
            <button
              type="button"
              onClick={handleRetryPayment}
              disabled={payingLoading || checkingPayment}
              className="rounded-xl bg-charge-600 px-5 py-3 text-sm font-semibold text-white hover:bg-charge-500 disabled:opacity-50"
            >
              {payingLoading ? "Sending…" : "Retry M-Pesa"}
            </button>
          </div>
          {error ? (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <div className={compact ? "pb-4 pt-4" : "border-b border-border px-6 py-5"}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-eyebrow text-xs font-semibold uppercase tracking-widest text-charge-600">
              Book Now
            </p>
            <h3 className={`font-bold text-forest-900 ${compact ? "mt-0.5 text-sm" : "mt-1 text-lg"}`}>
              {step === "search" && "Choose your journey"}
              {step === "seats" && "Pick your seats"}
              {step === "details" && "Passenger details"}
              {step === "confirm" && "Review & pay"}
            </h3>
            {!compact && (
              <p className="mt-0.5 text-xs text-forest-500">
                Step {stepIndex + 1} of {STEPS.length}
              </p>
            )}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-800">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" aria-hidden />
            Live
          </span>
        </div>

        {stepIndex >= 0 && (
          <div className="mt-4">
            <StepIndicator steps={STEPS} currentIndex={stepIndex} />
          </div>
        )}

        <div className="mt-4">
          <BookingRouteCard
            from={from}
            to={to}
            duration={duration}
            vehicle={vehicle}
            fare={fare}
            compact={compact}
          />
        </div>
      </div>

      <div className={bodyPad}>
        {error && (
          <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span className="flex-1">{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
              className="shrink-0 text-red-500 hover:text-red-700"
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        )}

        {step === "search" && (
          <div className={formGap}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="block sm:col-span-2">
                <span className="text-sm font-medium text-forest-900">Travel date</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {dateQuickPicks.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => setDate(chip.value)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                        date === chip.value
                          ? "bg-charge-600 text-white"
                          : "border border-border bg-muted text-forest-700 hover:border-forest-300"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
                <input
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="field-input mt-2"
                />
              </div>
              <label className="block">
                <span className="text-sm font-medium text-forest-900">Passengers</span>
                <select
                  value={passengers}
                  onChange={(e) => handlePassengersChange(Number(e.target.value))}
                  className="field-input mt-2"
                >
                  {Array.from({ length: MAX_PASSENGERS }, (_, i) => i + MIN_PASSENGERS).map((n) => (
                    <option key={n} value={n}>
                      {n} passenger{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex items-end">
                <div className="booking-fare-highlight w-full">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-forest-500">
                    Total fare
                  </p>
                  <p className="font-mono text-2xl font-bold tabular-nums text-charge-600">
                    KSh {total.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-forest-500">
                    {passengers} passenger{passengers > 1 ? "s" : ""} × KSh {fare.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-forest-900">Departure time</span>
              </div>
              <div className={`mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5 ${compact ? "gap-1.5" : ""}`}>
                {departures.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`booking-time-chip ${compact ? "px-2 py-2 text-xs" : ""} ${
                      time === t ? "booking-time-chip-selected" : ""
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={goToSeats}
              className="btn-primary w-full rounded-xl py-3.5 text-base shadow-md shadow-charge-600/20 disabled:opacity-50"
            >
              Continue to seats →
            </button>

            <div className="booking-mpesa-strip">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-green-700" fill="currentColor" aria-hidden>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8v-2h3V9h2v4h3v2h-3v4h-2z" />
              </svg>
              Pay with M-Pesa · SMS ticket in seconds
            </div>
          </div>
        )}

        {step === "seats" && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-charge-200 bg-charge-50 p-4 text-sm">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-forest-900">
                  Select {passengers} seat{passengers > 1 ? "s" : ""}
                </p>
                <span className="rounded-full bg-charge-600 px-2 py-0.5 text-xs font-bold text-white">
                  {selectedSeats.length}/{passengers}
                </span>
              </div>
              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-charge-600 to-green-500 transition-all duration-300"
                  style={{ width: `${seatProgress * 100}%` }}
                />
              </div>
              {selectedSeats.length > 0 && (
                <p className="mt-2 font-medium text-forest-900">
                  {formatSeats(selectedSeats)}
                </p>
              )}
            </div>

            <SeatMap
              selected={selectedSeats}
              occupied={occupiedSeats}
              maxSelectable={passengers}
              onToggle={toggleSeat}
              compact={compact}
            />

            <div className="flex gap-3">
              <Button variant="secondary" onClick={goToSearch}>
                Back
              </Button>
              <Button
                fullWidth
                onClick={goToDetails}
                className={selectedSeats.length !== passengers ? "opacity-80" : ""}
              >
                Continue
                {selectedSeats.length > 0 && (
                  <span className="font-normal opacity-90">
                    ({selectedSeats.length}/{passengers})
                  </span>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-muted/60 to-white p-4 text-sm">
              <p className="font-semibold text-forest-900">
                {from} → {to} · {vehicle}
              </p>
              <p className="mt-1 text-forest-600">
                {date} · {time} · Seats {formatSeats(selectedSeats)} ·{" "}
                <span className="font-semibold text-charge-600">KSh {total.toLocaleString()}</span>
              </p>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-forest-900">Full name</span>
              <input
                type="text"
                minLength={2}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="As on ID"
                className="field-input mt-2"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-forest-900">Phone (M-Pesa)</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07XX XXX XXX"
                className="field-input mt-2"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-forest-900">National ID or passport</span>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="Required for boarding"
                className="field-input mt-2 uppercase"
              />
            </label>

            <Input
              label="Email"
              optional
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="For receipt"
            />

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => { setError(""); setStep("seats"); }}>
                Back
              </Button>
              <Button fullWidth onClick={goToConfirm}>
                Review & pay
              </Button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-5">
            <div className="space-y-3 rounded-2xl border border-border bg-gradient-to-br from-muted/40 to-white p-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-forest-600">Route</span>
                <span className="text-right font-medium text-forest-900">
                  {from} → {to}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-forest-600">Vehicle</span>
                <span className="font-medium text-forest-900">{vehicle}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-forest-600">Date & time</span>
                <span className="font-medium text-forest-900">
                  {date} at {time}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-forest-600">Seats</span>
                <span className="text-right font-medium text-forest-900">
                  {formatSeats(selectedSeats)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-forest-600">Passenger</span>
                <span className="font-medium text-forest-900">{name}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-forest-600">Phone</span>
                <span className="font-medium text-forest-900">{formatPhoneDisplay(phone)}</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-border pt-3">
                <span className="font-semibold text-forest-900">Total</span>
                <span className="font-mono text-lg font-bold text-charge-600">
                  KSh {total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="booking-mpesa-strip text-left">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-green-700" fill="currentColor" aria-hidden>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8v-2h3V9h2v4h3v2h-3v4h-2z" />
              </svg>
              <p className="leading-relaxed">
                {mpesaTrustCopy(paymentMode)} Payment to{" "}
                {formatPhoneDisplay(phone) || "your phone"}.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setStep("details");
                }}
                className="btn-secondary rounded-xl px-5 py-3 text-sm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handlePayment}
                className="btn-primary flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-base shadow-md shadow-charge-600/20"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8v-2h3V9h2v4h3v2h-3v4h-2z" />
                </svg>
                Pay KSh {total.toLocaleString()}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
