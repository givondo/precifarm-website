import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import type { TrackTierLevel, TrainingTierId } from "@/lib/training";
import {
  evChargingTracks,
  trainingDeliveryDetails,
  trainingProgression,
  trainingTierComparison,
  trainingTiers,
  trainingTrackMatrix,
} from "@/lib/training";

const tierAccent: Record<TrainingTierId, string> = {
  t1: "training-tier-t1",
  t2: "training-tier-t2",
  t3: "training-tier-t3",
};

const tierCodeToId: Record<string, TrainingTierId> = {
  T1: "t1",
  T2: "t2",
  T3: "t3",
};

const tierHeaderClass: Record<TrainingTierId, string> = {
  t1: "training-th-t1",
  t2: "training-th-t2",
  t3: "training-th-t3",
};

function TrainingTable({
  caption,
  hint,
  children,
  minWidth = "640px",
}: {
  caption: string;
  hint?: string;
  children: ReactNode;
  minWidth?: string;
}) {
  return (
    <div className="training-table-shell">
      {hint && <p className="training-table-hint">{hint}</p>}
      <div className="training-table-wrap">
        <div className="training-table-scroll">
          <table className="training-table w-full text-left text-sm" style={{ minWidth }}>
            <caption className="training-table-caption">
              <span className="training-table-caption-label">{caption}</span>
            </caption>
            {children}
          </table>
        </div>
      </div>
    </div>
  );
}

function TierBadge({
  id,
  code,
  title,
  linked = false,
}: {
  id: TrainingTierId;
  code: string;
  title?: string;
  linked?: boolean;
}) {
  const badge = (
    <span className={`training-tier-inline-badge ${tierAccent[id]}`}>{code}</span>
  );

  return (
    <div className="training-tier-cell-label">
      {linked ? (
        <Link href={`#${id}`} className="training-tier-link-block">
          {badge}
        </Link>
      ) : (
        badge
      )}
      {title && <span className="training-tier-cell-title">{title}</span>}
    </div>
  );
}

function TierHeader({ id, code, subtitle }: { id: TrainingTierId; code: string; subtitle: string }) {
  return (
    <div className="training-tier-header-cell">
      <Link href={`#${id}`} className={`training-tier-col-head ${tierAccent[id]}`}>
        {code}
      </Link>
      <span className="training-tier-col-sub">{subtitle}</span>
    </div>
  );
}

function TierCell({ value }: { value: TrackTierLevel }) {
  if (value === "—") {
    return (
      <span className="training-matrix-empty" title="Not required for this track">
        —
      </span>
    );
  }

  const tone =
    value === "Required" ? "training-matrix-required" : "training-matrix-recommended";

  return <span className={`training-matrix-badge ${tone}`}>{value}</span>;
}

function ModuleList({ items, numbered = false }: { items: string[]; numbered?: boolean }) {
  const Tag = numbered ? "ol" : "ul";
  return (
    <Tag className={`training-module-list ${numbered ? "training-module-list-numbered" : ""}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </Tag>
  );
}

function GroupRow({ label, colSpan }: { label: string; colSpan: number }) {
  return (
    <tr className="training-table-group-row">
      <th scope="colgroup" colSpan={colSpan}>
        {label}
      </th>
    </tr>
  );
}

const tierDetailSections = [
  {
    label: "Basics",
    rows: [
      { label: "Full title", key: "title" as const },
      { label: "Level", key: "subtitle" as const },
      { label: "Duration", key: "duration" as const },
      { label: "Format", key: "format" as const },
      { label: "Typical roles", key: "audience" as const },
    ],
  },
  {
    label: "Assessment & certificate",
    rows: [
      { label: "Assessment", key: "assessment" as const },
      { label: "Certificate awarded", key: "certificate" as const },
    ],
  },
  {
    label: "Scope after passing",
    rows: [{ label: "You can", key: "canDoAfter" as const }],
  },
];

export function TrainingTierOverviewTable() {
  return (
    <TrainingTable
      caption="Quick comparison — click a tier to jump to its modules"
      hint="Scroll right on smaller screens to read all columns."
      minWidth="880px"
    >
      <thead>
        <tr>
          <th scope="col" className="training-table-sticky-col">
            Tier
          </th>
          <th scope="col">Level</th>
          <th scope="col">Duration</th>
          <th scope="col">Format</th>
          <th scope="col">Who should attend</th>
          <th scope="col">Certificate</th>
        </tr>
      </thead>
      <tbody>
        {trainingTierComparison.map((row, index) => {
          const tierId = trainingTiers[index].id;
          return (
            <tr key={row.tier}>
              <th scope="row" className="training-table-sticky-col">
                <TierBadge
                  id={tierId}
                  code={row.tier}
                  title={trainingTiers[index].title}
                  linked
                />
              </th>
              <td>
                <span className="training-cell-tag">{row.level}</span>
              </td>
              <td className="training-cell-emphasis">{row.duration}</td>
              <td>{row.format}</td>
              <td>{row.audience}</td>
              <td className="training-cell-muted">{row.certificate}</td>
            </tr>
          );
        })}
      </tbody>
    </TrainingTable>
  );
}

export function TrainingTierDetailTable() {
  const colCount = trainingTiers.length + 1;

  return (
    <TrainingTable
      caption="Full specification — read across a row to compare the same detail for each tier"
      hint="Rows are grouped by topic. Tier columns are colour-coded: T1 entry, T2 intermediate, T3 advanced."
      minWidth="960px"
    >
      <thead>
        <tr>
          <th scope="col" className="training-table-sticky-col training-table-corner">
            Detail
          </th>
          {trainingTiers.map((tier) => (
            <th
              key={tier.id}
              scope="col"
              className={`training-table-tier-col ${tierHeaderClass[tier.id]}`}
            >
              <TierHeader id={tier.id} code={tier.code} subtitle={tier.subtitle} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tierDetailSections.map((section) => (
          <Fragment key={section.label}>
            <GroupRow label={section.label} colSpan={colCount} />
            {section.rows.map((row) => (
              <tr key={row.key}>
                <th scope="row" className="training-table-sticky-col">
                  {row.label}
                </th>
                {trainingTiers.map((tier) => (
                  <td key={tier.id} className={row.key === "canDoAfter" ? "training-cell-highlight" : ""}>
                    {tier[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </TrainingTable>
  );
}

export function TrainingCurriculumTable() {
  return (
    <TrainingTable
      caption="Modules taught and skills assessed — everything covered in each tier"
      minWidth="800px"
    >
      <thead>
        <tr>
          <th scope="col" className="training-table-sticky-col">
            Tier
          </th>
          <th scope="col">Modules covered</th>
          <th scope="col">Assessed outcomes</th>
        </tr>
      </thead>
      <tbody>
        {trainingTiers.map((tier) => (
          <tr key={tier.id} id={tier.id}>
            <th scope="row" className="training-table-sticky-col">
              <TierBadge id={tier.id} code={tier.code} title={tier.title} />
              <span className="training-tier-cell-meta">{tier.duration}</span>
            </th>
            <td>
              <p className="training-cell-section-label">Modules</p>
              <ModuleList items={tier.modules} numbered />
            </td>
            <td>
              <p className="training-cell-section-label">Outcomes</p>
              <ModuleList items={tier.outcomes} numbered />
            </td>
          </tr>
        ))}
      </tbody>
    </TrainingTable>
  );
}

export function TrainingTrackMatrixTable() {
  return (
    <>
      <div className="training-table-legend">
        <span className="training-legend-item">
          <span className="training-matrix-badge training-matrix-required">Required</span>
          Must hold this tier for the track
        </span>
        <span className="training-legend-item">
          <span className="training-matrix-badge training-matrix-recommended">Recommended</span>
          Needed for lead / commissioning roles
        </span>
        <span className="training-legend-item">
          <span className="training-matrix-empty">—</span>
          Not required for this track
        </span>
      </div>
      <TrainingTable
        caption="Tier required per EV charging product — use when planning a cohort"
        hint="Read each row left to right: track name, then T1, T2, T3 requirement."
        minWidth="760px"
      >
        <thead>
          <tr>
            <th scope="col" className="training-table-sticky-col">
              EV charging track
            </th>
            <th scope="col" className={`training-table-tier-col ${tierHeaderClass.t1}`}>
              T1
            </th>
            <th scope="col" className={`training-table-tier-col ${tierHeaderClass.t2}`}>
              T2
            </th>
            <th scope="col" className={`training-table-tier-col ${tierHeaderClass.t3}`}>
              T3
            </th>
            <th scope="col">Guidance</th>
          </tr>
        </thead>
        <tbody>
          {trainingTrackMatrix.map((row) => (
            <tr key={row.track}>
              <th scope="row" className="training-table-sticky-col">
                {row.track}
              </th>
              <td className="training-table-tier-col">
                <TierCell value={row.t1} />
              </td>
              <td className="training-table-tier-col">
                <TierCell value={row.t2} />
              </td>
              <td className="training-table-tier-col">
                <TierCell value={row.t3} />
              </td>
              <td className="training-cell-muted">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </TrainingTable>
    </>
  );
}

export function TrainingTracksDetailTable() {
  return (
    <TrainingTable
      caption="What each EV charging track covers — roles and topics"
      minWidth="920px"
    >
      <thead>
        <tr>
          <th scope="col" className="training-table-sticky-col">
            Track
          </th>
          <th scope="col">Summary</th>
          <th scope="col">Tiers needed</th>
          <th scope="col">Typical roles</th>
          <th scope="col">Key topics</th>
        </tr>
      </thead>
      <tbody>
        {evChargingTracks.map((track) => (
          <tr key={track.id}>
            <th scope="row" className="training-table-sticky-col">
              {track.title}
            </th>
            <td className="training-cell-muted">{track.description}</td>
            <td>
              <div className="flex flex-wrap gap-1.5">
                {track.tiers.map((tierId) => {
                  const tier = trainingTiers.find((t) => t.id === tierId);
                  return (
                    <a
                      key={tierId}
                      href={`#${tierId}`}
                      className={`training-tier-pill ${tierAccent[tierId]}`}
                    >
                      {tier?.code ?? tierId.toUpperCase()}
                    </a>
                  );
                })}
              </div>
            </td>
            <td>{track.roles}</td>
            <td>
              <ModuleList items={track.topics} />
            </td>
          </tr>
        ))}
      </tbody>
    </TrainingTable>
  );
}

export function TrainingProgressionTable() {
  return (
    <TrainingTable caption="Step-by-step path between tiers" minWidth="620px">
      <thead>
        <tr>
          <th scope="col">Step</th>
          <th scope="col">Starting point</th>
          <th scope="col">Next tier</th>
          <th scope="col">What you need to enrol</th>
        </tr>
      </thead>
      <tbody>
        {trainingProgression.map((row, index) => (
          <tr key={`${row.from}-${row.to}`}>
            <td className="training-step-num">{index + 1}</td>
            <th scope="row">{row.from}</th>
            <td>
              <span className={`training-tier-inline-badge ${tierAccent[tierCodeToId[row.to]]}`}>
                {row.to}
              </span>
            </td>
            <td className="training-cell-muted">{row.requirement}</td>
          </tr>
        ))}
      </tbody>
    </TrainingTable>
  );
}

export function TrainingDeliveryTable() {
  return (
    <TrainingTable caption="Logistics — venue, language, cohort size and certificates" minWidth="540px">
      <tbody>
        {trainingDeliveryDetails.map((row) => (
          <tr key={row.item}>
            <th scope="row" className="training-table-sticky-col training-delivery-label">
              {row.item}
            </th>
            <td className="training-cell-muted">{row.detail}</td>
          </tr>
        ))}
      </tbody>
    </TrainingTable>
  );
}

export function TrainingTableSection({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-8">{children}</div>
    </div>
  );
}
