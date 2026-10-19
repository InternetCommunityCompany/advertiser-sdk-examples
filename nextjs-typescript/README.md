# Next.js + TypeScript

The [Next.js guide](https://docs.specify.sh/advertising/nextjs) as a working App Router app: a sign-up captured in the browser, and a purchase captured on the server.

## Where to read

- [lib/specify.ts](lib/specify.ts) creates the browser client that Client Components share.
- [components/specify-bridge.tsx](components/specify-bridge.tsx) passes the visitor's consent and identifies the customer. The [root layout](app/layout.tsx) renders it on every page.
- [app/browser-capture.tsx](app/browser-capture.tsx) captures a `signup` event in the browser.
- [app/actions.ts](app/actions.ts) completes a purchase in a Server Action, then captures it with the server entry, using the receipt ID as the `dedupeKey`.

Everything in `demo/` is scaffolding: the cookie banner, the customer lookup, the layout and the purchase form. The customer ID is a placeholder, `customer_123`, which the server passes to both the browser and the Server Action.

## Run it

Requires Node.js 20.9+ and Bun.

```sh
cd nextjs-typescript
bun install
cp .env.example .env.local
```

Set `NEXT_PUBLIC_SPECIFY_ADVERTISER_KEY` in `.env.local`. Advertiser keys are public, and the Server Action reads the same variable. Then run `bun run dev` and open [localhost:3001](http://localhost:3001).

## What to expect

- Browser events wait until you answer the cookie banner. If you refuse, they're still sent, without Specify's cookie.
- With a development key, requests to `spfsrv.com/v1/identify` and `spfsrv.com/v1/events` return `200` in your browser's network panel. Development keys never record anything.
- If the key is missing or invalid, the purchase still completes and shows why it wasn't sent to Specify. The server entry throws `ValidationError` for invalid input, and never fails because Specify is unreachable.
