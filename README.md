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
