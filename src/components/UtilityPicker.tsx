"use client";

import { useState } from "react";
import utilitiesData from "@/data/utilities.json";
import type { StateUtilities, Utility } from "@/lib/types";

interface UtilityPickerProps {
  stateCode: string;
  onSelectUtility: (utility: Utility | null, customRate: number | null) => void;
}

export function UtilityPicker({
  stateCode,
  onSelectUtility,
}: UtilityPickerProps) {
  const [isCustom, setIsCustom] = useState(false);
  const [customRate, setCustomRate] = useState("");

  const stateData = (utilitiesData as Record<string, StateUtilities>)[
    stateCode
  ];
  if (!stateData) return null;

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "custom") {
      setIsCustom(true);
      onSelectUtility(null, null);
    } else {
      setIsCustom(false);
      const utility = stateData.utilities[Number(value)];
      if (utility) onSelectUtility(utility, null);
    }
  };

  const handleCustomRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomRate(val);
    const rate = parseFloat(val);
    if (!isNaN(rate) && rate > 0) {
      onSelectUtility(null, rate);
    }
  };

  return (
    <div>
      <label
        htmlFor="utility-select"
        className="block text-sm font-medium text-zinc-700 mb-1"
      >
        Your Utility in {stateData.state}
      </label>
      <select
        id="utility-select"
        onChange={handleSelect}
        defaultValue=""
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
      >
        <option value="" disabled>
          Select your utility...
        </option>
        {stateData.utilities.map((u, i) => (
          <option key={u.name} value={i}>
            {u.name} — ${u.ratePerKwh.toFixed(3)}/kWh
          </option>
        ))}
        <option value="custom">Other / Enter my rate</option>
      </select>
      {isCustom && (
        <div className="mt-3">
          <label
            htmlFor="custom-rate"
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            Your rate ($/kWh)
          </label>
          <input
            id="custom-rate"
            type="number"
            min={0.01}
            max={1.0}
            step={0.001}
            value={customRate}
            onChange={handleCustomRate}
            placeholder="e.g. 0.15"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>
      )}
    </div>
  );
}
