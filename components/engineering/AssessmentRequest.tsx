"use client";

import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import { contactInterests } from "@/lib/contact-interests";
import { assessmentTypes } from "@/lib/engineering-page";

/**
 * Assessment request: pick the site type, see what to prepare, then send the site's details through the
 * standard contact form (same API, honeypot and rate limit as /contact), preselected to the matching enquiry.
 */
export default function AssessmentRequest() {
  const [type, setType] = useState(assessmentTypes[0].id);
  const t = assessmentTypes.find((x) => x.id === type)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
      <div>
        <fieldset>
          <legend className="text-sm font-semibold text-forest-900">Site type</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {assessmentTypes.map((x) => (
              <label
                key={x.id}
                className={`flex min-h-12 cursor-pointer items-center gap-2.5 rounded-xl px-3.5 text-sm font-medium ring-1 transition-colors ${
                  x.id === type ? "bg-forest-950 text-white ring-forest-950" : "bg-white text-forest-800 ring-border hover:ring-forest-300"
                }`}
              >
                <input type="radio" name="assessment-type" value={x.id} checked={x.id === type} onChange={() => setType(x.id)} className="accent-brand-400" />
                {x.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-border">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Have these ready</p>
          <ul className="mt-3 space-y-2">
            {t.prepare.map((p) => (
              <li key={p} className="flex gap-2.5 text-sm text-forest-700">
                <svg aria-hidden viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-charge-600" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-border pt-3 text-[13px] leading-relaxed text-forest-600">
            The assessment tells you whether the site works and what it needs. A written quote follows a survey.
          </p>
        </div>
      </div>

      <div className="min-w-0">
        <ContactForm key={t.id} defaultInterest={contactInterests[t.interest]} />
      </div>
    </div>
  );
}
