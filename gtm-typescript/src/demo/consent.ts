import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

const ADS_CATEGORY = "ads";

export function configureConsent(
  onDecision: (accepted: boolean) => void,
): Promise<void> {
  function applyConsent(): void {
    onDecision(CookieConsent.acceptedCategory(ADS_CATEGORY));
  }

  return CookieConsent.run({
    guiOptions: {
      consentModal: {
        layout: "box inline",
        position: "bottom left",
        equalWeightButtons: false,
      },
      preferencesModal: { equalWeightButtons: false },
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
      [ADS_CATEGORY]: {},
    },
    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: "Cookies",
            description:
              "We use a cookie to measure which ads bring people here.",
            acceptAllBtn: "Accept",
            acceptNecessaryBtn: "Decline",
            showPreferencesBtn: "Manage Cookies",
          },
          preferencesModal: {
            title: "Cookie Preferences",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            savePreferencesBtn: "Save Preferences",
            closeIconLabel: "Close",
            sections: [
              {
                description:
                  "Manage your cookie preferences below. Essential cookies are always enabled as they are necessary for the website to function properly.",
              },
              {
                title: "Essential",
                description: "Required for the site to work.",
                linkedCategory: "necessary",
              },
              {
                title: "Advertising",
                description:
                  "Lets Specify set a cookie that connects your visit to the ad that brought you here.",
                linkedCategory: ADS_CATEGORY,
              },
            ],
          },
        },
      },
    },
    onConsent: applyConsent,
    onChange: applyConsent,
  });
}

export const showConsentPreferences = CookieConsent.showPreferences;
