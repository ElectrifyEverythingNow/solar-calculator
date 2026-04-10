interface SystemInputsProps {
  systemSizeW: number;
  systemCost: number;
  onSystemSizeChange: (value: number) => void;
  onSystemCostChange: (value: number) => void;
}

export function SystemInputs({
  systemSizeW,
  systemCost,
  onSystemSizeChange,
  onSystemCostChange,
}: SystemInputsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label
          htmlFor="system-size"
          className="block text-sm font-medium text-zinc-700 mb-1"
        >
          System Size (watts)
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
  );
}
