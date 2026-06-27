import { statCards } from "@/data/cards";
import DispatchMap from "../components/ui/DispatchMap";
import RecentBookings from "../components/recentBookings";
import Card from "../components/Card";

export default function DashboardPage() {
  return (
    <section>
      <section className="grid gap-3 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </section>
      <DispatchMap />
      <RecentBookings />
    </section>
  );
}
