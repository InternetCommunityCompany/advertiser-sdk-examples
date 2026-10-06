import Specify from "@specify-sh/advertiser-sdk";
import * as CookieConsent from "vanilla-cookieconsent";

export const specify = new Specify({
  getConsent: () =>
    CookieConsent.validConsent() && CookieConsent.acceptedCategory("analytics"),
  advertiserKey: import.meta.env.VITE_SPECIFY_ADVERTISER_KEY ?? "",
});
