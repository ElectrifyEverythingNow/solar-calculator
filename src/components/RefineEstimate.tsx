"use client";

import { useState } from "react";
import { fetchPVWattsEstimate } from "@/lib/pvwatts";

interface RefineEstimateProps {
  systemSizeW: number;
  onRefine: (annualKwh: number) => void;
}

export function RefineEstimate({
  systemSizeW,
  onRefine,
}: RefineEstimateProps) {
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refined, setRefined] = useState(false);

  const handleRefine = async () => {
    if (!zip || zip.length < 5) {
      setError("Please enter a valid zip code");
      return;
    }
    setLoading(true);
    setError(null);
    const result = await fetchPVWattsEstimate({
      systemCapacityKw: systemSizeW / 1000,
      address: zip,
    });
    setLoading(false);
    if ("error" in result) {
      setError(result.error);
    } else {
      onRefine(result.annualKwh);
      setRefined(true);
    }
  };

  if (refined) {
    return (
      <p className="text-sm text-green-700 font-medium">
        Estimate refined with NREL PVWatts data for zip {zip}
      </p>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-end">
      <div className="flex-1">
        <label
          htmlFor="zip-refine"
          className="block text-sm font-medium text-zinc-700 mb-1"
        >
          Refine with your zip code
        </label>
        <input
          id="zip-refine"
          type="text"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          placeholder="e.g. 80301"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>
      <button
        onClick={handleRefine}
        disabled={loading}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors whitespace-nowrap"
      >
        {loading ? "Refining..." : "Refine My Estimate"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
