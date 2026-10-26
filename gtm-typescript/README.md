# Google Tag Manager example

A framework-free advertiser integration using Google Tag Manager (GTM). Built with Vite and TypeScript, styled like the other browser examples with Tailwind.

Your app sends consent, identity, conversions, and logout events to `window.dataLayer`. GTM forwards them through the Specify Advertiser template and loads the browser SDK. This example does not install or import `@specify-sh/advertiser-sdk`.

## Run the example

Create a GTM **Web** container, then copy the environment template:

```sh
cp .env.example .env.local
```

Set `VITE_GTM_CONTAINER_ID` to your container ID, such as `GTM-ABC1234`. The advertiser key goes in GTM, not in this file.

```sh
bun install
bun dev
```

Open the printed local URL and connect GTM Preview to test unpublished container changes.

## Configure GTM

Follow the [Google Tag Manager guide](https://docs.specify.sh/advertising/google-tag-manager) to import the Specify Advertiser template and configure your variables, triggers, and tags. The guide covers configuration options, consent, identity, and conversion tracking.

## Integration code

Start with these files. They contain the Specify-specific data-layer events you would add to your own app:

| File | What to integrate |
| --- | --- |
| `index.html` | Standard GTM installation snippets, with the container ID supplied by Vite |
| `src/consent.ts` | Send a boolean consent decision from your CMP |
| `src/identity.ts` | Identify connected wallets; reset when they disconnect or change |
| `src/signup.ts` | Capture `signup` only after account creation succeeds |

## Boilerplate

Everything in `src/demo/` supports the sample app. It contains no Specify integration code and is not required to integrate Specify into your own app.

`src/main.ts` connects that demo functionality to the integration files above, and `src/index.css` provides the styling.
