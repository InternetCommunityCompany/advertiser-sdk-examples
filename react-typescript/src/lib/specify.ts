import Specify from "@specify-sh/advertiser-sdk";

export const specify = new Specify({
  advertiserKey: import.meta.env.VITE_SPECIFY_ADVERTISER_KEY ?? "",
});
