"use client";

import { useActionState } from "react";

import { completePurchase, type PurchaseResult } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PurchaseCard() {
  const [result, formAction, pending] = useActionState<PurchaseResult | null>(
    completePurchase,
    null,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase</CardTitle>
        <CardDescription>Captured on the server, in a Server Action</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col items-start gap-3">
          <Button type="submit" disabled={pending}>
            {pending ? "Completing…" : "Complete purchase"}
          </Button>
          {result && (
            <div className="text-muted-foreground text-sm" role="status">
              <p>
                Purchase complete. Receipt:{" "}
                <code className="font-mono">{result.purchaseId}</code>
              </p>
              {result.trackingError ? (
                <p className="text-destructive">
                  Not sent to Specify: {result.trackingError}
                </p>
              ) : (
                <p>Sent to Specify, with the receipt as its dedupe key.</p>
              )}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
