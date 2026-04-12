import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Install Balcony Solar Panels — Step-by-Step Guide",
  description:
    "Complete step-by-step guide to installing plug-in solar panels on your balcony, patio, or apartment. Safety tips, UL certification requirements, and state legislation guidance.",
  keywords: [
    "how to install balcony solar",
    "plug-in solar panel installation",
    "balcony solar setup guide",
    "apartment solar panel installation",
    "plug-in solar step by step",
    "UL 3700 solar panels",
    "balcony solar safety",
    "renter solar installation",
    "patio solar panels how to",
    "plug-in solar legislation",
  ],
  alternates: {
    canonical: "https://electrifyeverythingnow.com/solar/how-to-install",
  },
  openGraph: {
    title: "How to Install Balcony Solar Panels — Step-by-Step Guide",
    description:
      "Complete step-by-step guide to installing plug-in solar panels on your balcony, patio, or apartment. Safety tips, UL certification requirements, and state legislation guidance.",
    url: "https://electrifyeverythingnow.com/solar/how-to-install",
    siteName: "ElectrifyEverythingNow",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "How to Install Balcony Solar Panels — Step-by-Step Guide by ElectrifyEverythingNow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Install Balcony Solar Panels — Step-by-Step Guide",
    description:
      "Complete step-by-step guide to installing plug-in solar panels on your balcony, patio, or apartment. Safety tips and UL certification requirements.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "How to Install Balcony Solar Panels",
      description:
        "Complete step-by-step guide to installing plug-in solar panels on your balcony, patio, or apartment.",
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: "$300-$2,000",
      },
      totalTime: "PT2H",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Check your state's plug-in solar legislation status",
          text: "Check your state's plug-in solar legislation status. As of 2026, several states have enacted or introduced plug-in solar bills. Verify whether your state allows plug-in solar systems without utility approval.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Assess your balcony or patio sun exposure and orientation",
          text: "Assess your balcony or patio sun exposure and orientation. South-facing locations receive the most sunlight in the Northern Hemisphere. Check for shading from trees, buildings, or overhangs.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Calculate your expected savings with our free calculator",
          text: "Calculate your expected savings with our free calculator. Enter your state, utility rate, system size, and tilt angle to get an instant payback estimate.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Choose a UL 3700-certified plug-in solar panel kit",
          text: "Choose a UL 3700-certified plug-in solar panel kit rated between 800W and 1,200W. UL 3700 certification ensures anti-islanding protection and safe grid interaction.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Mount panels on your balcony railing, patio, or wall",
          text: "Mount panels on your balcony railing, patio, or wall using the included hardware. Follow the manufacturer's mounting instructions for your specific installation type.",
        },
        {
          "@type": "HowToStep",
          position: 6,
          name: "Plug the microinverter cable into a standard 120V outdoor-rated outlet",
          text: "Plug the microinverter cable into a standard 120V outdoor-rated outlet. The microinverter converts DC power from the panels to AC power compatible with your home's electrical system.",
        },
        {
          "@type": "HowToStep",
          position: 7,
          name: "Monitor your energy production and verify lower meter usage",
          text: "Monitor your energy production and verify your meter is registering lower usage. Most plug-in solar kits include a monitoring app or display to track output.",
        },
        {
          "@type": "HowToStep",
          position: 8,
          name: "Notify your utility company if required by your state's legislation",
          text: "Notify your utility company if required by your state's legislation. In states with enacted plug-in solar laws, this is typically a simple notification rather than an approval process.",
        },
      ],
    },
    {
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
          name: "How to Install",
          item: "https://electrifyeverythingnow.com/solar/how-to-install",
        },
      ],
    },
  ],
};

export default function HowToInstallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
