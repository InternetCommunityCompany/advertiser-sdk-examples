import type { Metadata } from "next";
import type { ReactNode } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import { SpecifyBridge } from "../components/specify-bridge";
import { getCustomerId } from "../demo/customer";
import "../demo/styles.css";

export const metadata: Metadata = {
  title: "Specify Advertiser SDK · Next.js",
  description:
    "Browser and server conversions with the Specify advertiser SDK.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SpecifyBridge customerId={getCustomerId()} />
        {children}
      </body>
    </html>
  );
}
