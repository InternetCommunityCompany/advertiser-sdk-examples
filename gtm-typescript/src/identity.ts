import { initWallet } from "./demo/wallet";

export function initIdentity(): Promise<void> {
  let previousWallets = "";

  return initWallet((accounts) => {
    const wallets = accounts.join(",");

    // Wallet lists accumulate in Specify; forget the old visitor on a switch.
    if (previousWallets && previousWallets !== wallets) {
      window.dataLayer.push({ event: "specify_reset" });
    }

    if (accounts.length > 0) {
      window.dataLayer.push({
        event: "specify_identify",
        specify_identity: accounts,
      });
    }

    previousWallets = wallets;
  });
}
