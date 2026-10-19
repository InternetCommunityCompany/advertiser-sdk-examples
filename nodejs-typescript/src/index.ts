import { capture, ValidationError } from "@specify-sh/advertiser-sdk/server";

async function completePurchase(customerId: string) {
  // Replace this stand-in with your checkout's existing business operation.
  const purchase = { id: crypto.randomUUID(), customerId, status: "completed" };
  console.log("Purchase completed:", purchase);

  try {
    await capture({
      advertiserKey: process.env.SPECIFY_ADVERTISER_KEY ?? "",
      event: "purchase",
      identity: customerId,
      dedupeKey: purchase.id,
    });
    console.log("Sent to Specify");
  } catch (error) {
    if (!(error instanceof ValidationError)) throw error;
    console.error("Not sent to Specify:", error.message);
  }

  return purchase;
}

await completePurchase(process.argv[2] ?? "customer_123");
