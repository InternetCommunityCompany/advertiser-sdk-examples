import { configureConsent } from "./demo/consent";

export function initConsent(): Promise<void> {
  return configureConsent((accepted) => {
    window.dataLayer.push({
      event: "specify_consent",
      specify_cookie_consent: accepted,
    });
  });
}
