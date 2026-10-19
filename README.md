# advertiser-sdk-examples

TypeScript integrations of the advertiser SDK for React + Vite, Next.js, and Node.js. 

## Run the React + Vite example

All three examples use `@specify-sh/advertiser-sdk@latest` from npm. Lockfiles
record the installed version; refresh them and rerun checks after each SDK release.

```sh
cd react-vite-typescript
bun install
cp .env.example .env.local
```

Set `VITE_SPECIFY_ADVERTISER_KEY` to your organization's advertiser key, then run
`bun run dev` and open the URL printed by Vite. Injected browser wallets work
without further configuration. Set the optional `VITE_WALLETCONNECT_PROJECT_ID`
to enable WalletConnect QR/mobile connections.

Development keys validate requests without storing events or identities or
setting Specify identity cookies. Successful requests return HTTP `200`.

Vite variables are public browser configuration. Keep private service credentials
out of this app.

## Integration

[App.tsx](react-vite-typescript/src/App.tsx) creates one SDK instance per mounted
app and identifies the address supplied by wagmi when the connected account changes:

```ts
const specify = new Specify({ advertiserKey: yourAdvertiserKey });
await specify.identify(connectedAddress);
const status = await specify.capture("example_event");
```

[cookie-consent.tsx](react-vite-typescript/src/demo/cookie-consent.tsx) connects
[CookieConsent's callbacks](https://cookieconsent.orestbida.com/reference/configuration-reference.html)
to `specify.setCookieConsent(granted)` on initialization and whenever the saved
choice changes. Before consent, identification and events stay in instance memory;
granting consent sends them. Withdrawing consent pauses unsent requests.
Connected wallets accumulate; disconnecting does not clear them.

The SDK returns an HTTP status or `null`. This example displays `200` as accepted,
other statuses as returned, and explains that calls before consent are buffered.
See the [SDK documentation](https://www.npmjs.com/package/@specify-sh/advertiser-sdk) for
user IDs, identity reset, event overrides, and server usage.

The surrounding wallet providers and styling are demo scaffolding. The SDK uses
neither wagmi nor React itself.

## Check

```sh
cd react-vite-typescript
bun run build
```

## Next.js + TypeScript example

[nextjs-typescript](nextjs-typescript/README.md) demonstrates browser capture and
a server-side purchase with the App Router. Both flows use `customer_123` and
`NEXT_PUBLIC_SPECIFY_ADVERTISER_KEY`. It includes CookieConsent synchronization,
a Node.js Server Action, and setup and build instructions.

## Node.js + TypeScript example

[nodejs-typescript](nodejs-typescript/README.md) shows a server business operation
that captures a `purchase` event for an explicit customer ID. It uses the same
public default import and npm SDK dependency, builds TypeScript as ESM, and
runs the compiled example with Node.js. Its README includes setup, commands,
optional identification, explicit URLs, and tracking failure handling.
