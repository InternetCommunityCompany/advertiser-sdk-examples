"use server";

import Specify from "@specify-sh/advertiser-sdk";
import { getCustomerId } from "../demo/customer";

export type PurchaseResult = {
  purchaseId: string;
  trackingStatus: number | null;
};

export async function completePurchase(
  _previous: PurchaseResult | null,
): Promise<PurchaseResult> {
  const customerId = getCustomerId();
  const purchaseId = crypto.randomUUID();

  const specify = new Specify({
    advertiserKey: process.env.NEXT_PUBLIC_SPECIFY_ADVERTISER_KEY ?? "",
  });
  const trackingStatus = await specify.capture("purchase", customerId);

  return { purchaseId, trackingStatus };
}
