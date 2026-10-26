import { signupButton, statusLabel } from "./elements";

// Replace this stand-in with your own sign-up request.
export function createAccount(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 300));
}

export function initSignup(signUp: () => Promise<void>): void {
  signupButton.addEventListener("click", async () => {
    signupButton.disabled = true;
    statusLabel.textContent = "Signing up…";

    try {
      await signUp();
      statusLabel.textContent = "Signed up. Signup event queued for GTM.";
    } catch {
      statusLabel.textContent = "Sign-up failed. No conversion was queued.";
    } finally {
      signupButton.disabled = false;
    }
  });
}
