import Specify from "@specify-sh/advertiser-sdk";

export const specify = new Specify({
  advertiserKey: process.env.NEXT_PUBLIC_SPECIFY_ADVERTISER_KEY!,
});
