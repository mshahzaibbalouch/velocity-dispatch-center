"use client";

import { useState } from "react";
import {
  EllipsisVertical,
  Funnel,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

const Table = ({
  recentBookings = [],
  total = 1,
  pagination = false,
  isLoading = false,
  refresh = () => {},
  currentPage = 1,
  totalPages = 1,
  ITEMS_PER_PAGE = 10,
  onPageChange = () => {},
}) => {
  const statusStyles = {
    pending: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",

    confirmed: "bg-blue-500/15 text-blue-400 border border-blue-500/30",

    driver_assigned:
      "bg-purple-500/15 text-purple-400 border border-purple-500/30",

    driver_arrived: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30",

    picked_up: "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30",

    in_transit: "bg-orange-500/15 text-orange-400 border border-orange-500/30",

    completed: "bg-green-500/15 text-green-400 border border-green-500/30",

    cancelled: "bg-red-500/15 text-red-400 border border-red-500/30",

    no_show: "bg-gray-500/15 text-gray-400 border border-gray-500/30",

    dropped_out: "bg-pink-500/15 text-pink-400 border border-pink-500/30",
  };

  return (
    <div className="rounded-2xl mb-4 bg-surface-container border border-white/5 overflow-hidden">
      {/* Header */}

      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
        <h2 className="text-2xl font-semibold text-white">Recent Bookings</h2>

        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-amber-400 transition">
            <RefreshCw size={18} onClick={refresh} />
          </button>

          <button className="text-gray-400 hover:text-white transition">
            <EllipsisVertical size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
      <table className="w-full min-w-160">
        <thead>
          <tr className="text-xs uppercase tracking-widest text-gray-500">
            <th className="text-left px-4 py-2">Passenger</th>

            <th className="text-left">Pickup</th>

            <th className="text-left">Dropoff</th>

            <th className="text-left">Driver</th>

            <th className="text-left">Status</th>

            <th className="text-right pr-7">Fare</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={6}
                className="border-t border-white/5 py-6 text-center text-gray-400"
              >
                Loading...
              </td>
            </tr>
          ) : recentBookings.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="border-t border-white/5 py-6 text-center text-gray-400"
              >
                No recent bookings
              </td>
            </tr>
          ) : (
            recentBookings.map((booking) => {
              const passengerName =
                booking.passengerId?.name ||
                booking.passengerName ||
                "Unknown Passenger";

              const driverName =
                booking.driverId?.name ||
                booking.driverName ||
                "Unknown Driver";

              const passengerInitials = passengerName
                .split(" ")
                .map((word) => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

              return (
                <tr
                  key={booking._id}
                  className="border-t border-white/5 hover:bg-white/2 transition cursor-pointer"
                >
                  {/* Passenger */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-black">
                        {booking.avatar || passengerInitials}
                      </div>

                      <div>
                        <p className="font-medium text-white">
                          {passengerName}
                        </p>

                        <p className="text-xs text-gray-500">
                          {booking.createdAt
                            ? new Date(booking.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )
                            : "Unknown Date"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Pickup */}
                  <td className="text-gray-300">
                    {booking.pickupLocation || "-"}
                  </td>

                  {/* Drop */}
                  <td className="text-gray-300">
                    {booking.dropLocation || "-"}
                  </td>

                  {/* Driver */}
                  <td>
                    <div>
                      <p className="text-white">{driverName}</p>
                    </div>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        statusStyles[booking.status] ||
                        "bg-gray-500/20 text-gray-300"
                      }`}
                    >
                      {booking.status || "Unknown"}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="pr-7 text-right">
                    <p className="font-bold text-white">
                      $
                      {typeof booking.price === "number"
                        ? booking.price.toFixed(2)
                        : "0.00"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {booking.payment || "N/A"}
                    </p>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      </div>
      {pagination && (
        <div className="flex items-center justify-between px-5 py-4 border-t border-white/5">
          <p className="text-sm text-gray-400">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, recentBookings.length)} of{" "}
            {total} results
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="h-9 w-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 disabled:opacity-40 hover:bg-white/5"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => onPageChange(index + 1)}
                className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                  currentPage === index + 1
                    ? "bg-amber-400 text-black"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-9 w-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 disabled:opacity-40 hover:bg-white/5"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
