export default function SpecTable({
  caption,
  columns,
  rows,
}: {
  caption?: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
      {caption ? (
        <p className="border-b border-border bg-muted/30 px-5 py-3 text-sm text-forest-600 sm:px-6">{caption}</p>
      ) : null}
      <div className="overflow-x-auto">
        <table className={`w-full text-left text-sm ${columns.length > 2 ? "min-w-[32rem]" : "min-w-[20rem]"}`}>
          <thead className="bg-forest-800 text-white">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-5 py-3.5 font-semibold sm:px-6">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell, i) => (
                  <td
                    key={`${row[0]}-${i}`}
                    className={`px-5 py-4 leading-relaxed sm:px-6 ${
                      i === 0 ? "font-medium text-forest-900" : "text-forest-600"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
