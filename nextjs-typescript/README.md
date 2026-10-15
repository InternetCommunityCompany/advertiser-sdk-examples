# Next.js + TypeScript

A small App Router integration: identify a customer and track a product view in
the browser, then complete a purchase through a Node.js Server Action. The layout
and CookieConsent integration follow the React example.

## Where to read

Start with the SDK integration files:

- [app/browser-capture.tsx](app/browser-capture.tsx): create the browser client,
  identify the customer, and capture an event.
- [demo/cookie-consent.tsx](demo/cookie-consent.tsx): own consent state,
  synchronize it with the SDK, and manage consent UI setup and cleanup.
- [app/actions.ts](app/actions.ts): resolve the customer on the server, complete
  the purchase, and capture it with a separate server client.

The example scaffolding lives in `demo/`, following the React example:

| File | Responsibility |
| --- | --- |
| [cookie-consent.tsx](demo/cookie-consent.tsx) | Own consent state, synchronize it with the SDK, and manage consent UI setup and cleanup. |
| [consent-config.ts](demo/consent-config.ts) | Consent categories and modal copy. |
| [customer.ts](demo/customer.ts) | Server-only customer lookup. |
| [layout.tsx](demo/layout.tsx) and [styles.css](demo/styles.css) | Page presentation. |
| [purchase-form.tsx](demo/purchase-form.tsx) | Submit the Server Action and display pending/results. |

## Setup and configuration

Requires Node.js 20.9+ and Bun. Keep this checkout beside `specify-sdks`; the
`file:../../specify-sdks/packages/advertiser-sdk` dependency uses its compiled
public package exports.

The scripts use Next.js's supported Webpack option because Turbopack currently
fails to read Bun's linked local package manifest in this setup.

```sh
cd ../specify-sdks
bun install
cd ../advertiser-sdk-examples/nextjs-typescript
bun install
bun run sdk:build
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Used by |
| --- | --- |
| `NEXT_PUBLIC_SPECIFY_ADVERTISER_KEY` | Browser SDK and Server Action; public and embedded at build time. |

Missing keys produce `null` SDK results.
Development keys validate calls without persisting events or identities.

```sh
bun run types
bun run build
bun run start
```

Open [localhost:3001](http://localhost:3001). For development, use `bun run dev`
instead of `build` and `start`. After changing the SDK, run `bun run sdk:build`
again and restart development, or rebuild and restart production. Rebuild after
changing public variables or the customer ID; the page is prerendered with that ID.

## Browser capture

[browser-capture.tsx](app/browser-capture.tsx) owns one SDK instance for its active
mount. Customer ID changes call `identify()` on that same instance.
The [consent control](demo/cookie-consent.tsx) owns consent state and setup,
passing the initial choice and `onConsent`/`onChange` updates to the SDK's
`setCookieConsent`. Cleanup pauses unsent requests and resets the consent UI
without deleting its saved choice.
Already dispatched requests may finish. There is no SDK destroy method.
Event capture can run before the consent UI finishes initializing; the SDK
buffers events until consent is granted.

The essential calls are:

```ts
import Specify from "@specify-sh/advertiser-sdk";

const specify = new Specify({
  advertiserKey: process.env.NEXT_PUBLIC_SPECIFY_ADVERTISER_KEY ?? "",
});
void specify.identify(customerId);
specify.setCookieConsent(consentManagerAllowsAnalytics);
// In the capture button's handler:
const status = await specify.capture("product_view");
```

The current SDK starts with consent false. Identification remembers the customer
locally, and captures before consent return `null` immediately and buffer a
snapshot in instance memory. Granting consent sends the pending identification
first, then buffered captures in order. Withdrawal pauses unsent work. Reloading
or discarding the instance loses its buffer. The original buffered result stays
`null`; it does not become a delivery receipt later.

Browser capture uses the complete current page URL and the customer ID. A Client
Component can also render on the server, so SDK calls belong in effects and event
handlers, never in its render function. Rendering, SSR, prerendering, and builds
send no SDK requests.

## Server purchase

[actions.ts](app/actions.ts) exports a `"use server"` action. The
[purchase form](demo/purchase-form.tsx) uses `useActionState` for pending/results.
The action generates a receipt; no payment or durable order is created.

```ts
import Specify from "@specify-sh/advertiser-sdk";

const customerId = getCustomerId();
const purchaseId = crypto.randomUUID();
const specify = new Specify({
  advertiserKey: process.env.NEXT_PUBLIC_SPECIFY_ADVERTISER_KEY ?? "",
});
const status = await specify.capture("purchase", customerId);
```

Tracking runs after receipt creation, and tracking failure still returns the
completed purchase because the SDK contains errors and returns `null`.
The action constructs its own SDK instance. It passes identity explicitly,
forwards no browser cookies, and supplies no event URL. Server calls require no
cookie-consent setter. Calling `identify()` on a browser or server does not select
the identity for a later server capture.

The placeholder ID `customer_123` comes from `getCustomerId()` in
[customer.ts](demo/customer.ts) on the server; the page passes it to the browser.

## Results

The SDK returns `Promise<number | null>`. This example labels only `200` as
accepted and displays other numeric statuses as returned, including `204`.
`400` means invalid input, `401` an invalid key, `403` missing browser consent,
`429` a rate limit, and `503` an unavailable service. `null` can mean buffering,
local rejection, missing configuration, a network failure, or no response.
Neither an HTTP status nor `null` by itself proves whether an event was stored.
The SDK attempts each request once and does not provide durable retries.

See the [SDK documentation](../../specify-sdks/packages/advertiser-sdk/README.md)
for the complete contract, and Next.js's official guides for
[installation](https://nextjs.org/docs/app/getting-started/installation),
[Server Action forms](https://nextjs.org/docs/app/guides/forms), and
[environment variables](https://nextjs.org/docs/app/guides/environment-variables).
