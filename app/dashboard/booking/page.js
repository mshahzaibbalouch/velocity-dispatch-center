"use client";

import CreateBookingModal from "@/app/components/booking/CreateBookingModal";
import LiveOperationsMap from "@/app/components/dashboard/LiveOperationsMap";
import PeakHoursTraffic from "@/app/components/dashboard/PeakHoursTraffic";
import PageHeader from "@/app/components/ui/PageHeader";
import SummaryCard from "@/app/components/ui/SummaryCard";
import Table from "@/app/components/ui/Table";
import React, { useEffect, useState } from "react";

const Booking = () => {
  const [data, setData] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStats, setBookingStats] = useState([]);

  useEffect(() => {
    fetchBookingStatsData();
    fetchData();
  }, []);

  // fetch data from the API and update the state
  const fetchBookingStatsData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/booking/stats");
      const result = await response.json();
      setBookingStats(result.data);
    } catch (error) {
      console.error("Error fetching booking stats data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const insertBook = async (bookingData) => {
    await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    setIsCreateModalOpen(false);
    fetchData();
  };

  const fetchData = async (newPage) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/booking?page=${newPage || 1}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!data.data || data.data.length === 0) {
      alert("No booking data available to export.");
      return;
    }

    const headers = [
      "Booking ID",
      "Passenger",
      "Driver",
      "Pickup Location",
      "Drop Location",
      "Status",
      "Price",
      "Payment",
      "Created At",
    ];

    const rows = data.data.map((booking) => [
      booking._id,
      booking.passengerId?.name || booking.passengerName || "",
      booking.driverId?.name || booking.driverName || "",
      booking.pickupLocation || "",
      booking.dropLocation || "",
      booking.status || "",
      booking.price ?? 0,
      booking.payment || "",
      booking.createdAt ? new Date(booking.createdAt).toLocaleString() : "",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="pb-4">
      <PageHeader
        description={"Oversee and manage real-time fleet operations."}
        title={"Booking Management"}
        onExport={exportToCSV}
        onCreate={() => setIsCreateModalOpen(true)}
      />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 ">
        {bookingStats?.map((item, index) => (
          <SummaryCard key={item.title} {...item} />
        ))}
      </div>
      <Table
        refresh={fetchData}
        isLoading={isLoading}
        recentBookings={data.data || []}
        pagination={true}
        currentPage={data.pagination?.page || 1}
        totalPages={data.pagination?.pages || 1}
        ITEMS_PER_PAGE={data.pagination?.limit || 10}
        total={data.pagination?.total || 1}
        onPageChange={(newPage) => {
          fetchData(newPage);
        }}
      />
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
