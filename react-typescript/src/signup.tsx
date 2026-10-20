import { useState } from "react";

import { specify } from "./specify";

export function SignupButton() {
  const [signups, setSignups] = useState(0);

  function signUp() {
    // Stands in for your sign-up flow. Capture once the account exists, so a
    // failed sign-up never counts as a conversion.
    specify.capture("signup");
    setSignups((count) => count + 1);
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={signUp}
        className="self-start rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white"
      >
        Sign up
      </button>
      <p role="status" className="text-sm text-slate-500">
        {signups === 0
          ? "No sign-ups captured yet."
          : `Captured ${signups} signup ${signups === 1 ? "event" : "events"}.`}
      </p>
    </div>
  );
}
