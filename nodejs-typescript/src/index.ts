import Specify from "@specify-sh/advertiser-sdk";

async function completePurchase(customerId: string) {
  // Replace this stand-in with your checkout's existing business operation.
  const purchase = { customerId, status: "completed" };
  console.log("Purchase completed:", purchase);

  const advertiserKey = process.env.SPECIFY_ADVERTISER_KEY ?? "";
  const specify = new Specify({ advertiserKey });
  const status = await specify.capture("purchase", customerId);
  console.log("Specify capture:", status === null ? "null" : `HTTP ${status}`);

  return purchase;
}

await completePurchase(process.argv[2] ?? "customer_123");
