import type { SolarEstimate } from "@/lib/types";
import { getVerdict } from "@/lib/calculations";
import { VerdictBadge } from "./VerdictBadge";

interface ResultsCardProps {
  estimate: SolarEstimate;
  systemSizeW: number;
  systemCost: number;
}

function formatDollars(value: number): string {
  if (value < 0) return `-$${Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function ResultsCard({ estimate, systemSizeW, systemCost }: ResultsCardProps) {
  const verdict = getVerdict(estimate.paybackYears);
  const paybackDisplay =
    estimate.paybackYears === Infinity
      ? "N/A"
      : `${estimate.paybackYears.toFixed(1)} years`;
  const costPerWatt = systemSizeW > 0 ? systemCost / systemSizeW : 0;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-zinc-900 mb-4">
        Your Estimated Solar Savings
      </h2>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <span className="text-4xl font-bold text-zinc-900">
          {paybackDisplay}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-zinc-500">payback period</span>
          <VerdictBadge verdict={verdict} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Annual Production</p>
          <p className="text-xl font-semibold text-zinc-900">
            {estimate.annualKwh.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}{" "}
            kWh
          </p>
        </div>
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Annual Savings</p>
          <p className="text-xl font-semibold text-zinc-900">
            {formatDollars(estimate.annualSavings)}/yr
          </p>
        </div>
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">10-Year Net Savings</p>
          <p className="text-xl font-semibold text-zinc-900">
            {formatDollars(estimate.tenYearSavings)}
          </p>
        </div>
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">20-Year Net Savings</p>
          <p className="text-xl font-semibold text-zinc-900">
            {formatDollars(estimate.twentyYearSavings)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-400 border-t border-zinc-100 pt-3">
        <span>
          Capacity factor: {(estimate.capacityFactor * 100).toFixed(1)}%
        </span>
        <span>
          Cost: ${costPerWatt.toFixed(2)}/W DC
        </span>
      </div>
    </div>
  );
}
