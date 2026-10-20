import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

export function watchAdvertisingConsent(onAnswer: (granted: boolean) => void) {
  const answer = () => onAnswer(CookieConsent.acceptedCategory("advertising"));

  void CookieConsent.run({
    categories: {
      necessary: { enabled: true, readOnly: true },
      advertising: {},
    },
    onConsent: answer,
    onChange: answer,
    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: "Allow advertising cookies?",
            description:
              "With your consent, Specify can set a cookie to connect this visit to the ad that brought you here.",
            acceptAllBtn: "Allow",
            acceptNecessaryBtn: "Refuse",
            showPreferencesBtn: "Preferences",
          },
          preferencesModal: {
            title: "Cookie preferences",
            acceptAllBtn: "Allow all",
            acceptNecessaryBtn: "Refuse all",
            savePreferencesBtn: "Save preferences",
            closeIconLabel: "Close preferences",
            sections: [
              {
                title: "Necessary",
                description: "Remembers your cookie choices.",
                linkedCategory: "necessary",
              },
              {
                title: "Advertising",
                description:
                  "Lets Specify set a cookie to measure which ads lead to sign-ups. You can withdraw consent at any time.",
                linkedCategory: "advertising",
              },
            ],
          },
        },
      },
    },
  });

  return () => CookieConsent.reset();
}

export function showConsentPreferences() {
  CookieConsent.showPreferences();
}
