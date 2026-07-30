"use client";

import { useState } from "react";
import { getAnonymousId } from "@/lib/analytics";

const interests = [
  "Book Nairobi–Kisumu travel",
  "Operate coaches on a route",
  "Host a charging hub site",
  "Fleet or logistics charging",
  "Finance or OEM partnership",
  "General enquiry",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim() || undefined,
      interest: String(data.get("interest") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      channel: "web",
      anonymousId: getAnonymousId(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(typeof json.error === "string" ? json.error : "Could not send message.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="card flex flex-col items-center justify-center p-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-100">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 text-forest-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-5 text-xl font-semibold text-forest-900">Message sent</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-forest-600/80">
          Thank you for getting in touch. We will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form className="card p-6" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold text-forest-900">Send us a message</h2>
      <p className="mt-2 text-sm leading-relaxed text-forest-600/80">
        Tell us whether you want to travel, partner or host a site and we will
        direct your enquiry to the right team.
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
            className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-forest-500"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-forest-900">Email</span>
          <input
            type="email"
            name="email"
            required
            className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-forest-500"
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label className="mt-6 block">
        <span className="text-sm font-medium text-forest-900">Phone</span>
        <input
          type="tel"
          name="phone"
          className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-forest-500"
          placeholder="07XX XXX XXX"
        />
      </label>

      <label className="mt-6 block">
        <span className="text-sm font-medium text-forest-900">I am enquiring about</span>
        <select
          name="interest"
          className="mt-2 w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-forest-500"
        >
          {interests.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </label>

      <label className="mt-6 block">
        <span className="text-sm font-medium text-forest-900">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-y rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:border-forest-500"
          placeholder="Tell us about your route, site, fleet or travel plans…"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary mt-8 w-full sm:w-auto"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
