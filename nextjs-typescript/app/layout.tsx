import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ConsentBridge } from "@/components/consent-bridge";
import { IdentityBridge } from "@/components/identity-bridge";
import { Providers } from "@/components/providers";
import { getCustomerId } from "@/lib/customer";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Specify Advertiser SDK — Next.js example",
  description:
    "Capture Specify conversions in the browser and from a Server Action",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <ConsentBridge />
          <IdentityBridge customerId={getCustomerId()} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
