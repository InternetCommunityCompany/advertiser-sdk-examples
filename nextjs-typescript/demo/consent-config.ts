import type { CookieConsentConfig } from "vanilla-cookieconsent";

export const consentConfig: CookieConsentConfig = {
  categories: {
    necessary: { enabled: true, readOnly: true },
    analytics: {},
  },
  language: {
    default: "en",
    translations: {
      en: {
        consentModal: {
          title: "Allow Specify event capture?",
          description:
            "With your consent, the browser sends your customer ID and current page URL. Specify can also set an identity cookie. Purchases are tracked separately on the server.",
          acceptAllBtn: "Allow capture",
          acceptNecessaryBtn: "Refuse capture",
          showPreferencesBtn: "Cookie preferences",
        },
        preferencesModal: {
          title: "Cookie preferences",
          acceptAllBtn: "Allow capture",
          acceptNecessaryBtn: "Refuse capture",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close preferences",
          sections: [
            {
              title: "Consent preferences",
              description: "Remembers your cookie choices.",
              linkedCategory: "necessary",
            },
            {
              title: "Specify browser event capture",
              description:
                "Allows browser event capture with your customer ID, current URL, and a Specify identity cookie. You can withdraw consent at any time.",
              linkedCategory: "analytics",
            },
          ],
        },
      },
    },
  },
};
