import type { Verdict } from "@/lib/types";
import { getVerdictInfo } from "@/lib/calculations";

interface VerdictBadgeProps {
  verdict: Verdict;
}

export function VerdictBadge({ verdict }: VerdictBadgeProps) {
  const info = getVerdictInfo(verdict);

  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold ${info.color} ${info.bgColor}`}
    >
      {info.label}
    </span>
  );
}
