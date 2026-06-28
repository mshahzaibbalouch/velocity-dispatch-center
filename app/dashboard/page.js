"use client";

import { useEffect, useState } from "react";

import { statCards } from "@/data/cards";
import DispatchMap from "../components/ui/DispatchMap";
import Card from "../components/Card";
import Table from "../components/ui/Table";
import { recentBookings } from "@/data/recentBookings";

export default function DashboardPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/booking?page=1&limit=10");
      const result = await response.json();
      setData(result.data);
      console.log(result);
      
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };
  return (
    <section>
      <section className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.title}>
            <Card {...card} />
          </div>
          
        ))}
      </section>
      <DispatchMap />
      <Table recentBookings={data} pagination={false} />
    </section>
  );
}
