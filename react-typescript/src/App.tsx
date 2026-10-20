import { useState } from "react";
import { ConsentBridge } from "./components/consent-bridge";
import { IdentityBridge } from "./components/identity-bridge";
import { Layout } from "./demo/layout";
import { specify } from "./lib/specify";

export default function App() {
  const [signups, setSignups] = useState(0);

  function onSignup() {
    specify.capture("signup");
    setSignups((count) => count + 1);
  }

  return (
    <Layout>
      <ConsentBridge />
      <IdentityBridge />
      <div className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Capture a conversion</h3>
            <p className="mt-1 font-mono text-xs text-gray-400">signup</p>
          </div>
          <button
            type="button"
            onClick={onSignup}
            className="inline-flex min-w-48 items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
          >
            Simulate a sign-up
          </button>
        </div>
        <p
          role="status"
          aria-live="polite"
          className="mt-4 border-t border-gray-700/60 pt-4 text-sm text-gray-400"
        >
          {signups === 0
            ? "Click to capture a signup event."
            : `Captured ${signups} signup ${signups === 1 ? "event" : "events"}. Check the request to spfsrv.com/v1/events in your browser's network panel.`}
        </p>
      </div>
    </Layout>
  );
}
