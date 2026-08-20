import Link from "next/link";
import CheckItem from "@/components/ui/CheckItem";
import SectionHeader from "@/components/ui/SectionHeader";
import { problemSolution } from "@/lib/brand-messaging";

const whyUs = [
  { stat: "KES 140", title: "Home charging day", text: "Typical ~60 km in Nairobi vs ~KES 1,000 diesel per day." },
  { stat: "1 day", title: "Home installation", text: "Certified Pulse charger installation including paperwork." },
  { stat: "3 years", title: "Aftersale care", text: "On every home unit we commission." },
  { stat: "M-Pesa", title: "Pay on any phone", text: "Lipa Pole Pole and session pay. No bank account." },
];

type ValuePropositionProps = {
  compact?: boolean;
};

export default function ValueProposition({ compact = false }: ValuePropositionProps) {
  return (
    <section
      id="why-precifarm"
      className={`scroll-mt-20 border-b border-border bg-muted/20 ${compact ? "home-section" : "section-pad"}`}
    >
      <div className="page-container">
        <SectionHeader
          eyebrow={problemSolution.eyebrow}
          title={problemSolution.title}
          centered
          className="mx-auto max-w-3xl"
        />

        <div className="home-section-grid grid gap-5 lg:grid-cols-2">
          <div className="card p-6">
            <p className="text-eyebrow text-xs font-semibold uppercase tracking-widest text-forest-500">
              The problem
            </p>
            <h3 className="mt-2 text-lg font-semibold text-forest-900">{problemSolution.problemTitle}</h3>
            <ul className="mt-4 space-y-2.5">
              {problemSolution.problemPoints.map((pt) => (
                <CheckItem key={pt}>{pt}</CheckItem>
              ))}
            </ul>
          </div>

          <div className="card border-charge-200/60 bg-charge-50/40 p-6">
            <p className="text-eyebrow text-xs font-semibold uppercase tracking-widest text-charge-700">
              Our answer
            </p>
            <h3 className="mt-2 text-lg font-semibold text-forest-900">{problemSolution.answerTitle}</h3>
            <ul className="mt-4 space-y-2.5">
              {problemSolution.answerPoints.map((pt) => (
                <CheckItem key={pt}>{pt}</CheckItem>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-white p-4">
              <p className="font-mono text-sm font-semibold text-charge-700">{item.stat}</p>
              <h3 className="mt-1.5 font-semibold text-forest-900">{item.title}</h3>
              <p className="mt-1 text-sm text-forest-600/80">{item.text}</p>
            </div>
          ))}
        </div>

        {!compact ? (
          <p className="mt-8 text-center text-sm text-forest-600">
            <Link href="/charging" className="text-link font-semibold">
              Charging services
            </Link>
            <span className="mx-2 text-forest-300">·</span>
            <Link href="/partners" className="text-link font-semibold">
              Fleet systems
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
