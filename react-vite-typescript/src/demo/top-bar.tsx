import { ConnectKitButton } from "connectkit";
import { showConsentPreferences } from "./consent";

export function TopBar() {
  return (
    <header className="bg-gray-800 p-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Specify Advertiser SDK Demo</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
            onClick={showConsentPreferences}
          >
            Cookie preferences
          </button>
          <ConnectKitButton />
        </div>
      </div>
    </header>
  );
}
