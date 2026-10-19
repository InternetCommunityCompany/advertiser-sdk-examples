import { getCustomerId } from "../demo/customer";
import { Layout } from "../demo/layout";
import { PurchaseForm } from "../demo/purchase-form";
import { BrowserCapture } from "./browser-capture";

export default function Page() {
  const customerId = getCustomerId();

  return (
    <Layout customerId={customerId}>
      <BrowserCapture />
      <PurchaseForm />
    </Layout>
  );
}
