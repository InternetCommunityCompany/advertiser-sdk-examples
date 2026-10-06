import type { ReactNode } from "react";
import { useAccount } from "wagmi";
import { TopBar } from "./top-bar";

export function Layout({ children }: { children: ReactNode }) {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <TopBar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="mx-auto max-w-3xl rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800 to-gray-900 p-5 shadow-2xl sm:p-8">
          <h2 className="text-2xl font-bold">
            {isConnected
              ? "Wallet connected"
              : isConnecting || isReconnecting
                ? "Connecting wallet…"
                : "Connect your wallet"}
          </h2>

          <p className="mt-3 text-gray-300">
            {isConnected
              ? "Your wallet is available to this example through wagmi."
              : "Use the wallet button above to connect a browser wallet."}
          </p>

          {isConnected && address && (
            <p className="mt-4 break-all rounded-lg bg-gray-900/50 p-4 font-mono text-sm text-gray-300">
              {address}
            </p>
          )}

          <div className="mt-6 border-t border-gray-700/50 pt-6">
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Connected wallets are remembered locally by the SDK, including account
              changes. Disconnecting does not clear them. Captures send remembered
              wallets and the current URL only while consent is granted.
            </p>

            <div className="mt-6 space-y-5">
              {children}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
