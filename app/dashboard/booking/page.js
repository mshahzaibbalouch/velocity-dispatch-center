import LiveOperationsMap from "@/app/components/dashboard/LiveOperationsMap";
import PeakHoursTraffic from "@/app/components/dashboard/PeakHoursTraffic";
import PageHeader from "@/app/components/ui/PageHeader";
import SummaryCard from "@/app/components/ui/SummaryCard";
import Table from "@/app/components/ui/Table";
import { bookingStats } from "@/data/bookingCard";
import { recentBookings } from "@/data/recentBookings";
import React from "react";

const Bookings = () => {
  return (
    <div>
      <PageHeader
        title="Booking Management"
        description="Oversee and manage real-time fleet operations."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {bookingStats.map((item) => (
          <SummaryCard key={item.title} {...item} />
        ))}
      </div>
      <Table pagination={true} recentBookings={recentBookings} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 my-6">
        <PeakHoursTraffic />
        <LiveOperationsMap />
      </div>
    </div>
  );
};

export default Bookings;
