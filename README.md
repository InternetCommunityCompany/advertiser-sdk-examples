# advertiser-sdk-examples

Working examples of the [Specify advertiser SDK](https://www.npmjs.com/package/@specify-sh/advertiser-sdk). Each one is a guide from [docs.specify.sh](https://docs.specify.sh/advertising/track-conversions) as a running app.

| Example | Guide | What it shows |
| --- | --- | --- |
| [react-vite-typescript](react-vite-typescript) | [React](https://docs.specify.sh/advertising/react) | Consent, wallet identity and a browser conversion |
| [nextjs-typescript](nextjs-typescript) | [Next.js](https://docs.specify.sh/advertising/nextjs) | Consent and identity from the root layout, a browser conversion, and a server conversion from a Server Action |
| [nodejs-typescript](nodejs-typescript) | [Server events](https://docs.specify.sh/advertising/server) | A server conversion with a dedupe key, and handling `ValidationError` |

All three install `@specify-sh/advertiser-sdk@latest`. The lockfiles record the installed version; refresh them after each SDK release.

## Run the React example

```sh
cd react-vite-typescript
bun install
cp .env.example .env.local
```

Set `VITE_SPECIFY_ADVERTISER_KEY` to an advertiser key from your Specify dashboard, then run `bun run dev` and open the URL Vite prints. Browser wallets work as they are; set the optional `VITE_WALLETCONNECT_PROJECT_ID` to add WalletConnect.

The integration is three small files:

- [lib/specify.ts](react-vite-typescript/src/lib/specify.ts) creates one client for the whole app.
- [components/consent-bridge.tsx](react-vite-typescript/src/components/consent-bridge.tsx) passes the visitor's consent on every page load and whenever it changes.
- [components/identity-bridge.tsx](react-vite-typescript/src/components/identity-bridge.tsx) identifies the connected wallet and calls `reset()` when it disconnects.

[App.tsx](react-vite-typescript/src/App.tsx) captures a `signup` event. Everything in `src/demo` is scaffolding: the wallet providers, the cookie banner and the layout.

## Check it works

Use a development key. Answer the cookie banner, then capture an event: in your browser's network panel, requests to `spfsrv.com/v1/identify` and `spfsrv.com/v1/events` return `200`. Development keys never record anything.

Events wait until the visitor answers the banner. If they refuse, events are still sent, without Specify's cookie.
