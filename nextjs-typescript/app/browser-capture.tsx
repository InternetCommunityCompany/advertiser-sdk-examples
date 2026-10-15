"use client";

import Specify from "@specify-sh/advertiser-sdk";
import { useEffect, useState } from "react";
import { CookieConsentControl } from "../demo/cookie-consent";

export function BrowserCapture({ customerId }: { customerId: string }) {
  const [specify] = useState(
    () =>
      new Specify({
        advertiserKey: process.env.NEXT_PUBLIC_SPECIFY_ADVERTISER_KEY ?? "",
      }),
  );
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<number | null>();

  useEffect(() => {
    void specify.identify(customerId);
  }, [customerId, specify]);

  async function captureEvent() {
    if (pending) return;

    setPending(true);
    setResult(undefined);
    const status = await specify.capture("product_view");
    setResult(status);
    setPending(false);
  }

  return (
    <section className="flow" aria-labelledby="browser-title">
      <h2 id="browser-title">1. Capture in the browser</h2>
      <p>
        Browser events include the customer ID and current page URL. Events wait
        in memory until analytics consent is granted.
      </p>
      <CookieConsentControl client={specify} />
      <div className="interaction">
        <code>product_view</code>
        <button
          type="button"
          onClick={captureEvent}
          disabled={pending}
          aria-busy={pending}
        >
          {pending ? "Capturing…" : "Track product view"}
        </button>
      </div>
      <p className="result" role="status" aria-live="polite">
        {pending
          ? "Waiting for the SDK response…"
          : result === undefined
            ? null
            : result === 200
              ? "Event accepted (HTTP 200)."
              : result === null
                ? "No HTTP response. The event may be buffered or could not be sent."
                : `Capture returned HTTP ${result}.`}
      </p>
    </section>
  );
}
