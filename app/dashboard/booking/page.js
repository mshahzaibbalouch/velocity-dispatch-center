"use client";

import CreateBookingModal from "@/app/components/booking/CreateBookingModal";
import LiveOperationsMap from "@/app/components/dashboard/LiveOperationsMap";
import PeakHoursTraffic from "@/app/components/dashboard/PeakHoursTraffic";
import PageHeader from "@/app/components/ui/PageHeader";
import SummaryCard from "@/app/components/ui/SummaryCard";
import Table from "@/app/components/ui/Table";
import { bookingStats } from "@/data/bookingCard";
import React, { useEffect, useState } from "react";

const Booking = () => {
  const [data, setData] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const insertBook = async (bookingData) => {
    await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/booking");
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };
  return (
    <div className="pb-4">
      <PageHeader
        description={"Oversee and manage real-time fleet operations."}
        title={"Booking Management"}
        onExport={() => alert("Hy")}
        onCreate={() => setIsCreateModalOpen(true)}
      />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 ">
        {bookingStats?.map((item, index) => (
          <SummaryCard key={item.title} {...item} />
        ))}
      </div>
      <Table recentBookings={data} pagination={true} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PeakHoursTraffic />
        <LiveOperationsMap />
      </div>
      {isCreateModalOpen && (
        <CreateBookingModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={insertBook}
        />
      )}
    </div>
  );
};

export default Booking;
