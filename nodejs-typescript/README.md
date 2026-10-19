# Node.js + TypeScript advertiser SDK example

A small ESM command that completes a purchase for an explicit customer ID, then
captures a `purchase` event. Bun installs dependencies and runs build commands;
Node.js executes the compiled JavaScript. Use Node.js 22 or newer and Bun.

## Setup and run

This example installs `@specify-sh/advertiser-sdk@latest` from npm.

```sh
cd nodejs-typescript
bun install
cp .env.example .env.local
```

Set the empty `SPECIFY_ADVERTISER_KEY` value in `.env.local` to your organization's
advertiser key. `.env.local` is ignored by Git. Node's
[`--env-file`](https://nodejs.org/api/cli.html#--env-filefile) loads it; an existing
shell environment variable takes precedence.

```sh
bun run types
bun run build
bun run start
```

`start` runs `node --env-file=.env.local dist/index.js`, using `customer_123`.
Supply your application's customer ID as the first argument:

```sh
node --env-file=.env.local dist/index.js customer_456
```

## The SDK integration

In [src/index.ts](src/index.ts), the purchase object and console output stand in
for your existing checkout code. The SDK portion is the import, environment
lookup, and these two lines after the business operation succeeds:

```ts
const specify = new Specify({ advertiserKey });
const status = await specify.capture("purchase", customerId);
```

Pass the customer ID belonging to the current operation on every server call.
The example keeps it in a function argument, with no shared current-user state.
Server calls need no cookie consent and send without cookie credentials.

Identification is optional and records no event. It does not select an identity
for subsequent server calls, so capture still requires its own customer ID:

```ts
await specify.identify(customerId);
await specify.capture("purchase", customerId);
```

To attach a URL, supply it explicitly:

```ts
await specify.capture("purchase", customerId, {
  url: "https://shop.example/orders/123",
});
```

Without that option, the request omits the URL and the service stores SQL `NULL`.
Node has no page URL to infer.

## Results and business failures

`capture` and `identify` resolve to a numeric HTTP status or `null`. The current
SDK passes through every received status, including `204`, without reading the
response body. Common results are:

| Result | Meaning |
| --- | --- |
| `200` | The service accepted the request. Development keys validate without persisting, so this alone does not prove storage. |
| `400` | The service rejected the request or identity. |
| `401` | The advertiser key was rejected. |
| `429` | The service rate limit was exceeded. |
| `503` | The service was unavailable or could not complete the request. |
| `null` | No HTTP status was returned: local rejection/no-op, network failure, or timeout. |

For example, a missing key or a server capture without identity returns `null`.
A lost response does not establish whether an event was stored. The SDK contains
tracking errors and attempts each request once; its current request timeout is
60 seconds when `AbortController` is available.

The purchase completes before tracking. This example logs the tracking result
and returns the completed purchase regardless of that result. Do not turn a
tracking status or `null` into a failed checkout or roll back the purchase.

See the [SDK README](https://www.npmjs.com/package/@specify-sh/advertiser-sdk) for the
full API. Internal verification and infrastructure tools belong in
`advertiser-sdk-playground`.
