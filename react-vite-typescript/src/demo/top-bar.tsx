import { ConnectKitButton } from "connectkit";

export function TopBar() {
  return (
    <header className="bg-gray-800 p-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Specify Advertiser SDK Demo</h1>
        <ConnectKitButton />
      </div>
    </header>
  );
}
