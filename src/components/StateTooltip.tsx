interface StateTooltipProps {
  name: string;
  peakSunHours: number;
  legislationLabel: string;
  legislationStatus: string;
  paybackYears: number | null;
  x: number;
  y: number;
}

function getStatusDot(status: string): string {
  switch (status) {
    case "enacted": return "bg-green-500";
    case "approved": return "bg-green-400";
    case "introduced": return "bg-yellow-400";
    case "failed": return "bg-red-400";
    default: return "bg-zinc-400";
  }
}

export function StateTooltip({
  name,
  peakSunHours,
  legislationLabel,
  legislationStatus,
  paybackYears,
  x,
  y,
}: StateTooltipProps) {
  return (
    <div
      className="pointer-events-none fixed z-50 rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white shadow-lg max-w-xs"
      style={{ left: x + 12, top: y - 10 }}
    >
      <p className="font-semibold">{name}</p>
      <p className="text-zinc-300">~{peakSunHours} peak sun hours/day</p>
      <div className="flex items-center gap-1.5 mt-1">
        <span className={`inline-block w-2 h-2 rounded-full ${getStatusDot(legislationStatus)}`} />
        <p className="text-zinc-300 text-xs">{legislationLabel}</p>
      </div>
      {paybackYears != null && paybackYears !== Infinity && (
        <p className="text-zinc-400 text-xs mt-0.5">
          ~{paybackYears.toFixed(1)} yr payback at default settings
        </p>
      )}
    </div>
  );
}
