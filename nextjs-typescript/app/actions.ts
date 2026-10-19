"use server";

import { capture, ValidationError } from "@specify-sh/advertiser-sdk/server";
import { getCustomerId } from "../demo/customer";

export type PurchaseResult = {
  purchaseId: string;
  trackingError?: string;
};

export async function completePurchase(
  _previous: PurchaseResult | null,
): Promise<PurchaseResult> {
  const customerId = getCustomerId();
  const purchaseId = crypto.randomUUID();

  try {
    await capture({
      advertiserKey: process.env.NEXT_PUBLIC_SPECIFY_ADVERTISER_KEY ?? "",
      event: "purchase",
      identity: customerId,
      dedupeKey: purchaseId,
    });
  } catch (error) {
    if (!(error instanceof ValidationError)) throw error;
    return { purchaseId, trackingError: error.message };
  }

  return { purchaseId };
}
