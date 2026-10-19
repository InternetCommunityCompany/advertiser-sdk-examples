"use client";

import { useEffect } from "react";
import { watchAdvertisingConsent } from "../demo/consent";
import { specify } from "../lib/specify";

export function SpecifyBridge({ customerId }: { customerId: string }) {
  useEffect(
    () =>
      watchAdvertisingConsent((granted) => specify.setCookieConsent(granted)),
    [],
  );

  useEffect(() => {
    specify.identify(customerId);
  }, [customerId]);

  return null;
}
