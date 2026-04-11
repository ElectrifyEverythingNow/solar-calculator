import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Utility Rate Optimizer | ElectrifyEverythingNow",
  description:
    "Find the cheapest electricity plan for your electrified home. Compare TOU, flat, and EV rate plans from your utility.",
  openGraph: {
    title: "Utility Rate Optimizer — Find Your Best Electric Rate",
    description:
      "Free tool: enter your zip code, select your equipment, and see which rate plan saves you the most.",
    url: "https://electrifyeverythingnow.com/rates",
    siteName: "ElectrifyEverythingNow",
    type: "website",
  },
};

export default function RatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
