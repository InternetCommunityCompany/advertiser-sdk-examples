import { useCallback, useEffect } from "react";
import { useAccount } from "wagmi";
import { CookieConsentControl } from "./demo/cookie-consent";
import { Layout } from "./demo/layout";
import { specify } from "./specify";

export default function App() {
  const { address, isConnected } = useAccount();

  const onConsentChange = useCallback((granted: boolean) => {
    specify.setCookieConsent(granted);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      specify.identify(address);
    }
  }, [address, isConnected]);

  function handleOnClick() {
    void specify.capture("example_event");
  }

  return (
    <Layout>
      <CookieConsentControl onConsentChange={onConsentChange} />

      <button type="button" onClick={handleOnClick}>
        Capture example event
      </button>
    </Layout>
  );
}
