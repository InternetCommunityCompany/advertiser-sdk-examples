"use client";

import type Specify from "@specify-sh/advertiser-sdk";
import { useEffect, useState } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import { consentConfig } from "./consent-config";

export function CookieConsentControl({ client }: { client: Specify }) {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    let active = true;

    const syncConsent = () => {
      if (!active) return;
      const granted = CookieConsent.acceptedCategory("analytics");
      client.setCookieConsent(granted);
      setConsent(granted);
    };

    void CookieConsent.run({
      ...consentConfig,
      onConsent: syncConsent,
      onChange: syncConsent,
    }).then(() => {
      if (!active) return;
      setReady(true);
    });

    return () => {
      client.setCookieConsent(false);
      active = false;
      CookieConsent.reset();
    };
  }, [client]);

  return (
    <div className="consent-row">
      <span className={`badge ${consent ? "granted" : "waiting"}`}>
        {consent ? "Consent granted" : "Consent not granted"}
      </span>
      <button
        className="secondary"
        type="button"
        disabled={!ready}
        onClick={() => CookieConsent.showPreferences()}
      >
        Cookie preferences
      </button>
    </div>
  );
}
