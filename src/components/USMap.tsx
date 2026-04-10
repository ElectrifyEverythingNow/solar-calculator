"use client";

import { useState, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { StateTooltip } from "./StateTooltip";
import { ColorLegend } from "./ColorLegend";
import solarData from "@/data/solar-hours.json";
import type { StateData } from "@/lib/types";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const FIPS_TO_STATE: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "11": "DC", "12": "FL",
  "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN",
  "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME",
  "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
  "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
  "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
  "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
  "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI",
  "56": "WY",
};

function getSunColor(peakSunHours: number): string {
  const t = Math.max(0, Math.min(1, (peakSunHours - 3.0) / 3.5));
  if (t < 0.25) {
    return `hsl(${185 - t * 40}, 80%, ${75 - t * 20}%)`;
  } else if (t < 0.5) {
    return `hsl(${50 - (t - 0.25) * 40}, 90%, ${70 - (t - 0.25) * 15}%)`;
  } else if (t < 0.75) {
    return `hsl(${40 - (t - 0.5) * 80}, 92%, ${55 - (t - 0.5) * 10}%)`;
  } else {
    return `hsl(${20 - (t - 0.75) * 60}, 90%, ${50 - (t - 0.75) * 10}%)`;
  }
}

interface USMapProps {
  selectedState: string | null;
  onSelectState: (stateCode: string) => void;
}

export function USMap({ selectedState, onSelectState }: USMapProps) {
  const [tooltip, setTooltip] = useState<{
    name: string;
    peakSunHours: number;
    x: number;
    y: number;
  } | null>(null);

  const handleMouseEnter = useCallback(
    (geo: { id: string }, event: React.MouseEvent) => {
      const stateCode = FIPS_TO_STATE[geo.id];
      if (!stateCode) return;
      const data = (solarData as Record<string, StateData>)[stateCode];
      if (!data) return;
      setTooltip({
        name: data.name,
        peakSunHours: data.peakSunHours,
        x: event.clientX,
        y: event.clientY,
      });
    },
    []
  );

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    setTooltip((prev) =>
      prev ? { ...prev, x: event.clientX, y: event.clientY } : null
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <p className="text-center text-sm text-zinc-500 mb-2">
        Click your state to get started
      </p>
      <ComposableMap
        projection="geoAlbersUsa"
        width={800}
        height={500}
        projectionConfig={{ scale: 1050, translate: [400, 260] }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateCode = FIPS_TO_STATE[geo.id];
              const data = stateCode
                ? (solarData as Record<string, StateData>)[stateCode]
                : null;
              const isSelected = stateCode === selectedState;
              const fillColor = data
                ? getSunColor(data.peakSunHours)
                : "#e5e7eb";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  stroke={isSelected ? "#1d4ed8" : "#ffffff"}
                  strokeWidth={isSelected ? 2 : 0.5}
                  className="cursor-pointer outline-none"
                  onMouseEnter={(e) => handleMouseEnter(geo, e)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    if (stateCode) onSelectState(stateCode);
                  }}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: data
                        ? getSunColor(data.peakSunHours + 0.3)
                        : "#d1d5db",
                      stroke: "#1d4ed8",
                      strokeWidth: 1.5,
                      outline: "none",
                    },
                    pressed: {
                      fill: data
                        ? getSunColor(data.peakSunHours + 0.3)
                        : "#d1d5db",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <div className="flex justify-center">
        <ColorLegend />
      </div>
      {tooltip && <StateTooltip {...tooltip} />}
    </div>
  );
}
