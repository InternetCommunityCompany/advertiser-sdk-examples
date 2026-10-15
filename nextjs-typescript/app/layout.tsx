import type { Metadata } from "next";
import type { ReactNode } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "../demo/styles.css";

export const metadata: Metadata = {
  title: "Specify Advertiser SDK · Next.js",
  description:
    "Browser capture and a server-side purchase with the Specify advertiser SDK.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
