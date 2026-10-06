import type { CaptureResult } from "@specify-sh/advertiser-sdk";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { CookieConsentControl } from "./demo/cookie-consent";
import { Layout } from "./demo/layout";
import { specify } from "./specify";

export default function App() {
  const { address, isConnected } = useAccount();

  const [isCapturing, setIsCapturing] = useState(false);
  const [result, setResult] = useState<CaptureResult | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      specify.identify(address);
    }
  }, [address, isConnected]);

  async function handleOnClick() {
    setIsCapturing(true);
    setResult(null);
    try {
      setResult(await specify.capture("example_event"));
    } finally {
      setIsCapturing(false);
    }
  }

  return (
    <Layout>
      <CookieConsentControl />

      <div className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Try an event capture</h3>
            <p className="mt-1 font-mono text-xs text-gray-400">example_event</p>
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
            <p className="text-gray-300">Waiting for capture confirmation…</p>
          ) : result ? (
            <div className={result.success ? "text-emerald-300" : "text-rose-300"}>
              <p className="flex items-center gap-2 font-medium">
                <span aria-hidden="true">{result.success ? "✓" : "!"}</span>
                {result.success ? "Capture confirmed" : "Capture unsuccessful"}
              </p>
              {!result.success && (
                <>
                  <p className="mt-1 break-words text-gray-300">{result.error}</p>
                  {result.details?.map((detail) => (
                    <p key={detail.field} className="mt-1 break-words text-gray-400">
                      {detail.field}: {detail.message}
                    </p>
                  ))}
                </>
              )}
            </div>
          ) : (
            <p className="text-gray-400">
              Capture an event to check your integration.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
