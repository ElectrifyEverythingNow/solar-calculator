interface Props {
  modelYear: string;
  currentMiles: string;
  skipped: boolean;
  onModelYearChange: (v: string) => void;
  onMilesChange: (v: string) => void;
  onToggleSkip: () => void;
}

export function VehicleInput({
  modelYear,
  currentMiles,
  skipped,
  onModelYearChange,
  onMilesChange,
  onToggleSkip,
}: Props) {
  const inputStyle = {
    borderColor: "#cbd5e1",
    "--tw-ring-color": "#16a34a",
  } as React.CSSProperties;

  return (
    <div
      className={`rounded-xl border p-4 mb-3 flex items-start gap-4 transition-opacity ${skipped ? "opacity-40" : ""}`}
      style={{ background: "#f8fafc", borderColor: "#e2e8f0" }}
    >
      <div className="text-3xl flex-shrink-0 mt-0.5">🚗</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900">Vehicle</div>
        <div className="text-xs mb-2 text-een-green">→ Electric Vehicle</div>
        {!skipped && (
          <div className="flex gap-2">
            <input
              type="number"
              min={1990}
              max={new Date().getFullYear()}
              value={modelYear}
              onChange={(e) => onModelYearChange(e.target.value)}
              placeholder="Model year"
              className="w-1/2 rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2"
              style={inputStyle}
            />
            <input
              type="number"
              min={0}
              max={500000}
              value={currentMiles}
              onChange={(e) => onMilesChange(e.target.value)}
              placeholder="Current miles"
              className="w-1/2 rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2"
              style={inputStyle}
            />
          </div>
        )}
        <button
          type="button"
          onClick={onToggleSkip}
          className="text-xs text-gray-400 hover:text-gray-600 mt-1.5 block"
        >
          {skipped ? "I have one — add it" : "I don't have one"}
        </button>
      </div>
    </div>
  );
}
