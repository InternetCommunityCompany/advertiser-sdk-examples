# Vanilla JS example

A minimal, framework-free browser advertiser integration using the [`@specify-sh/advertiser-sdk`](https://docs.specify.sh/advertising/javascript) browser entry point. Built with Vite and TypeScript, styled with Tailwind.

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

Open the printed URL, answer the consent banner, connect an EVM wallet, and press **Sign up**. In your browser's network panel, requests to `spfsrv.com/v1/identify` and `spfsrv.com/v1/events` return `200`. Development keys never record anything, so nothing appears in your dashboard.

## Layout

| File | Role |
| --- | --- |
| `src/main.ts` | Entry point; wires the modules below together |
| `src/specify.ts` | The `Specify` client singleton |
| `src/consent.ts` | CMP setup and the consent bridge |
| `src/wallet.ts` | EIP-1193 browser wallet access |
| `src/account.ts` | Connect flow, and identifying the wallet with the SDK |
| `src/signup.ts` | Completing a sign-up and capturing it |
| `src/elements.ts` | Shared DOM references |

## What it shows

**Client singleton** (`src/specify.ts`) — one `Specify` instance built from `VITE_SPECIFY_ADVERTISER_KEY`, imported wherever it's needed. Vite inlines `VITE_`-prefixed variables into the bundle; the advertiser key is public by design, so this is expected. On your own site, load the client on every page, including the pages your ads link to.

**Consent** (`src/consent.ts`) — [vanilla-cookieconsent](https://cookieconsent.orestbida.com) as the consent management platform, with an `ads` category. Its `onConsent` and `onChange` callbacks both pass the current answer to `setCookieConsent()`. Both matter: the SDK never stores consent, so the CMP has to replay the stored choice on each page load, not just when the visitor changes it.

Consent decides only whether Specify's cookie is used.

Swap this module for your own CMP. Only the bridge into `setCookieConsent()` is Specify-specific.

**Wallets** (`src/wallet.ts`, `src/account.ts`) — addresses come from the browser wallet over EIP-1193 (`eth_requestAccounts`), with no wallet library needed. The connected accounts go to `identify()` when the wallet connects, and again on every page load while it stays connected.

When a connected wallet disconnects, `reset()` forgets the visitor. It runs only on that disconnect, not on a page load with no wallet: there is nobody to forget then, and it would drop what the SDK already knew, such as the ad the visitor came from.

**Capturing a conversion** (`src/signup.ts`) — `capture("signup")` runs once the sign-up has succeeded, so a failed attempt is never counted. Use short, stable event names such as `signup` or `purchase`; you agree with Specify which events count as conversions before your campaign launches. If your server is what confirms a conversion, such as a payment clearing, capture it there instead, as in [`node-typescript`](../node-typescript).

**Error handling** — there is nothing to catch. Every browser method returns nothing and never throws, so neither a Specify outage nor a malformed key can break your page. With a malformed key, the client simply sends nothing.
