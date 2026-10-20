import { capture, ValidationError } from "@specify-sh/advertiser-sdk/server";

const advertiserKey = process.env.SPECIFY_ADVERTISER_KEY;
const customerId = process.env.SPECIFY_CUSTOMER_ID;

if (!advertiserKey) {
  throw new Error("SPECIFY_ADVERTISER_KEY is not set");
}

if (!customerId) {
  throw new Error("SPECIFY_CUSTOMER_ID is not set");
}

// Replace this stand-in with your checkout's existing business operation.
const purchase = { id: crypto.randomUUID(), customerId, status: "completed" };
console.log("Purchase completed:", purchase);

try {
  await capture({
    advertiserKey,
    event: "purchase",
    identity: customerId,
    dedupeKey: purchase.id,
  });
  console.log("Sent to Specify");
} catch (error) {
  // The purchase has already happened, so a tracking problem must not undo it.
  if (error instanceof ValidationError) {
    console.error("Not sent to Specify:", error.message);
  } else {
    throw error;
  }
}
