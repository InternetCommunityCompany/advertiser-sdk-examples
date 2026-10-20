import { useEffect } from "react";
import { useCookieConsent } from "react-cookie-manager";

import { specify } from "./specify";

export function ConsentBridge(): null {
  const { detailedConsent } = useCookieConsent();

  useEffect(() => {
    // null means the visitor hasn't answered yet. Passing false then would
    // count as a refusal, and the events waiting for the answer would be lost.
    if (detailedConsent) {
      specify.setCookieConsent(detailedConsent.Advertising.consented);
    }
  }, [detailedConsent]);

  return null;
}

export function ConsentButton() {
  const { openPreferencesModal } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openPreferencesModal}
      className="text-sm underline"
    >
      Consent
    </button>
  );
}
