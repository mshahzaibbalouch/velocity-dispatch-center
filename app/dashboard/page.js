import { statCards } from "@/data/cards";
import DispatchMap from "../components/ui/DispatchMap";
import Card from "../components/Card";
import Table from "../components/ui/Table";
import { recentBookings } from "@/data/recentBookings";

export default function DashboardPage() {
  return (
    <section>
      <section className="grid gap-3 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </section>
      <DispatchMap />
      <Table recentBookings={recentBookings} pagination={false} />
    </section>
  );
}
