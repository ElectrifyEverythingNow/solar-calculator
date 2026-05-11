"use client";

import { usePathname } from "next/navigation";

import TrackedLink from "@/components/TrackedLink";

const navLinks = [
  {
    href: "/start",
    label: "Start Here",
    tool_id: "project_starter",
    isActive: (pathname: string) => pathname === "/start",
  },
  {
    href: "/heat-pump-fit",
    label: "Heat Pump Fit",
    tool_id: "heat_pump_fit",
    isActive: (pathname: string) => pathname === "/heat-pump-fit",
  },
  {
    href: "/solar",
    label: "Balcony Solar",
    tool_id: "solar",
    isActive: (pathname: string) => pathname === "/solar",
  },
  {
    href: "/panel-checker",
    label: "Panel Checker",
    tool_id: "panel_checker",
    isActive: (pathname: string) => pathname === "/panel-checker",
  },
  {
    href: "/install-guide",
    label: "Guides",
    tool_id: "install_guides",
    isActive: (pathname: string) =>
      pathname === "/install-guide" || pathname === "/solar/how-to-install",
  },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-zinc-900 text-white py-2 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <TrackedLink
          href="/"
          eventName="top_nav_clicked"
          analyticsPayload={{
            source: "top_nav",
            destination: "/",
            label: "ElectrifyEverythingNow",
          }}
          className="text-sm font-semibold text-green-400 hover:text-green-300"
        >
          ElectrifyEverythingNow
        </TrackedLink>
        <div className="flex items-center gap-4 text-sm">
          {navLinks.map((link) => {
            const isActive = link.isActive(pathname);

            return (
              <TrackedLink
                key={link.href}
                href={link.href}
                eventName="top_nav_clicked"
                analyticsPayload={{
                  source: "top_nav",
                  destination: link.href,
                  label: link.label,
                  tool_id: link.tool_id,
                }}
                aria-current={isActive ? "page" : undefined}
                className={`hover:text-green-300 ${
                  isActive ? "text-green-400 font-semibold" : "text-zinc-300"
                }`}
              >
                {link.label}
              </TrackedLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
