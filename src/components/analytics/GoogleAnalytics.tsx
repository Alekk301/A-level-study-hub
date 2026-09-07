"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type AnalyticsConsent = "accepted" | "declined";

const CONSENT_KEY = "caie-study-hub:analytics-consent:v1";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const [consent, setConsent] = useState<AnalyticsConsent | null | undefined>(undefined);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem(CONSENT_KEY);
      setConsent(saved === "accepted" || saved === "declined" ? saved : null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (consent !== "accepted" || document.getElementById("google-analytics-script")) return;

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });

    const script = document.createElement("script");
    script.id = "google-analytics-script";
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }, [consent, measurementId]);

  const choose = (next: AnalyticsConsent) => {
    window.localStorage.setItem(CONSENT_KEY, next);
    setConsent(next);
  };

  if (consent !== null) return null;

  return (
    <aside className="analytics-consent" aria-label="Analytics choice">
      <div>
        <strong>Help improve this study hub?</strong>
        <p>
          Optional analytics show which pages are useful. They load only if you accept.{" "}
          <Link href="/privacy">Privacy details</Link>
        </p>
      </div>
      <div className="analytics-consent__actions">
        <Button type="button" variant="outline" size="sm" onClick={() => choose("declined")}>
          Decline
        </Button>
        <Button type="button" size="sm" onClick={() => choose("accepted")}>
          Accept analytics
        </Button>
      </div>
    </aside>
  );
}
