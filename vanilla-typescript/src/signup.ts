import { signupButton, statusLabel } from "./elements";
import { specify } from "./specify";

// Replace this stand-in with your own sign-up request.
function createAccount(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 300));
}

export async function signUp(): Promise<void> {
  signupButton.disabled = true;
  statusLabel.textContent = "Signing up…";

  await createAccount();
  // Only after the sign-up succeeded, so a failed attempt is never counted.
  specify.capture("signup");

  statusLabel.textContent = "Signed up, and captured a signup event.";
  signupButton.disabled = false;
}
