"use client";

import { useState, type ReactNode } from "react";
import Input from "@/components/ui/Input";
import { getAnonymousId } from "@/lib/analytics";
import { contact } from "@/lib/contact";
import { homeSurveyForm, privateHouseChargingPage } from "@/lib/home-charging";

const HOME_INTEREST = "Home charger installation (Pulse charger or Pod energy storage)";

type ProductId = (typeof homeSurveyForm.products)[number]["id"];

function FieldSelect({
  label,
  name,
  required,
  optional,
  placeholder,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-forest-900">
        {label}
        {optional ? <span className="ml-1 font-normal text-forest-500">(optional)</span> : null}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="field-input mt-2"
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {children}
      </select>
    </label>
  );
}

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
    `Product interest: ${homeSurveyForm.products.find((p) => p.id === input.product)?.label ?? input.product}`,
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
      <div className="card flex flex-col items-center justify-center p-10 text-center">
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
        <h2 className="mt-5 text-xl font-semibold text-forest-900">{homeSurveyForm.successTitle}</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-forest-600">
          {homeSurveyForm.successText}
          {reference ? (
            <>
              {" "}
              Reference <span className="font-mono font-medium text-forest-800">{reference}</span>.
            </>
          ) : null}
        </p>
      </div>
    );
  }

  return (
    <form className="card p-6 sm:p-8" onSubmit={handleSubmit}>
      <h2 className="heading-display text-xl text-forest-900 sm:text-2xl">{homeSurveyForm.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-forest-600">{homeSurveyForm.description}</p>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
      ) : null}

      <fieldset className="mt-8">
        <legend className="text-xs font-semibold uppercase tracking-widest text-forest-500">Your details</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Input label="Name" name="name" required placeholder="Your name" autoComplete="name" />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            required
            placeholder="07XX XXX XXX"
            autoComplete="tel"
            hint="We will call this number. Use your M-Pesa number if you want Lipa Pole Pole."
          />
        </div>
        <div className="mt-5">
          <Input
            label="Email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="text-xs font-semibold uppercase tracking-widest text-forest-500">Your home</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <FieldSelect label="City or area" name="city" required placeholder="Choose city or area">
            {privateHouseChargingPage.serviceAreas.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </FieldSelect>
          <FieldSelect label="Property type" name="propertyType" optional placeholder="Choose property type">
            {homeSurveyForm.propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </FieldSelect>
          <FieldSelect label="Parking" name="parking" optional placeholder="Choose parking">
            {homeSurveyForm.parkingTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </FieldSelect>
          <Input label="Vehicle" name="vehicle" optional placeholder="Make and model" />
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="text-xs font-semibold uppercase tracking-widest text-forest-500">What you want</legend>
        <div className="mt-4">
          <FieldSelect label="Product" name="product" required placeholder="Choose a product">
            {homeSurveyForm.products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.label}
              </option>
            ))}
          </FieldSelect>
        </div>

        <label className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
          <input type="checkbox" name="lipaPolePole" className="mt-1" />
          <span className="text-sm leading-relaxed text-forest-700">{homeSurveyForm.lipaLabel}</span>
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-medium text-forest-900">
            Anything else we should know?
            <span className="ml-1 font-normal text-forest-500">(optional)</span>
          </span>
          <textarea
            name="details"
            rows={3}
            className="field-input mt-2 resize-y"
            placeholder="Meter location, solar, or a preferred survey date"
          />
        </label>
      </fieldset>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? "Sending…" : "Request survey"}
        </button>
        <a href={contact.phoneHref} className="btn-secondary">
          Call {contact.phone}
        </a>
      </div>
    </form>
  );
}
