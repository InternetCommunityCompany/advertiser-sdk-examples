import { health } from "@specify-sh/advertiser-sdk";
import { useAccount } from "wagmi";

export function Advertiser() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800 to-gray-900 p-8 shadow-2xl">
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
        <p className="font-medium">SDK health: {String(health())}</p>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          This checks that the advertiser SDK loads locally. Tracking and
          identification are not implemented yet, and no wallet address is sent
          to Specify.
        </p>
      </div>
    </section>
  );
}
