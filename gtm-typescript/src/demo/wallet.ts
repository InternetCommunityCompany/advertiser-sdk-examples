import { accountLabel, connectButton, statusLabel } from "./elements";

interface Eip1193Provider {
  request(args: { method: string }): Promise<unknown>;
  on(event: "accountsChanged", listener: (accounts: string[]) => void): void;
}

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

export async function initWallet(
  onAccounts: (accounts: string[]) => void,
): Promise<void> {
  const provider = window.ethereum;

  if (!provider) {
    connectButton.disabled = true;
    accountLabel.textContent = "No EVM wallet detected in this browser.";
    return;
  }

  let connected = false;

  function update(accounts: string[]): void {
    connected = accounts.length > 0;
    connectButton.textContent = connected ? "Disconnect" : "Connect wallet";
    accountLabel.textContent = connected
      ? accounts.join(", ")
      : "No wallet connected.";
    onAccounts(accounts);
  }

  try {
    update((await provider.request({ method: "eth_accounts" })) as string[]);
  } catch {
    accountLabel.textContent =
      "Could not read wallet accounts. Try connecting.";
  }

  provider.on("accountsChanged", update);

  connectButton.addEventListener("click", async () => {
    if (connected) {
      update([]);
      return;
    }

    connectButton.disabled = true;
    statusLabel.textContent = "Connecting…";

    try {
      update(
        (await provider.request({ method: "eth_requestAccounts" })) as string[],
      );
      statusLabel.textContent = "";
    } catch {
      statusLabel.textContent = "Could not connect. Try again in your wallet.";
    } finally {
      connectButton.disabled = false;
    }
  });
}
