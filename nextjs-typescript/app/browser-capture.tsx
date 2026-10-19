"use client";

import { useState } from "react";
import { showConsentPreferences } from "../demo/consent";
import { specify } from "../lib/specify";

export function BrowserCapture() {
  const [signups, setSignups] = useState(0);

  function onSignup() {
    specify.capture("signup");
    setSignups((count) => count + 1);
  }

  return (
    <section className="flow" aria-labelledby="browser-title">
      <h2 id="browser-title">1. Capture in the browser</h2>
      <p>
        Browser events carry the customer ID and the current page URL. Your
        cookie choice decides only whether Specify&apos;s cookie comes along.
      </p>
      <div className="consent-row">
        <button
          className="secondary"
          type="button"
          onClick={showConsentPreferences}
        >
          Cookie preferences
        </button>
      </div>
      <div className="interaction">
        <code>signup</code>
        <button type="button" onClick={onSignup}>
          Simulate a sign-up
        </button>
      </div>
      <p className="result" role="status" aria-live="polite">
        {signups === 0
          ? null
          : `Captured ${signups} signup ${signups === 1 ? "event" : "events"}. Check the request to spfsrv.com/v1/events in your browser's network panel.`}
      </p>
    </section>
  );
}
