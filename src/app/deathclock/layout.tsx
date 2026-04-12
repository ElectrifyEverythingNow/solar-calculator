import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Appliance Death Clock — When Will Your Appliances Fail?",
  description:
    "See when each of your home appliances is likely to fail so you can plan an electric upgrade instead of panicking through an emergency replacement.",
  alternates: {
    canonical: "https://electrifyeverythingnow.com/deathclock",
  },
  openGraph: {
    title: "Appliance Death Clock — When Will Your Appliances Fail?",
    description:
      "Free tool: enter your appliance ages and see exactly when each one is likely to fail. Plan the electric upgrade instead of panicking through an emergency.",
    url: "https://electrifyeverythingnow.com/deathclock",
    siteName: "ElectrifyEverythingNow",
    type: "website",
  },
};

export default function DeathClockLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${instrumentSerif.variable} ${dmSans.variable}`}
      style={{ "--font-serif": "var(--font-instrument-serif)", "--font-sans-dc": "var(--font-dm-sans)" } as React.CSSProperties}>
      {children}
    </div>
  );
}
