import type { TiltAngle } from "@/lib/types";

const TILT_OPTIONS: { value: TiltAngle; label: string; desc: string }[] = [
  { value: 90, label: "90° Vertical", desc: "Wall / railing mount" },
  { value: 70, label: "70° Steep", desc: "Angled balcony bracket" },
  { value: 45, label: "45° Tilted", desc: "Ground mount — compact" },
  { value: 30, label: "30° Optimal", desc: "Ground mount — best output" },
];

interface SystemInputsProps {
  systemSizeW: number;
  systemCost: number;
  tiltAngle: TiltAngle;
  onSystemSizeChange: (value: number) => void;
  onSystemCostChange: (value: number) => void;
  onTiltAngleChange: (value: TiltAngle) => void;
}

export function SystemInputs({
  systemSizeW,
  systemCost,
  tiltAngle,
  onSystemSizeChange,
  onSystemCostChange,
  onTiltAngleChange,
}: SystemInputsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="system-size"
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            System Size (watts DC)
          </label>
          <input
            id="system-size"
            type="number"
            min={100}
            max={10000}
            step={100}
            value={systemSizeW}
            onChange={(e) => onSystemSizeChange(Number(e.target.value))}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          />
          <p className="text-xs text-zinc-400 mt-1">
            DC rating from the panel label. AC output is ~15-20% lower after inverter losses.
          </p>
        </div>
        <div className="flex-1">
          <label
            htmlFor="system-cost"
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            Total Cost ($)
          </label>
          <input
            id="system-cost"
            type="number"
            min={100}
            max={50000}
            step={100}
            value={systemCost}
            onChange={(e) => onSystemCostChange(Number(e.target.value))}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">
          Panel Tilt Angle
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TILT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onTiltAngleChange(opt.value)}
              className={`rounded-lg border px-3 py-2 text-left transition-all ${
                tiltAngle === opt.value
                  ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                  : "border-zinc-200 bg-white hover:border-zinc-300"
              }`}
            >
              <span className="block text-sm font-semibold text-zinc-900">
                {opt.label}
              </span>
              <span className="block text-xs text-zinc-500">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
