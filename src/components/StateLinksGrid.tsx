import solarData from "@/data/solar-hours.json";
import legislationData from "@/data/legislation.json";
import { STATE_CODE_TO_SLUG } from "@/lib/states";
import type { StateData, LegislationInfo } from "@/lib/types";

const states = Object.entries(solarData as Record<string, StateData>)
  .filter(([code]) => {
    const legis = (legislationData as Record<string, LegislationInfo>)[code];
    return legis && legis.status !== "none" && legis.status !== "failed";
  })
  .sort(([, a], [, b]) => a.name.localeCompare(b.name));

export function StateLinksGrid() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-zinc-900 mb-2">
        Explore by State
      </h2>
      <p className="text-sm text-zinc-500 mb-3">
        States with active plug-in solar legislation — click to see
        state-specific savings estimates.
      </p>
      <div className="flex flex-wrap gap-2">
        {states.map(([code, data]) => {
          const slug = STATE_CODE_TO_SLUG[code];
          if (!slug) return null;
          return (
            <a
              key={code}
              href={`/solar/${slug}`}
              className="text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors border border-green-200"
            >
              {data.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
