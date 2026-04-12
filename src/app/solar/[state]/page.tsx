import { notFound } from "next/navigation";
import { StateCalculator } from "@/components/StateCalculator";
import { getAllStateSlugs, STATE_SLUGS } from "@/lib/states";
import solarData from "@/data/solar-hours.json";
import legislationData from "@/data/legislation.json";
import type { StateData, LegislationInfo, LegislationStatus } from "@/lib/types";

const solarHours = solarData as Record<string, StateData>;
const legislation = legislationData as Record<string, LegislationInfo>;

export function generateStaticParams() {
  return getAllStateSlugs().map((slug) => ({ state: slug }));
}

const STATUS_COLORS: Record<LegislationStatus, { bg: string; text: string; label: string }> = {
  enacted: { bg: "bg-green-100", text: "text-green-800", label: "Enacted" },
  approved: { bg: "bg-blue-100", text: "text-blue-800", label: "Passed Legislature" },
  introduced: { bg: "bg-amber-100", text: "text-amber-800", label: "Bill Introduced" },
  failed: { bg: "bg-red-100", text: "text-red-800", label: "Bill Failed" },
  none: { bg: "bg-zinc-100", text: "text-zinc-600", label: "No Legislation" },
};

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const stateCode = STATE_SLUGS[slug];

  if (!stateCode || !solarHours[stateCode]) {
    notFound();
  }

  const stateInfo = solarHours[stateCode];
  const stateName = stateInfo.name;
  const peakSunHours = stateInfo.peakSunHours;
  const legInfo = legislation[stateCode];
  const statusStyle = legInfo ? STATUS_COLORS[legInfo.status] : STATUS_COLORS.none;

  return (
    <>
      <section className="w-full max-w-2xl mx-auto px-4 pt-6 pb-2">
        <div className="bg-green-50 rounded-2xl border border-green-200 p-4">
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">
            Balcony Solar in {stateName}
          </h2>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyle.bg} ${statusStyle.text}`}
            >
              {statusStyle.label}
            </span>
            {legInfo && legInfo.status !== "none" && (
              <span className="text-sm text-zinc-600">{legInfo.label}</span>
            )}
          </div>
          <p className="text-sm text-zinc-600">
            {stateName} averages{" "}
            <span className="font-semibold text-zinc-800">
              {peakSunHours} peak sun hours
            </span>{" "}
            per day. Use the calculator below to estimate your plug-in solar
            savings based on local utility rates and your system setup.
          </p>
        </div>
      </section>

      <StateCalculator initialStateCode={stateCode} />
    </>
  );
}
