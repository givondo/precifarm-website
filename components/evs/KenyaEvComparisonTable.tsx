import type { KenyaEvModel } from "@/lib/kenya-ev-compatibility";
import { kenyaEvCompatibilityPage } from "@/lib/kenya-ev-compatibility";
import ChargingTimeCell from "@/components/evs/ChargingTimeCell";

type KenyaEvComparisonTableProps = {
  models: KenyaEvModel[];
  caption?: string;
  minWidth?: string;
  showFootnote?: boolean;
};

export default function KenyaEvComparisonTable({
  models,
  caption = kenyaEvCompatibilityPage.caption,
  minWidth = "1160px",
  showFootnote = true,
}: KenyaEvComparisonTableProps) {
  const { columns, practicalRangeFootnote, variantDisclaimer, chargingTimeNote } = kenyaEvCompatibilityPage;

  return (
    <div className="training-table-shell">
      <div className="training-table-wrap">
        <div className="training-table-scroll">
          <table className="training-table w-full text-left text-sm" style={{ minWidth }}>
            <caption className="training-table-caption">
              <span className="training-table-caption-label">{caption}</span>
            </caption>
            <thead>
              <tr>
                <th scope="col">{columns.model}</th>
                <th scope="col">{columns.body}</th>
                <th scope="col">{columns.battery}</th>
                <th scope="col">{columns.practicalRange}</th>
                <th scope="col">{columns.dcCharging}</th>
                <th scope="col">{columns.chargingTime}</th>
                <th scope="col">{columns.precifarmCharging}</th>
              </tr>
            </thead>
            <tbody>
              {models.map((car) => (
                <tr key={car.id}>
                  <th scope="row" className="font-semibold text-forest-900">
                    {car.model}
                  </th>
                  <td className="text-forest-600">{car.body}</td>
                  <td className="font-mono text-forest-700">{car.battery}</td>
                  <td className="font-mono text-forest-900">{car.practicalRange}</td>
                  <td className="font-mono text-forest-900">{car.dcCharging}</td>
                  <td className="align-top text-forest-700">
                    <ChargingTimeCell time={car.chargingTime} />
                  </td>
                  <td className="font-medium text-charge-700">{car.precifarmCharging}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showFootnote && (
        <>
          <p className="training-table-hint">{chargingTimeNote}</p>
          <p className="training-table-hint">{practicalRangeFootnote}</p>
          <p className="text-xs leading-relaxed text-forest-400">{variantDisclaimer}</p>
        </>
      )}
    </div>
  );
}
