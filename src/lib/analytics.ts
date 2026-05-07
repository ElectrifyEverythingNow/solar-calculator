export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

const ANALYTICS_ENDPOINT = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT || "";

type WindowWithAnalytics = Window & {
  plausible?: (eventName: string, options?: { props?: AnalyticsPayload }) => void;
  dataLayer?: Array<Record<string, unknown>>;
};

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  ) as AnalyticsPayload;

  const analyticsWindow = window as WindowWithAnalytics;

  analyticsWindow.plausible?.(eventName, { props: cleanPayload });
  analyticsWindow.dataLayer?.push({ event: eventName, ...cleanPayload });

  if (ANALYTICS_ENDPOINT) {
    const body = JSON.stringify({
      event: eventName,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
      ...cleanPayload,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(ANALYTICS_ENDPOINT, new Blob([body], { type: "application/json" }));
      return;
    }

    fetch(ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // Analytics should never block the tool UX.
    });
  }
}
