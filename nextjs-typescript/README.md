# Next.js example

An advertiser integration for the Next.js App Router, following the [Next.js guide](https://docs.specify.sh/advertising/nextjs): a sign-up captured in the browser with `@specify-sh/advertiser-sdk`, and a purchase captured from a Server Action with `@specify-sh/advertiser-sdk/server`. Scaffolded with `create-next-app` and [shadcn/ui](https://ui.shadcn.com), wallets via [wagmi](https://wagmi.sh), consent via [react-cookie-manager](https://www.npmjs.com/package/react-cookie-manager).

## How to use

Copy the environment template and set a development advertiser key:

```sh
cp .env.example .env.local
```

Install dependencies and start the dev server:

```sh
bun install
bun dev
```

Open the printed URL. **Sign up** captures a `signup` event in the browser, and **Complete purchase** captures a `purchase` event on the server.

To check it works, open your browser's network panel: requests to `spfsrv.com/v1/identify` and `spfsrv.com/v1/events` return `200`. The purchase is sent from the server, so it shows up in the message under its button instead. Development keys never record anything.

## Layout

| File | Role |
| --- | --- |
| `app/layout.tsx` | Wraps the app in `Providers` and renders both bridges on every page |
| `app/page.tsx` | Server Component holding the page; the interactive parts are client |
| `app/actions.ts` | Server Action that completes a purchase, then captures it |
| `components/providers.tsx` | wagmi, React Query, and consent providers |
| `components/consent-bridge.tsx` | Consent bridge and the preferences button |
| `components/identity-bridge.tsx` | Identifies the customer and any connected wallet, and the connect button |
| `components/signup-card.tsx` | Captures a `signup` event in the browser |
| `components/purchase-card.tsx` | Runs the Server Action and shows what it did |
| `lib/specify.ts` | The `Specify` client singleton |
| `lib/customer.ts` | Stand-in for your session lookup |
| `lib/wagmi.ts` | wagmi config |

## What it shows

**The browser client lives in Client Components** (`lib/specify.ts`) — it's created once and imported only from Client Components, and does nothing during a server render. Importing it from a Server Component fails the build with a message pointing to the server entry.

**The key is public** — `NEXT_PUBLIC_SPECIFY_ADVERTISER_KEY` is inlined into the client bundle by design. Advertiser keys are not secrets, and the Server Action reads the same variable.

**Identity and consent from the layout** (`app/layout.tsx`) — the root layout renders both bridges, so they run on every page, including the pages your ads link to. `IdentityBridge` identifies the signed-in customer with the same ID the Server Action passes to `capture()`, and adds any wallet wagmi reports. Use your own user ID, not an email address, and call `specify.reset()` when the customer signs out.

`ConsentBridge` passes the `Advertising` answer from react-cookie-manager to `setCookieConsent()`. The library restores the stored decision on mount, so the effect fires with it on every page load, not only when the visitor changes their mind. It waits for an answer: `detailedConsent` is `null` until the visitor has chosen, and `false` counts as a refusal. Consent decides only whether Specify's cookie is used.

**The server conversion** (`app/actions.ts`) — the Server Action completes the purchase first, then captures it with `capture()`, passing the customer ID as `identity` and the purchase ID as `dedupeKey`, so a retry of the same purchase counts once. A server event only counts for a customer your site has identified in the browser, which is what the layout's bridge does.

**`ValidationError`** — the server entry throws `ValidationError` for invalid input, such as a missing key, and never fails because Specify is unreachable. The Server Action catches it, still completes the purchase, and shows why the event wasn't sent. Tracking should never fail a purchase in your checkout either.
