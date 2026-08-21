"use client";

import { useState } from "react";
import { getAnonymousId } from "@/lib/analytics";
import { contact } from "@/lib/contact";
import { privateHouseChargingPage } from "@/lib/home-charging";

const HOME_INTEREST = "Home charger installation (Pulse charger or Pod energy storage)";

const products = [
  { id: "pulse", label: "Pulse charger (7 kW wallbox)" },
  { id: "pod", label: "Pod energy storage (+ optional solar)" },
  { id: "spark", label: "Spark portable charger" },
] as const;

type ProductId = (typeof products)[number]["id"];

function buildSurveyMessage(input: {
  city: string;
  product: ProductId;
  propertyType: string;
  vehicle: string;
  parking: string;
  lipaPolePole: boolean;
  details: string;
}): string {
  const lines = [
    `City: ${input.city}`,
    `Product interest: ${products.find((p) => p.id === input.product)?.label ?? input.product}`,
    input.propertyType ? `Property type: ${input.propertyType}` : null,
    input.vehicle ? `Vehicle: ${input.vehicle}` : null,
    input.parking ? `Parking: ${input.parking}` : null,
    input.lipaPolePole ? "Lipa Pole Pole: yes" : null,
    input.details ? `Additional notes: ${input.details}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

export default function HomeSurveyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const city = String(data.get("city") ?? "").trim();
    const product = String(data.get("product") ?? "pulse").trim() as ProductId;
    const propertyType = String(data.get("propertyType") ?? "").trim();
    const vehicle = String(data.get("vehicle") ?? "").trim();
    const parking = String(data.get("parking") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();
    const lipaPolePole = data.get("lipaPolePole") === "on";

    const message = buildSurveyMessage({
      city,
      product,
      propertyType,
      vehicle,
      parking,
      lipaPolePole,
      details,
    });

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      interest: HOME_INTEREST,
      message,
      channel: "web-private-house",
      anonymousId: getAnonymousId(),
    };

    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        error?: string;
        installOrder?: { reference?: string } | null;
      };
      if (!res.ok) {
        setError(typeof json.error === "string" ? json.error : "Could not submit survey.");
        return;
      }
      setReference(json.installOrder?.reference ?? null);
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        id="survey"
        className="card flex flex-col items-center justify-center p-10 text-center scroll-mt-24"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-charge-100">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 text-charge-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-5 text-xl font-semibold text-forest-900">Survey request received</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-forest-600/80">
          Our installation team will call within one business day to schedule a site visit.
          {reference ? (
            <>
              {" "}
              Reference{" "}
              <span className="font-mono font-medium text-forest-800">{reference}</span>.
            </>
          ) : null}
        </p>
      </div>
    );
  }

  return (
    <form id="survey" className="card scroll-mt-24 p-6 sm:p-8" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold text-forest-900">Request a home charging survey</h2>
      <p className="mt-2 text-sm leading-relaxed text-forest-600/80">
        Tell us about your house and vehicle. We survey the site, quote installation, and can
        start Lipa Pole Pole on M-Pesa after you approve.
      </p>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-forest-900">Name</span>
          <input
            type="text"
            name="name"
            required
            className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-charge-500"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-forest-900">Phone (M-Pesa)</span>
          <input
            type="tel"
            name="phone"
            required
            className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-charge-500"
            placeholder="07XX XXX XXX"
          />
        </label>
      </div>

      <label className="mt-6 block">
        <span className="text-sm font-medium text-forest-900">Email</span>
        <input
          type="email"
          name="email"
          required
          className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-charge-500"
          placeholder="you@email.com"
        />
      </label>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-forest-900">City / area</span>
          <select
            name="city"
            required
            className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-charge-500"
          >
            {privateHouseChargingPage.serviceAreas.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-forest-900">Product interest</span>
          <select
            name="product"
            className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-charge-500"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-forest-900">Property type</span>
          <input
            type="text"
            name="propertyType"
            className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-charge-500"
            placeholder="Detached house, townhouse, gated community…"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-forest-900">Vehicle</span>
          <input
            type="text"
            name="vehicle"
            className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-charge-500"
            placeholder="Make and model"
          />
        </label>
      </div>

      <label className="mt-6 block">
        <span className="text-sm font-medium text-forest-900">Private parking</span>
        <input
          type="text"
          name="parking"
          className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-charge-500"
          placeholder="Driveway, car port, dedicated bay…"
        />
      </label>

      <label className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
        <input type="checkbox" name="lipaPolePole" className="mt-1" />
        <span className="text-sm text-forest-700">
          I am interested in <strong>Lipa Pole Pole</strong> instalments on M-Pesa
        </span>
      </label>

      <label className="mt-6 block">
        <span className="text-sm font-medium text-forest-900">Anything else we should know?</span>
        <textarea
          name="details"
          rows={3}
          className="mt-2 w-full resize-y rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-charge-500"
          placeholder="Meter location, solar interest, preferred survey date…"
        />
      </label>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? "Submitting…" : "Request survey"}
        </button>
        <p className="text-xs text-forest-500">
          Or call{" "}
          <a href={contact.phoneHref} className="text-link">
            {contact.phone}
          </a>
        </p>
      </div>
    </form>
  );
}
