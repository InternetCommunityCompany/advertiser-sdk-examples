import { useEffect, useState } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

export function CookieConsentControl({
  onConsentChange,
}: {
  onConsentChange: (granted: boolean) => void;
}) {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      const granted = CookieConsent.acceptedCategory("analytics");
      setConsent(granted);
      onConsentChange(granted);
    };

    void CookieConsent.run({
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {},
      },
      onConsent: syncConsent,
      onChange: syncConsent,
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "Allow Specify event capture?",
              description:
                "With your consent, capturing an event sends remembered wallet addresses and the current page URL to Specify and allows an identity cookie.",
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
                  title: "Specify event capture",
                  description:
                    "Allows event capture with remembered wallets, the current URL, and a Specify identity cookie. You can withdraw consent at any time.",
                  linkedCategory: "analytics",
                },
              ],
            },
          },
        },
      },
    });

    return () => {
      onConsentChange(false);
      CookieConsent.reset();
    };
  }, [onConsentChange]);

  return (
    <div>
      <p className="mb-4">
        Capture consent: {consent ? "granted" : "refused"}
      </p>
      <button
        type="button"
        className="rounded-lg border border-gray-600 px-4 py-2 hover:bg-gray-700"
        onClick={() => CookieConsent.showPreferences()}
      >
        Cookie preferences
      </button>
    </div>
  );
}
