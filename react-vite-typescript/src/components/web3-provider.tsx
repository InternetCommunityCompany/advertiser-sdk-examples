import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { useState, type ReactNode } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export function Web3Provider({ children }: { children: ReactNode }) {
  const [config] = useState(() => {
    const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID?.trim();
    const options = {
      chains: [mainnet] as const,
      transports: { [mainnet.id]: http() },
      // Keep wallet addresses out of persistent browser storage.
      storage: null,
    };

    return createConfig(
      projectId
        ? getDefaultConfig({
            ...options,
            appName: "Specify Advertiser SDK React-Vite Demo",
            walletConnectProjectId: projectId,
          })
        : { ...options, connectors: [injected()] },
    );
  });
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider mode="dark">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
