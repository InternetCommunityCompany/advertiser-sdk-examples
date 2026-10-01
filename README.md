# advertiser-sdk-examples

One browser-only React + Vite + TypeScript example, based on the React example in
[specify-publisher-sdk-examples](https://github.com/InternetCommunityCompany/specify-publisher-sdk-examples).

## Setup

Use Bun, with these repositories next to each other:

```text
specify-sdks/
advertiser-sdk-examples/
  react-vite-typescript/
```

First run `bun install` in `specify-sdks`. Then, from this repository:

```sh
cd react-vite-typescript
bun run sdk:build
bun install
bun run dev
```

Open the URL printed by Vite. The page should display `SDK health: true`.
`health()` is a local import check; it makes no network requests and needs no edge server.

## Wallets and styling

The React example mirrors the publisher demo's wagmi v2, React Query, and
ConnectKit providers, wallet button in the header, and dark Tailwind layout.
Provider state belongs to the mounted app. React 18 matches ConnectKit's declared
peer dependencies.

Browser wallets work without environment variables. To enable WalletConnect
QR/mobile connections, copy `react-vite-typescript/.env.example` to
`react-vite-typescript/.env.local`, set `VITE_WALLETCONNECT_PROJECT_ID` to your
project ID from [WalletConnect](https://cloud.walletconnect.com), and restart Vite.
Vite environment variables are public browser configuration; do not put secrets
in them.

The connected address comes from wagmi and updates on account changes or
disconnect. Wagmi's persistent wallet storage is disabled. WalletConnect manages
its own connection session when enabled.

The advertiser SDK currently exports only `health()`. This example does not send
the wallet to Specify, identify visitors, or track conversions. Those flows need
the advertiser SDK's public API first; the publisher's `serve()` and ad rendering
do not apply here.

## Development loop

1. Edit `specify-sdks/packages/advertiser-sdk`.
2. Run `bun run sdk:build` inside `react-vite-typescript/`.
3. Reload the example page.

The local dependency links to the SDK package. Its public exports resolve to
compiled `dist` files, so SDK changes must be built before they reach the example.
The app imports `@specify-sh/advertiser-sdk`; it does not import SDK source files.

If Vite serves an older build, restart it with `bun run dev --force` and reload.

To check the example's types and production build, inside `react-vite-typescript/`:

```sh
bun run build
```

Run the SDK repository's checks there before finishing SDK changes:

```sh
bun run check
bun run types
bun run test
bun run build
```
