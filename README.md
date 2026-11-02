# Specify Advertiser SDK examples

Runnable advertiser integrations for [`@specify-sh/advertiser-sdk`](https://docs.specify.sh/advertising/track-conversions).

## Examples

| Example | Runtime | What it demonstrates |
| --- | --- | --- |
| [`nextjs-typescript`](nextjs-typescript) | Next.js App Router | Identity and consent from the root layout, a browser conversion, and a server conversion from a Server Action, with shadcn/ui |
| [`react-typescript`](react-typescript) | Browser via Vite | CMP consent bridge, wallet identity via wagmi, and a browser conversion |
| [`vanilla-typescript`](vanilla-typescript) | Browser via Vite | Framework-free browser entry point, CMP consent bridge, wallets via EIP-1193, and a browser conversion |
| [`gtm-typescript`](gtm-typescript) | Browser via Vite | GTM data-layer consent, wallet identity, conversion, and reset; GTM loads the SDK |
| [`node-typescript`](node-typescript) | Node.js via Bun | Server entry point: a conversion with a dedupe key |
