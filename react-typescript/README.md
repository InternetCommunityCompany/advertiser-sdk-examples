# React example

An advertiser integration for React, capturing conversions with the browser client from [`@specify-sh/advertiser-sdk`](https://docs.specify.sh/advertising/react). Built with Vite and TypeScript, wallets via [wagmi](https://wagmi.sh), consent via [react-cookie-manager](https://www.npmjs.com/package/react-cookie-manager), styled with Tailwind.

For a framework-free version of the same integration, see [`vanilla-typescript`](../vanilla-typescript).

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

Open the printed URL, answer the consent banner, connect a wallet, and click **Sign up**. In your browser's network panel, requests to `spfsrv.com/v1/identify` and `spfsrv.com/v1/events` return `200`. Development keys never record anything, so test with one.

## Layout

| File | Role |
| --- | --- |
| `src/main.tsx` | Mounts the app inside the wagmi, React Query, and consent providers |
| `src/app.tsx` | Page layout |
| `src/specify.ts` | The `Specify` client singleton |
| `src/consent.tsx` | The consent bridge and the preferences button |
| `src/wagmi.ts` | wagmi config |
| `src/wallet.tsx` | `WalletBridge` and the connect button |
| `src/signup.tsx` | The sign-up button, which captures a `signup` event |

## What it shows

**The client** (`src/specify.ts`) — one `Specify` instance built from `VITE_SPECIFY_ADVERTISER_KEY`, created outside any component and imported wherever it's needed. The visitor's consent and identity live on that instance, so a client rebuilt per render would lose them. Vite inlines `VITE_`-prefixed variables into the bundle; advertiser keys are public by design, so this is expected.

**Consent** (`src/consent.tsx`) — [react-cookie-manager](https://www.npmjs.com/package/react-cookie-manager) provides the banner and preferences modal. `CookieManager` wraps the app in `src/main.tsx`, and only its `Advertising` category is shown, since that is the one Specify's cookie falls under.

`ConsentBridge` watches `detailedConsent` from `useCookieConsent()` and passes `Advertising.consented` to `setCookieConsent()`. Reacting to the value rather than to accept and decline callbacks is what makes returning visitors work: the library restores the stored decision on mount, so the bridge passes it again on every page load, which the SDK needs because it never stores consent itself.

Consent decides only whether Specify's cookie is used. The bridge passes nothing until the visitor answers, because `false` counts as a refusal.

**Identity** (`src/wagmi.ts`, `src/wallet.tsx`) — wagmi's `injected()` connector, with `WalletBridge` calling `specify.identify(address)` whenever wagmi reports a connected wallet, including when it reconnects on a later page load. Disconnecting calls `reset()`, which this example treats as signing out. On a site with accounts, also identify the signed-in user with your own user ID, the same one your server passes to `capture()`, and call `reset()` from your sign-out handler.

`WalletBridge` renders `null`. It exists to wire wagmi's state into the SDK, not to draw anything.

**Capturing a conversion** (`src/signup.tsx`) — the button stands in for your sign-up flow and calls `capture("signup")`. Capture once the action has succeeded, so a failed sign-up never counts. If your server confirms the conversion, capture it there instead; [`node-typescript`](../node-typescript) shows how.
