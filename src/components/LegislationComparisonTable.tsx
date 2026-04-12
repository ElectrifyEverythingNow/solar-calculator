import { LAWS, STATUS_STYLES } from "@/data/legislation-details";
import { STATE_CODE_TO_SLUG } from "@/lib/states";

export function LegislationComparisonTable() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-zinc-900 mb-3">
        State-by-State Plug-In Solar Legislation
      </h2>
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm border-collapse">
          <caption className="sr-only">
            Plug-in solar legislation comparison by state — bills, status, wattage
            caps, and utility approval requirements
          </caption>
          <thead>
            <tr className="border-b border-zinc-200">
              <th
                scope="col"
                className="text-left py-2 pr-3 font-semibold text-zinc-700"
              >
                State
              </th>
              <th
                scope="col"
                className="text-left py-2 pr-3 font-semibold text-zinc-700"
              >
                Bill
              </th>
              <th
                scope="col"
                className="text-left py-2 pr-3 font-semibold text-zinc-700"
              >
                Status
              </th>
              <th
                scope="col"
                className="text-left py-2 pr-3 font-semibold text-zinc-700"
              >
                Max Watts
              </th>
              <th
                scope="col"
                className="text-left py-2 font-semibold text-zinc-700"
              >
                Utility Approval
              </th>
            </tr>
          </thead>
          <tbody>
            {LAWS.map((law) => {
              const style = STATUS_STYLES[law.status];
              const slug = STATE_CODE_TO_SLUG[law.stateCode];
              return (
                <tr
                  key={law.stateCode}
                  className="border-b border-zinc-100 last:border-b-0"
                >
                  <td className="py-2.5 pr-3">
                    <a
                      href={`/solar/${slug}`}
                      className="text-green-600 hover:text-green-700 font-medium underline underline-offset-2"
                    >
                      {law.state}
                    </a>
                  </td>
                  <td className="py-2.5 pr-3">
                    <a
                      href={law.billUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 hover:text-green-600 underline underline-offset-2"
                    >
                      {law.bill}
                    </a>
                  </td>
                  <td className="py-2.5 pr-3">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text} whitespace-nowrap`}
                    >
                      {style.label}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-zinc-600 whitespace-nowrap">
                    {law.maxWatts.toLocaleString()}W
                  </td>
                  <td className="py-2.5 text-zinc-500 text-xs leading-snug">
                    {law.utilityApproval}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
