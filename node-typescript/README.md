# Node.js + TypeScript

The [server events guide](https://docs.specify.sh/advertising/server) as a working Node.js command: it completes a purchase for a customer, then captures a `purchase` event.

## Run it

Requires Node.js 22+ and Bun.

```sh
cd nodejs-typescript
bun install
cp .env.example .env.local
```

Set `SPECIFY_ADVERTISER_KEY` in `.env.local`, then build and run:

```sh
bun run build
bun run start
```

`start` uses the customer ID `customer_123`. Pass your own as an argument:

```sh
node --env-file=.env.local dist/index.js customer_456
```

## The integration

In [src/index.ts](src/index.ts), the purchase object stands in for your checkout. Once the purchase succeeds, it captures the event:

```ts
await capture({
  advertiserKey: process.env.SPECIFY_ADVERTISER_KEY ?? "",
  event: "purchase",
  identity: customerId,
  dedupeKey: purchase.id,
});
```

- `identity` is the same user ID your site passes to `identify()` in the browser. A server event only counts for a user your site has identified.
- `dedupeKey` is the purchase ID, so a retry of the same purchase counts once.
- `capture()` throws `ValidationError` before sending anything when an option is invalid, such as a missing key or an email address as the identity. The example logs the reason and still returns the completed purchase. It never throws because Specify is unreachable.
