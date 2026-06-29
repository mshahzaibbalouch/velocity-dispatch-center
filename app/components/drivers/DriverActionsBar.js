"use client";

import { useState } from "react";
import { Plus, Download } from "lucide-react";

const DriverActionsBar = ({ onAddDriverClick, totalDrivers, onRefresh }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      // Fetch all drivers (no pagination)
      const res = await fetch("/api/drivers?page=1&limit=10000");
      const data = await res.json();

      if (data.success && data.data.length > 0) {
        // Prepare CSV content
        const headers = [
          "Name",
          "Email",
          "Company",
          "Phone",
          "Status",
          "Rating",
          "Rides",
          "License Number",
          "Total Earnings",
        ];

        const rows = data.data.map((driver) => [
          driver.name,
          driver.email,
          driver.companyName || "—",
          driver.phoneNumber || "—",
          driver.status || "offline",
          driver.rating || "0",
          driver.rideCount || "0",
          driver.licenseNumber || "—",
          driver.totalEarnings || "0",
        ]);

        // Create CSV string
        const csvContent = [
          headers.join(","),
          ...rows.map((row) =>
            row
              .map((cell) =>
                typeof cell === "string" && cell.includes(",")
                  ? `"${cell}"`
                  : cell
              )
              .join(",")
          ),
        ].join("\n");

        // Create blob and download
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `drivers_${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Failed to export drivers data");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Drivers Management</h1>
        <p className="text-gray-400 text-sm mt-1">
          {totalDrivers} total drivers in your fleet
        </p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          onClick={handleExportCSV}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition disabled:opacity-50"
        >
          <Download size={18} />
          <span className="hidden sm:inline">Export CSV</span>
        </button>

        <button
          onClick={onAddDriverClick}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-white font-medium transition"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Driver</span>
        </button>
      </div>
    </div>
  );
};

export default DriverActionsBar;
