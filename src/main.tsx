import { health } from "@specify-sh/advertiser-sdk";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <main>
      <h1>Advertiser SDK example</h1>
      <p>SDK health: {String(health())}</p>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
