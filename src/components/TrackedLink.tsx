"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { trackEvent, type AnalyticsPayload } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  analyticsPayload?: AnalyticsPayload;
};

export default function TrackedLink({
  eventName,
  analyticsPayload = {},
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        try {
          trackEvent(eventName, analyticsPayload);
        } catch {
          // Analytics should never block navigation or consumer click handlers.
        }
      }}
    />
  );
}
