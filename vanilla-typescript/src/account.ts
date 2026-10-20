import { accountLabel, connectButton, statusLabel } from "./elements";
import { specify } from "./specify";
import { connect, getAccounts, getProvider, onAccountsChanged } from "./wallet";

let connected = false;

function register(accounts: `0x${string}`[]): void {
  connectButton.disabled = accounts.length > 0;

  if (accounts.length === 0) {
    accountLabel.textContent = "No wallet connected.";
    // On a page load with no wallet there is nobody to forget, and reset()
    // would drop what the SDK already knew, such as the ad the visitor came from.
    if (connected) {
      specify.reset();
    }
    connected = false;
    return;
  }

  connected = true;
  specify.identify(accounts);
  accountLabel.textContent = accounts.join(", ");
}

export async function initAccount(): Promise<void> {
  if (!getProvider()) {
    connectButton.disabled = true;
    accountLabel.textContent = "No EVM wallet detected in this browser.";
    return;
  }

  register(await getAccounts());
  onAccountsChanged(register);

  connectButton.addEventListener("click", async () => {
    connectButton.disabled = true;
    statusLabel.textContent = "Connecting…";

    try {
      register(await connect());
      statusLabel.textContent = "";
    } catch (error) {
      connectButton.disabled = false;
      statusLabel.textContent =
        error instanceof Error ? error.message : "Could not connect.";
    }
  });
}
