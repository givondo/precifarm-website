import Link from "next/link";
import PulsePlusPlanner from "@/components/charging/PulsePlusPlanner";
import PulsePlusPower from "@/components/charging/PulsePlusPower";
import { Actions, CalloutNote, InPageNav, InteriorHero, InteriorSection, MediaFrame, SpecSheet, StageLabel, StepFlow } from "@/components/interior";
import FaqAccordion from "@/components/seo/FaqAccordion";
import { registerSource, registerSpecGroups } from "@/lib/pages/register";
import { pulsePlusCarClasses, pulsePlusContent as c, pulsePlusRatings as r } from "@/lib/pages/pulse-plus";

/** Three phases into the wallbox, one Type 2 lead to the car, and the car's on-board charger as the limit. */
function PowerPathDiagram() {
  const wave = (y: number, shift: number) => {
    const pts: string[] = [];
    for (let x = 0; x <= 150; x += 5) pts.push(`${20 + x},${(y + Math.sin((x / 150) * Math.PI * 4 + shift) * 9).toFixed(1)}`);
    return `M${pts.join(" L")}`;
  };
  const phases = [
    { y: 48, label: "L1", shift: 0 },
    { y: 88, label: "L2", shift: (2 * Math.PI) / 3 },
    { y: 128, label: "L3", shift: (4 * Math.PI) / 3 },
  ];
  return (
    <figure className="rounded-2xl bg-forest-950 p-4 sm:p-6">
      <svg viewBox="0 0 640 220" role="img" aria-labelledby="pp-path-title" className="h-auto w-full">
        <title id="pp-path-title">{`Three phases and neutral feed the Pulse+ wallbox, which offers up to ${r.maxKw} kW through one Type 2 cable; the car's on-board charger sets how much it takes`}</title>
        {phases.map((p) => (
          <g key={p.label}>
            <text x={0} y={p.y + 4} fontSize="12" fontWeight="700" fill="#7ec09d">
              {p.label}
            </text>
            <path d={wave(p.y, p.shift)} fill="none" stroke="#7ec09d" strokeWidth="2" />
            <line x1={170} y1={p.y} x2={236} y2={p.y} stroke="#7ec09d" strokeWidth="2" />
          </g>
        ))}
        <text x={0} y={172} fontSize="12" fontWeight="700" fill="#9ca3af">
          N
        </text>
        <line x1={20} y1={168} x2={236} y2={168} stroke="#9ca3af" strokeWidth="2" strokeDasharray="6 5" />
        <rect x={236} y={26} width={112} height={160} rx={18} fill="#1f2937" stroke="#4b5563" strokeWidth="2" />
        <rect x={282} y={50} width={20} height={56} rx={5} fill="#374151" />
        <line x1={292} y1={62} x2={292} y2={94} stroke="#7ec09d" strokeWidth="3" strokeLinecap="round" />
        <text x={292} y={140} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">
          Pulse+
        </text>
        <text x={292} y={160} textAnchor="middle" fontSize="12" fill="#d1d5db">
          up to {r.maxKw} kW
        </text>
        <path d="M348 150 C 400 150, 410 110, 452 110" fill="none" stroke="#e5e7eb" strokeWidth="6" strokeLinecap="round" />
        <text x={400} y={176} textAnchor="middle" fontSize="12" fill="#d1d5db">
          Type 2
        </text>
        <rect x={452} y={60} width={176} height={100} rx={14} fill="none" stroke="#e5e7eb" strokeWidth="2" />
        <text x={540} y={52} textAnchor="middle" fontSize="12" fill="#d1d5db">
          Your car
        </text>
        <rect x={468} y={84} width={144} height={52} rx={8} fill="#1f6f4a" />
        <text x={540} y={106} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
          On-board charger
        </text>
        <text x={540} y={124} textAnchor="middle" fontSize="12" fill="#d6ede0">
          sets the limit
        </text>
      </svg>
      <figcaption className="mt-3 text-xs leading-relaxed text-white/60">
        Schematic. Pulse+ supplies AC; the car&apos;s on-board charger turns it into DC for the battery, so its rating caps the session.
      </figcaption>
    </figure>
  );
}

export default function PulsePlusView() {
  return (
    <>
      <InteriorHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        lead={c.hero.lead}
        stage="development"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Charging", href: "/charging" },
          { name: "Pulse+", href: "/charging/pulse-plus" },
        ]}
        actions={[
          { href: "#planner", label: "Plan your site" },
          { href: c.cta.primary.href, label: c.cta.primary.label, variant: "secondary" },
        ]}
        media={{ src: "/images/renders/pulse-plus-22kw-hero-rb.png", alt: c.hero.imageAlt, fit: "contain" }}
        facts={[
          { label: "Three-phase power", value: `Up to ${r.maxKw} kW` },
          { label: "Most three-phase cars", value: `${r.midKw} kW` },
          { label: "Single-phase mode", value: `${r.singlePhaseKw} kW` },
          { label: "Load sharing", value: `${r.maxUnits} units, one meter` },
        ]}
      />
      <InPageNav links={c.inPage} />

      <InteriorSection id="three-phase" eyebrow={c.threePhase.eyebrow} title={c.threePhase.title} lead={c.threePhase.lead}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
          <PowerPathDiagram />
          <dl className="grid gap-5">
            {c.threePhase.points.map((p) => (
              <div key={p.title} className="border-l-2 border-charge-600 pl-4">
                <dt className="text-sm font-semibold text-forest-900">{p.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-forest-600">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-10">
          <PulsePlusPower chargerKw={r.maxKw} classes={pulsePlusCarClasses} note={c.threePhase.exampleNote} />
        </div>
        <p className="mt-4 text-sm text-forest-600">
          Not sure what your car accepts? Its handbook gives the on-board charger rating. The{" "}
          <Link href="/evs" className="font-semibold">
            Kenya EV guide
          </Link>{" "}
          lists battery sizes for the cars sold here.
        </p>
      </InteriorSection>

      <InteriorSection id="load-sharing" tone="silver" eyebrow={c.loadSharing.eyebrow} title={c.loadSharing.title} lead={c.loadSharing.lead}>
        <StepFlow steps={c.loadSharing.steps} />
      </InteriorSection>

      <InteriorSection id="planner" eyebrow={c.planner.eyebrow} title={c.planner.title} lead={c.planner.lead}>
        <PulsePlusPlanner maxUnits={r.maxUnits} classes={pulsePlusCarClasses} disclaimer={c.planner.disclaimer} />
      </InteriorSection>

      <InteriorSection id="workplaces" tone="silver" eyebrow={c.workplaces.eyebrow} title={c.workplaces.title} lead={c.workplaces.lead}>
        <MediaFrame
          src="/images/renders/pulse-plus-22kw-depot-rb.jpg"
          alt={c.workplaces.imageAlt}
          aspect="aspect-[4/3] sm:aspect-[16/9]"
          stage="illustrative"
          sizes="(max-width: 1152px) 100vw, 1152px"
          caption="Design render of a depot wall. Not an installed site."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <dl className="grid gap-6 sm:grid-cols-3">
            {c.workplaces.uses.map((u) => (
              <div key={u.title}>
                <dt className="text-sm font-semibold text-forest-900">{u.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-forest-600">{u.text}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-border sm:p-6">
            <h3 className="text-base font-semibold text-forest-900">{c.workplaces.requirementsTitle}</h3>
            <ul className="mt-3 space-y-2.5">
              {c.workplaces.requirements.map((q) => (
                <li key={q} className="flex gap-3 text-sm leading-relaxed text-forest-700">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-charge-600" />
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </InteriorSection>

      <InteriorSection id="status" tone="graphite" eyebrow={c.status.eyebrow} title={c.status.title} lead={c.status.lead}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-12">
          <div className="grid content-start gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <StageLabel kind="development" tone="dark" />
              <span className="text-sm text-white/65">Pulse charger, the single-phase model, is available today.</span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">{c.safety.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/72">{c.safety.text}</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Not published yet</h3>
              <ul className="mt-2 space-y-2">
                {c.status.notYet.map((n) => (
                  <li key={n} className="flex gap-3 text-sm leading-relaxed text-white/72">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            <CalloutNote tone="dark" title="Register your site">
              {c.status.register}
            </CalloutNote>
            <Actions
              tone="dark"
              actions={[
                { href: c.cta.primary.href, label: c.cta.primary.label },
                { href: c.cta.secondary.href, label: c.cta.secondary.label, variant: "link" },
              ]}
            />
          </div>
          <SpecSheet groups={registerSpecGroups("pulsePlus", "Pulse+ charger")} tone="dark" source={registerSource("pulsePlus")} />
        </div>
      </InteriorSection>

      <InteriorSection id="questions" width="narrow" eyebrow="Questions" title="Pulse+ questions">
        <FaqAccordion items={[...c.faqs]} />
        <p className="mt-6 text-sm text-forest-600">
          Charging at home on one phase?{" "}
          <Link href="/charging/home" className="font-semibold">
            See the Pulse charger
          </Link>
          .
        </p>
      </InteriorSection>
    </>
  );
}
