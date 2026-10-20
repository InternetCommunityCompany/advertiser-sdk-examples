"use client";

import { useEffect } from "react";
import { useCookieConsent } from "react-cookie-manager";

import { Button } from "@/components/ui/button";
import { specify } from "@/lib/specify";

export function ConsentBridge(): null {
  const { detailedConsent } = useCookieConsent();

  useEffect(() => {
    // Null until the visitor answers. Passing false before then would count
    // as a refusal, and the SDK drops the events it held for the answer.
    if (detailedConsent) {
      specify.setCookieConsent(detailedConsent.Advertising.consented);
    }
  }, [detailedConsent]);

  return null;
}

export function ConsentButton() {
  const { openPreferencesModal } = useCookieConsent();

  return (
    <Button variant="ghost" onClick={openPreferencesModal}>
      Consent
    </Button>
  );
}
