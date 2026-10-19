import { useEffect } from "react";
import { useAccount, useAccountEffect } from "wagmi";
import { specify } from "../lib/specify";

export function IdentityBridge() {
  const { address } = useAccount();

  useEffect(() => {
    if (address) specify.identify(address);
  }, [address]);

  useAccountEffect({ onDisconnect: () => specify.reset() });

  return null;
}
