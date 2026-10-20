import { initAccount } from "./account";
import { initConsent, showConsentPreferences } from "./consent";
import { preferencesButton, signupButton } from "./elements";
import { signUp } from "./signup";
import "./index.css";

preferencesButton.addEventListener("click", () => showConsentPreferences());
signupButton.addEventListener("click", () => void signUp());

void initConsent();
void initAccount();
