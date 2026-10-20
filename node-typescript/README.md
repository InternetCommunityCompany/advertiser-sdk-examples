# Node.js + TypeScript example

A minimal advertiser integration using the [`@specify-sh/advertiser-sdk`](https://docs.specify.sh/advertising/server) server entry point. It completes a stand-in purchase, then captures it as a `purchase` event.

## How to use

Copy the environment template and set a development advertiser key and the customer's user ID:

```sh
cp .env.example .env
```

Install dependencies and run the example:

```sh
bun install
bun start
```

The script logs the completed purchase, then whether it was sent to Specify.

## What it shows

**The same user ID** (`index.ts`) — `identity` is the user ID your site passes to `identify()` in the browser. A server event only counts for a user your site has identified; wallet addresses are the exception and count on their own.

**Counting once** — `dedupeKey` is the purchase ID, so a retry of the same purchase counts once.

**Errors** — `capture()` throws `ValidationError` before sending anything when an option is invalid, such as a malformed key or an email address as the identity. The example logs why and keeps the completed purchase. It never throws because Specify is unreachable.
