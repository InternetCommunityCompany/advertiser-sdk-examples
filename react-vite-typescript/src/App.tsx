import { Advertiser } from "./components/advertiser";
import { TopBar } from "./components/top-bar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <TopBar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Advertiser />
      </main>
    </div>
  );
}
