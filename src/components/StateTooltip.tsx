interface StateTooltipProps {
  name: string;
  peakSunHours: number;
  x: number;
  y: number;
}

export function StateTooltip({ name, peakSunHours, x, y }: StateTooltipProps) {
  return (
    <div
      className="pointer-events-none fixed z-50 rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white shadow-lg"
      style={{ left: x + 12, top: y - 10 }}
    >
      <p className="font-semibold">{name}</p>
      <p className="text-zinc-300">~{peakSunHours} peak sun hours/day</p>
    </div>
  );
}
