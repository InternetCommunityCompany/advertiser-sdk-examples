"use client";

import { useActionState } from "react";
import { completePurchase } from "../app/actions";

export function PurchaseForm() {
  const [result, formAction, pending] = useActionState(
    completePurchase,
    null,
  );

  return (
    <section className="flow" aria-labelledby="server-title">
      <h2 id="server-title">2. Complete a purchase on the server</h2>
      <form action={formAction}>
        <div className="interaction">
          <code>purchase</code>
          <button type="submit" disabled={pending} aria-busy={pending}>
            {pending ? "Completing…" : "Complete purchase"}
          </button>
        </div>
        <div className="result" role="status" aria-live="polite">
          {pending ? (
            <p>Completing the purchase and waiting for tracking…</p>
          ) : result ? (
            <>
              <p>
                Purchase complete. Receipt:{" "}
                <code>{result.purchaseId}</code>
              </p>
              <p>
                {result.trackingStatus === 200
                  ? "Tracking accepted (HTTP 200)."
                  : result.trackingStatus === null
                    ? "Tracking returned no HTTP response."
                    : `Tracking returned HTTP ${result.trackingStatus}.`}
              </p>
            </>
          ) : null}
        </div>
      </form>
    </section>
  );
}
