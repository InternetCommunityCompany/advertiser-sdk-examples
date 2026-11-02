import { createAccount } from "./demo/signup";

export async function signUp(): Promise<void> {
  await createAccount();

  window.dataLayer.push({
    event: "specify_capture",
    specify_event_name: "signup",
  });
}
