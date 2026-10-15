import type Specify from "@specify-sh/advertiser-sdk";
import { useEffect, useState } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

export function CookieConsentControl({ client }: { client: Specify }) {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      const granted = CookieConsent.acceptedCategory("analytics");
      setConsent(granted);
      client.setCookieConsent(granted);
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
                "With your consent, Specify sends remembered wallet addresses and the current page URL and can set an identity cookie.",
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
      client.setCookieConsent(false);
      CookieConsent.reset();
    };
  }, [client]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${
          consent
            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
            : "border-amber-400/20 bg-amber-400/10 text-amber-300"
        }`}
      >
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-current" />
        {consent ? "Consent granted" : "Consent not granted"}
      </span>
      <button
        type="button"
        className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
        onClick={() => CookieConsent.showPreferences()}
      >
        Cookie preferences
      </button>
    </div>
  );
}
