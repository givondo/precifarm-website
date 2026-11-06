"use client";

import Link from "next/link";
import { useId, useRef, useState, type ReactNode } from "react";
import HoneypotField from "@/components/forms/HoneypotField";
import { getAnonymousId } from "@/lib/analytics";
import { contact } from "@/lib/contact";
import { contactInterests } from "@/lib/contact-interests";
import { contactGroups, contactLimits, groupForInterest, validateContact, type ContactErrors, type ContactFields } from "@/lib/pages/contact";

type ContactFormProps = {
  defaultInterest?: string;
};

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "error"; message: string } | { kind: "sent"; reference: string | null; interest: string };

const fieldOrder: (keyof ContactFields)[] = ["name", "email", "phone", "message"];

const inputBase =
  "mt-2 block w-full rounded-xl border bg-white px-4 text-[15px] text-forest-950 placeholder:text-forest-400 transition-colors focus:outline-none focus:ring-2 disabled:opacity-60";
const okBorder = "border-forest-200 focus:border-charge-600 focus:ring-charge-600/20";
const badBorder = "border-red-600 focus:border-red-600 focus:ring-red-600/20";

export default function ContactForm({ defaultInterest }: ContactFormProps) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [fields, setFields] = useState<ContactFields>({ name: "", email: "", phone: "", message: "" });
  const [interest, setInterest] = useState<string>(defaultInterest ?? contactInterests.survey);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFields, boolean>>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const errors: ContactErrors = validateContact(fields);
  const visible = (k: keyof ContactFields) => (touched[k] || showSummary ? errors[k] : undefined);
  const sending = status.kind === "sending";
  const group = groupForInterest(interest);
  const id = (k: string) => `${uid}-${k}`;

  const set = (k: keyof ContactFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFields((f) => ({ ...f, [k]: e.target.value }));
  const blur = (k: keyof ContactFields) => () => setTouched((t) => ({ ...t, [k]: true }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const invalid = fieldOrder.filter((k) => errors[k]);
    if (invalid.length) {
      setShowSummary(true);
      setStatus({ kind: "idle" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus({ kind: "sending" });

    const data = new FormData(e.currentTarget);
    const payload = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim() || undefined,
      interest,
      message: fields.message.trim(),
      channel: "web",
      anonymousId: getAnonymousId(),
      website: String(data.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; installOrder?: { reference?: string } | null };
      if (!res.ok) {
        setStatus({ kind: "error", message: typeof json.error === "string" ? json.error : "We could not send your message." });
        return;
      }
      setStatus({ kind: "sent", reference: json.installOrder?.reference ?? null, interest });
    } catch {
      setStatus({ kind: "error", message: "Network error. Check your connection and try again, or reach us directly." });
    }
  }

  function reset() {
    setFields({ name: "", email: "", phone: "", message: "" });
    setTouched({});
    setShowSummary(false);
    setStatus({ kind: "idle" });
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="rounded-[1.75rem] bg-white p-6 ring-1 ring-border sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-charge-600 text-white">
          <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-forest-950">Message sent</h2>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-forest-600">
          Thank you. We reply within one business day, to the email address you gave.
        </p>
        <dl className="mt-6 divide-y divide-border rounded-2xl bg-[#f6f7f8] px-4 text-sm ring-1 ring-border">
          <div className="grid gap-1 py-3 sm:grid-cols-[9rem_minmax(0,1fr)]">
            <dt className="text-forest-500">Topic</dt>
            <dd className="font-medium text-forest-900">{status.interest}</dd>
          </div>
          {status.reference ? (
            <div className="grid gap-1 py-3 sm:grid-cols-[9rem_minmax(0,1fr)]">
              <dt className="text-forest-500">Survey reference</dt>
              <dd className="font-mono font-medium text-forest-900">{status.reference}</dd>
            </div>
          ) : null}
        </dl>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex min-h-11 items-center rounded-full border border-forest-200 px-5 text-sm font-semibold text-forest-900 hover:border-forest-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  const summaryItems = fieldOrder.filter((k) => errors[k]);

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} aria-busy={sending} aria-labelledby={id("title")} className="relative rounded-[1.75rem] bg-white p-5 ring-1 ring-border sm:p-8">
      <HoneypotField />
      <h2 id={id("title")} className="font-display text-xl font-semibold tracking-tight text-forest-950 sm:text-2xl">
        Send us a message
      </h2>
      <p className="mt-2 text-sm text-forest-600">
        Fields marked <span aria-hidden>*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {showSummary && summaryItems.length ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 focus:outline-none focus:ring-2 focus:ring-red-600/30">
          <p className="font-semibold">Check {summaryItems.length === 1 ? "this field" : `these ${summaryItems.length} fields`}:</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-5">
            {summaryItems.map((k) => (
              <li key={k}>
                <a href={`#${id(k)}`} className="underline underline-offset-2">
                  {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {status.kind === "error" ? (
        <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          <p className="font-semibold">{status.message}</p>
          <p className="mt-1">
            Your message is still here. You can also email{" "}
            <a href={`mailto:${contact.email}`} className="font-semibold underline underline-offset-2">
              {contact.email}
            </a>{" "}
            or call{" "}
            <a href={contact.phoneHref} className="font-semibold underline underline-offset-2">
              {contact.phone}
            </a>
            .
          </p>
        </div>
      ) : null}

      <div className="mt-6">
        <label htmlFor={id("interest")} className="text-sm font-semibold text-forest-950">
          What is it about? <span aria-hidden className="text-red-700">*</span>
        </label>
        <div className="relative">
          <select
            id={id("interest")}
            name="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            disabled={sending}
            aria-describedby={id("interest-next")}
            className={`${inputBase} ${okBorder} h-12 appearance-none pr-10`}
          >
            {contactGroups.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.keys.map((k) => (
                  <option key={k} value={contactInterests[k]}>
                    {contactInterests[k]}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute right-3.5 top-[calc(50%+4px)] h-4 w-4 -translate-y-1/2 text-forest-500">
            <path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </div>
        {group ? (
          <p id={id("interest-next")} className="mt-2 text-xs leading-relaxed text-forest-600">
            <span className="font-semibold text-forest-800">What happens next: </span>
            {group.next}
          </p>
        ) : null}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Field id={id("name")} label="Your name" required error={visible("name")}>
          <input
            id={id("name")}
            type="text"
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={set("name")}
            onBlur={blur("name")}
            disabled={sending}
            aria-required="true"
            aria-invalid={!!visible("name")}
            aria-describedby={visible("name") ? id("name-error") : undefined}
            className={`${inputBase} h-12 ${visible("name") ? badBorder : okBorder}`}
          />
        </Field>
        <Field id={id("email")} label="Email" required error={visible("email")}>
          <input
            id={id("email")}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            value={fields.email}
            onChange={set("email")}
            onBlur={blur("email")}
            disabled={sending}
            aria-required="true"
            aria-invalid={!!visible("email")}
            aria-describedby={visible("email") ? id("email-error") : undefined}
            placeholder="you@company.com"
            className={`${inputBase} h-12 ${visible("email") ? badBorder : okBorder}`}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field id={id("phone")} label="Phone" hint="Optional. Useful for a site visit." error={visible("phone")}>
          <input
            id={id("phone")}
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={set("phone")}
            onBlur={blur("phone")}
            disabled={sending}
            aria-invalid={!!visible("phone")}
            aria-describedby={`${id("phone-hint")}${visible("phone") ? ` ${id("phone-error")}` : ""}`}
            placeholder="0712 345 678"
            className={`${inputBase} h-12 ${visible("phone") ? badBorder : okBorder}`}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field id={id("message")} label="Message" required hint="Your vehicle, the site or building, and roughly when you need charging." error={visible("message")}>
          <textarea
            id={id("message")}
            name="message"
            rows={6}
            value={fields.message}
            onChange={set("message")}
            onBlur={blur("message")}
            disabled={sending}
            maxLength={contactLimits.messageMax + 200}
            aria-required="true"
            aria-invalid={!!visible("message")}
            aria-describedby={`${id("message-hint")} ${id("message-count")}${visible("message") ? ` ${id("message-error")}` : ""}`}
            className={`${inputBase} resize-y py-3 leading-relaxed ${visible("message") ? badBorder : okBorder}`}
          />
        </Field>
        <p id={id("message-count")} className={`mt-1.5 text-right font-mono text-[11px] ${fields.message.length > contactLimits.messageMax ? "text-red-700" : "text-forest-500"}`}>
          {fields.message.length} / {contactLimits.messageMax}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-forest-500 sm:max-w-xs">
          We use your details only to reply. See the{" "}
          <Link href="/legal/privacy" className="font-medium text-forest-700 underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-charge-600 px-7 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-charge-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600 disabled:cursor-wait disabled:opacity-80 sm:w-auto"
        >
          {sending ? (
            <>
              <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none" />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </button>
      </div>
    </form>
  );
}

function Field({ id, label, required, hint, error, children }: { id: string; label: string; required?: boolean; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-forest-950">
        {label} {required ? <span aria-hidden className="text-red-700">*</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-forest-500">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-red-700">
          <span aria-hidden className="mt-0.5 font-bold">!</span>
          {error}
        </p>
      ) : null}
    </div>
  );
}
