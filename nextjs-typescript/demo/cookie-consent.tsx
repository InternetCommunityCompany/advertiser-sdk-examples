"use client";

import type Specify from "@specify-sh/advertiser-sdk";
import { useEffect, useState } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import { consentConfig } from "./consent-config";

export function setupCookieConsent(
  onConsentChange: (granted: boolean) => void,
  onReady: () => void,
) {
  let active = true;

  const syncConsent = () => {
    if (!active) return;
    onConsentChange(
      CookieConsent.validConsent() &&
        CookieConsent.acceptedCategory("analytics"),
    );
  };

  void CookieConsent.run({
    ...consentConfig,
    onConsent: syncConsent,
    onChange: syncConsent,
  }).then(() => {
    if (!active) return;
    onReady();
  });

  return () => {
    active = false;
    CookieConsent.reset();
  };
}

export function CookieConsentControl({ client }: { client: Specify }) {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const cleanupConsent = setupCookieConsent(
      (granted) => {
        client.setCookieConsent(granted);
        setConsent(granted);
      },
      () => setReady(true),
    );

    return () => {
      client.setCookieConsent(false);
      cleanupConsent();
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
