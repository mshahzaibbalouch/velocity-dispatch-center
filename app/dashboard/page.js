import Card from "../components/Card";
import DispatchMap from "../components/DispatchMap";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { statCards } from "@/data/cards";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <div className="mx-auto grid gap-0 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="space-y-3">
          <Navbar />
          <div className="px-6 py-2">
            <section className="grid gap-3 lg:grid-cols-4">
              {statCards.map((card) => (
                <Card key={card.id} {...card} />
              ))}
            </section>
            <section>
              <DispatchMap />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
