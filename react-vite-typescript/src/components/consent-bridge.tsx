import { useEffect } from "react";
import { watchAdvertisingConsent } from "../demo/consent";
import { specify } from "../lib/specify";

export function ConsentBridge() {
  useEffect(
    () =>
      watchAdvertisingConsent((granted) => specify.setCookieConsent(granted)),
    [],
  );

  return null;
}
