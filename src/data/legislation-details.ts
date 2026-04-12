export interface LawEntry {
  state: string;
  stateCode: string;
  status: "signed" | "passed" | "introduced";
  bill: string;
  billUrl: string;
  summary: string;
  details: string;
  sourceLabel: string;
  sourceUrl: string;
  maxWatts: number;
  utilityApproval: string;
  effectiveDate: string | null;
}

export const LAWS: LawEntry[] = [
  {
    state: "Utah",
    stateCode: "UT",
    status: "signed",
    bill: "HB 340",
    billUrl: "https://le.utah.gov/~2025/bills/static/HB0340.html",
    summary:
      "First state to legalize plug-in solar. Signed March 2025 with unanimous bipartisan support (72-0 House, 27-0 Senate).",
    details:
      "Allows portable solar devices up to 1,200W connecting to standard 120V outlets. No interconnection application required. Devices must include anti-islanding protection and meet UL/NEC standards.",
    sourceLabel: "pv magazine USA",
    sourceUrl:
      "https://pv-magazine-usa.com/2025/03/05/balcony-solar-gains-unanimous-bipartisan-support-in-utah/",
    maxWatts: 1200,
    utilityApproval: "No interconnection application required",
    effectiveDate: "2025-05-07",
  },
  {
    state: "Virginia",
    stateCode: "VA",
    status: "passed",
    bill: "HB 395 / SB 250",
    billUrl:
      "https://virginiamercury.com/2026/03/10/plug-in-solar-panels-near-approval-by-general-assembly/",
    summary:
      "Passed General Assembly in March 2026. Awaiting governor's signature. Effective 2027.",
    details:
      "Allows small portable solar generation devices up to 1,200W. Exempts systems from interconnection agreements. Prevents landlords with 4+ rental units from banning balcony solar.",
    sourceLabel: "Virginia Mercury",
    sourceUrl:
      "https://virginiamercury.com/2026/03/10/plug-in-solar-panels-near-approval-by-general-assembly/",
    maxWatts: 1200,
    utilityApproval: "Exempt from interconnection agreements",
    effectiveDate: "2027-01-01",
  },
  {
    state: "Maine",
    stateCode: "ME",
    status: "signed",
    bill: "LD 1730",
    billUrl:
      "https://legislature.maine.gov/legis/bills/getTestimonyDoc.asp?id=10057255",
    summary:
      "Signed by Governor Mills on April 6, 2026. Creates two tiers based on system output.",
    details:
      "Systems \u2264420W: DIY install, no utility notification required. Systems 421\u20131,200W: licensed electrician install, utility notification within 30 days. All devices must meet UL 3700 certification. Could save the average Maine household ~$388/year.",
    sourceLabel: "pv magazine USA",
    sourceUrl:
      "https://pv-magazine-usa.com/2026/04/03/maine-becomes-third-state-to-pass-plug-in-solar-legislation/",
    maxWatts: 1200,
    utilityApproval: "No notification required for systems 420W or under; utility notification within 30 days for 421-1200W",
    effectiveDate: "2026-04-06",
  },
  {
    state: "Colorado",
    stateCode: "CO",
    status: "passed",
    bill: "HB 26-1007",
    billUrl:
      "https://www.cohousedems.com/news/house-passes-bill-to-allow-plug-in-solar-panels",
    summary:
      "Passed House (48-16) and Senate (April 10, 2026). Awaiting governor's signature.",
    details:
      "Classifies plug-in solar as personal property, preventing HOA and local government bans. No utility approval needed before installation. Requires UL 3700 certification. Encourages meter collar adoption for seamless grid interconnection.",
    sourceLabel: "Colorado House Democrats",
    sourceUrl:
      "https://www.cohousedems.com/news/house-passes-bill-to-allow-plug-in-solar-panels",
    maxWatts: 1200,
    utilityApproval: "No utility approval needed before installation",
    effectiveDate: null,
  },
  {
    state: "New York",
    stateCode: "NY",
    status: "introduced",
    bill: "SUNNY Act (S8512)",
    billUrl:
      "https://www.nysenate.gov/legislation/bills/2025/S8512/amendment/original",
    summary:
      "Introduced September 2025 by Senator Krueger and Assemblymember Gallagher. In committee.",
    details:
      "Would exempt small plug-in solar from interconnection and net metering requirements. Prohibits utilities from requiring approval or fees for plug-in devices. Aims to expand solar access for renters and apartment dwellers.",
    sourceLabel: "NY Senate",
    sourceUrl:
      "https://www.nysenate.gov/newsroom/press-releases/2025/liz-krueger/krueger-gallagher-introduce-sunny-act-support-balcony",
    maxWatts: 1200,
    utilityApproval: "Would prohibit utilities from requiring approval or fees",
    effectiveDate: null,
  },
  {
    state: "Illinois",
    stateCode: "IL",
    status: "introduced",
    bill: "SB 3104 / HB 4524",
    billUrl:
      "https://www.senatorventura.com/news/press-releases/283-ventura-legislation-to-allow-to-plug-in-solar-panels-for-illinois-residents-passes-committee",
    summary:
      "Passed committee. Replaces utility approval with simple notification. Prevents HOA bans on sub-392W systems.",
    details:
      "Defines plug-in solar as lightweight units up to 1,200W through an existing outlet. Eliminates installation fees. Systems under 392W cannot be banned by landlords or HOAs. Only utility notification (not approval) required within 30 days.",
    sourceLabel: "Capitol News Illinois",
    sourceUrl:
      "https://capitolnewsillinois.com/news/lawmakers-seek-measure-to-make-small-scale-plug-in-solar-panels-available-to-renters/",
    maxWatts: 1200,
    utilityApproval: "Utility notification (not approval) required within 30 days",
    effectiveDate: null,
  },
];

export const STATUS_STYLES: Record<
  LawEntry["status"],
  { bg: string; text: string; label: string }
> = {
  signed: {
    bg: "bg-green-100",
    text: "text-green-800",
    label: "Signed into Law",
  },
  passed: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    label: "Passed Legislature",
  },
  introduced: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    label: "Introduced",
  },
};
