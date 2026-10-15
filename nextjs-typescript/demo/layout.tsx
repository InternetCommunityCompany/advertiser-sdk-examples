import type { ReactNode } from "react";

export function Layout({
  children,
  customerId,
}: {
  children: ReactNode;
  customerId: string;
}) {
  return (
    <>
      <header>
        <div>
          Specify Advertiser SDK <span>Next.js + TypeScript</span>
        </div>
      </header>
      <main>
        <article>
          <h1>Customer activity</h1>
          <p>
            Track product views in the browser and purchases on the server.
          </p>
          <div className="customer">
            <span>Customer ID</span>
            <code>{customerId}</code>
          </div>
          {children}
        </article>
      </main>
    </>
  );
}
