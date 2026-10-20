import Specify from "@specify-sh/advertiser-sdk";

const advertiserKey = import.meta.env.VITE_SPECIFY_ADVERTISER_KEY;

if (!advertiserKey) {
  throw new Error("VITE_SPECIFY_ADVERTISER_KEY is not set");
}

export const specify = new Specify({ advertiserKey });
