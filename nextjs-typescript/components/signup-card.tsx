"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { specify } from "@/lib/specify";

export function SignupCard() {
  const [signups, setSignups] = useState(0);

  function onSignup() {
    specify.capture("signup");
    setSignups((count) => count + 1);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign-up</CardTitle>
        <CardDescription>Captured in the browser</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-3">
        <Button onClick={onSignup}>Sign up</Button>
        {signups > 0 && (
          <p className="text-muted-foreground text-sm" role="status">
            Captured {signups} signup {signups === 1 ? "event" : "events"}.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
