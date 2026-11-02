import { initConsent } from "./consent";
import { initIdentity } from "./identity";
import { showConsentPreferences } from "./demo/consent";
import { preferencesButton } from "./demo/elements";
import { initSignup } from "./demo/signup";
import { signUp } from "./signup";
import "./index.css";

preferencesButton.addEventListener("click", () => showConsentPreferences());
initSignup(signUp);
void initConsent();
void initIdentity();
