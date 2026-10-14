import Specify from "@specify-sh/advertiser-sdk";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { CookieConsentControl } from "./demo/cookie-consent";
import { Layout } from "./demo/layout";

export default function App() {
  const { address, isConnected } = useAccount();
  const [specify] = useState(
    () =>
      new Specify({
        advertiserKey: import.meta.env.VITE_SPECIFY_ADVERTISER_KEY ?? "",
      })
  );
  const [isCapturing, setIsCapturing] = useState(false);
  const [result, setResult] = useState<number | null>();

  useEffect(() => {
    if (isConnected && address) {
      void specify.identify(address);
    }
  }, [address, isConnected, specify]);

  async function handleOnClick() {
    setIsCapturing(true);
    setResult(undefined);
    try {
      setResult(await specify.capture("example_event"));
    } finally {
      setIsCapturing(false);
    }
  }

  return (
    <Layout>
      <CookieConsentControl client={specify} />
      <div className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Try an event capture</h3>
            <p className="mt-1 font-mono text-xs text-gray-400">
              example_event
            </p>
          </div>
          <button
            type="button"
            onClick={handleOnClick}
            disabled={isCapturing}
            aria-busy={isCapturing}
            className="inline-flex min-w-48 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 disabled:cursor-wait disabled:bg-blue-600/60"
          >
            {isCapturing && (
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none"
              />
            )}
            {isCapturing ? "Capturing…" : "Capture example event"}
          </button>
        </div>
        <div
          role="status"
          aria-live="polite"
          className="mt-4 border-t border-gray-700/60 pt-4 text-sm"
        >
          {isCapturing ? (
            <p className="text-gray-300">Waiting for the SDK response…</p>
          ) : result === undefined ? (
            <p className="text-gray-400">
              Capture an event to check your integration.
            </p>
          ) : result === 200 ? (
            <p className="font-medium text-emerald-300">Event accepted.</p>
          ) : result === null ? (
            <p className="text-gray-300">
              No HTTP response. Before consent, events are buffered until you
              grant it.
            </p>
          ) : (
            <p className="text-rose-300">Capture returned HTTP {result}.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
