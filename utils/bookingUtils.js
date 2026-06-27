// Utility functions for booking management

export const exportBookingsToCSV = (bookings) => {
  if (!bookings || bookings.length === 0) {
    alert("No bookings to export");
    return;
  }

  // Prepare CSV headers
  const headers = [
    "Booking ID",
    "Passenger Name",
    "Passenger Email",
    "Pickup Location",
    "Dropoff Location",
    "Driver Name",
    "Driver Email",
    "Distance (km)",
    "Price",
    "Status",
    "Payment Method",
    "Payment Status",
    "Estimated Duration (min)",
    "Actual Duration (min)",
    "Rating",
    "Pickup Time",
    "Dropoff Time",
    "Created At",
    "Updated At",
    "Notes",
  ];

  // Prepare CSV rows
  const rows = bookings.map((booking) => [
    booking._id?.slice(-8).toUpperCase() || "N/A",
    booking.passengerId?.name || "N/A",
    booking.passengerId?.email || "N/A",
    booking.pickupLocation || "N/A",
    booking.dropLocation || "N/A",
    booking.driverId?.name || "Unassigned",
    booking.driverId?.email || "N/A",
    booking.distance || 0,
    booking.price?.toFixed(2) || 0,
    booking.status || "N/A",
    booking.paymentMethod || "N/A",
    booking.paymentStatus || "pending",
    booking.estimatedDuration || "N/A",
    booking.actualDuration || "N/A",
    booking.rating || "N/A",
    formatDate(booking.pickupTime),
    formatDate(booking.dropoffTime),
    formatDate(booking.createdAt),
    formatDate(booking.updatedAt),
    booking.notes || "N/A",
  ]);

  // Convert to CSV string
  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((cell) => {
          // Escape quotes and wrap in quotes if contains comma
          const cellStr = String(cell);
          if (cellStr.includes(",") || cellStr.includes('"')) {
            return `"${cellStr.replace(/"/g, '""')}"`;
          }
          return cellStr;
        })
        .join(",")
    ),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `bookings_${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatDate = (date) => {
  if (!date) return "N/A";
  try {
    return new Date(date).toLocaleString();
  } catch (error) {
    return "N/A";
  }
};

export const getStatusColor = (status) => {
  const colors = {
    pending: "bg-yellow-500/15 text-yellow-400",
    confirmed: "bg-blue-500/15 text-blue-400",
    driver_assigned: "bg-purple-500/15 text-purple-400",
    driver_arrived: "bg-indigo-500/15 text-indigo-400",
    picked_up: "bg-cyan-500/15 text-cyan-400",
    in_transit: "bg-orange-500/15 text-orange-400",
    completed: "bg-emerald-500/15 text-emerald-400",
    cancelled: "bg-red-500/15 text-red-400",
    dropped_out: "bg-red-500/15 text-red-400",
    no_show: "bg-red-500/15 text-red-400",
  };
  return colors[status] || "bg-gray-500/15 text-gray-400";
};

export const getStatusBadgeText = (status) => {
  return status?.replace(/_/g, " ") || "Unknown";
};

export const calculateDuration = (pickupTime, dropoffTime) => {
  if (!pickupTime || !dropoffTime) return null;
  const diff = new Date(dropoffTime) - new Date(pickupTime);
  return Math.round(diff / 60000); // Convert to minutes
};
