"use client";

import { EquipmentToggle } from "./EquipmentToggle";

export interface RateInputValues {
  zipCode: string;
  homeSqFt: number;
  hasEv: boolean;
  evMilesPerMonth: number;
  hasHeatPump: boolean;
  hasSolar: boolean;
  solarSizeKw: number;
}

interface RateInputsProps {
  values: RateInputValues;
  onChange: (values: RateInputValues) => void;
  onCalculate: () => void;
  isLoading: boolean;
}

export function RateInputs({ values, onChange, onCalculate, isLoading }: RateInputsProps) {
  const update = (partial: Partial<RateInputValues>) => onChange({ ...values, ...partial });

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 space-y-5">
      {/* Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="zip-code" className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
            Zip Code
          </label>
          <input
            id="zip-code"
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={values.zipCode}
            onChange={(e) => update({ zipCode: e.target.value.replace(/\D/g, "").slice(0, 5) })}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
          />
        </div>
        <div>
          <label htmlFor="home-size" className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
            Home Size (sq ft)
          </label>
          <input
            id="home-size"
            type="number"
            min={500}
            max={10000}
            step={100}
            value={values.homeSqFt}
            onChange={(e) => update({ homeSqFt: Number(e.target.value) || 2500 })}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
          />
        </div>
      </div>

      {/* Equipment Toggles */}
      <div>
        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Your Equipment</label>
        <div className="flex flex-wrap gap-2">
          <EquipmentToggle label="EV" icon="&#9889;" active={values.hasEv} onToggle={() => update({ hasEv: !values.hasEv })} />
          <EquipmentToggle label="Heat Pump" icon="&#127777;&#65039;" active={values.hasHeatPump} onToggle={() => update({ hasHeatPump: !values.hasHeatPump })} />
          <EquipmentToggle label={`Solar (${values.solarSizeKw} kW)`} icon="&#9728;&#65039;" active={values.hasSolar} onToggle={() => update({ hasSolar: !values.hasSolar })} />
        </div>
      </div>

      {/* Conditional detail inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {values.hasEv && (
          <div>
            <label htmlFor="ev-miles" className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Monthly EV Miles</label>
            <input id="ev-miles" type="number" min={0} max={5000} step={100} value={values.evMilesPerMonth}
              onChange={(e) => update({ evMilesPerMonth: Number(e.target.value) || 0 })}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none" />
          </div>
        )}
        {values.hasSolar && (
          <div>
            <label htmlFor="solar-size" className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Solar System Size (kW)</label>
            <input id="solar-size" type="number" min={1} max={20} step={0.5} value={values.solarSizeKw}
              onChange={(e) => update({ solarSizeKw: Number(e.target.value) || 5 })}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none" />
          </div>
        )}
      </div>

      {/* Calculate Button */}
      <div className="text-center pt-2">
        <button type="button" onClick={onCalculate} disabled={isLoading || values.zipCode.length !== 5}
          className="inline-flex items-center gap-2 bg-green-600 text-white font-bold text-base px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm">
          {isLoading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading Rates...
            </>
          ) : (
            "Compare Rate Plans"
          )}
        </button>
      </div>
    </div>
  );
}
