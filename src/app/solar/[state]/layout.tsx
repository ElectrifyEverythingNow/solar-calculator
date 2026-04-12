import type { Metadata } from "next";
import { STATE_SLUGS } from "@/lib/states";
import solarData from "@/data/solar-hours.json";
import legislationData from "@/data/legislation.json";
import type { StateData, LegislationInfo } from "@/lib/types";

const solarHours = solarData as Record<string, StateData>;
const legislation = legislationData as Record<string, LegislationInfo>;

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ state: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const stateCode = STATE_SLUGS[slug];

  if (!stateCode || !solarHours[stateCode]) {
    return { title: "State Not Found" };
  }

  const stateInfo = solarHours[stateCode];
  const stateName = stateInfo.name;
  const peakSunHours = stateInfo.peakSunHours;
  const legInfo = legislation[stateCode];

  const legislationSnippet = legInfo
    ? ` Legislation status: ${legInfo.label}.`
    : "";

  return {
    title: `Balcony Solar Calculator for ${stateName} \u2014 Plug-In Solar Savings`,
    description: `Free balcony solar calculator for ${stateName}. ${peakSunHours} average peak sun hours.${legislationSnippet} Estimate plug-in solar panel savings, compare utility rates, and get real payback numbers.`,
    alternates: {
      canonical: `https://electrifyeverythingnow.com/solar/${slug}`,
    },
    openGraph: {
      title: `Balcony Solar Calculator for ${stateName} \u2014 Plug-In Solar Savings`,
      description: `Free plug-in solar savings calculator for ${stateName}. ${peakSunHours} peak sun hours, state legislation tracker, and instant payback estimates.`,
      url: `https://electrifyeverythingnow.com/solar/${slug}`,
      siteName: "ElectrifyEverythingNow",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `Balcony Solar Calculator for ${stateName} by ElectrifyEverythingNow`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Balcony Solar Calculator for ${stateName}`,
      description: `Free plug-in solar savings calculator for ${stateName}. ${peakSunHours} peak sun hours and instant payback estimates.`,
      images: ["/og-image.png"],
    },
  };
}

export default async function StateLayout({ children, params }: LayoutProps) {
  const { state: slug } = await params;
  const stateCode = STATE_SLUGS[slug];
  const stateName = stateCode ? solarHours[stateCode]?.name : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://electrifyeverythingnow.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solar Calculator",
        item: "https://electrifyeverythingnow.com/solar",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: stateName
          ? `Balcony Solar for ${stateName}`
          : "State Solar Calculator",
        item: `https://electrifyeverythingnow.com/solar/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
