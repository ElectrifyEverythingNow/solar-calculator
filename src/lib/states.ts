import solarHoursData from "@/data/solar-hours.json";

/**
 * Build slug<->code maps from solar-hours.json.
 * Slugs are lowercase state names with spaces replaced by hyphens.
 *   e.g. "New Hampshire" -> "new-hampshire"
 */

const data = solarHoursData as Record<string, { name: string; peakSunHours: number }>;

function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

/** slug -> state code, e.g. "colorado" -> "CO" */
export const STATE_SLUGS: Record<string, string> = {};

/** state code -> slug, e.g. "CO" -> "colorado" */
export const STATE_CODE_TO_SLUG: Record<string, string> = {};

for (const [code, entry] of Object.entries(data)) {
  const slug = toSlug(entry.name);
  STATE_SLUGS[slug] = code;
  STATE_CODE_TO_SLUG[code] = slug;
}

/** Returns all state slugs. */
export function getAllStateSlugs(): string[] {
  return Object.keys(STATE_SLUGS);
}

/** Returns the state code for a given slug, or undefined if not found. */
export function getStateBySlug(slug: string): string | undefined {
  return STATE_SLUGS[slug];
}
