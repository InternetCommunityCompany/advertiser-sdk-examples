import { ConsentButton } from "@/components/consent-bridge";
import { ConnectButton } from "@/components/identity-bridge";
import { PurchaseCard } from "@/components/purchase-card";
import { SignupCard } from "@/components/signup-card";
import { getCustomerId } from "@/lib/customer";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-6 p-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">Specify advertiser SDK</h1>
        <p className="text-muted-foreground text-sm">
          Signed in as <code className="font-mono">{getCustomerId()}</code>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <ConnectButton />
        <ConsentButton />
      </div>

      <SignupCard />
      <PurchaseCard />
    </main>
  );
}
