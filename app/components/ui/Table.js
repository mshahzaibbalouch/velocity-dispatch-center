"use client";

import { useState } from "react";
import {
  EllipsisVertical,
  Funnel,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Table = ({ recentBookings = [], pagination = false }) => {
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(recentBookings.length / ITEMS_PER_PAGE);

  const currentBookings = pagination
    ? recentBookings.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      )
    : recentBookings.slice(0, 10);

  const statusStyles = {
    active: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    pickup: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
    dropoff: "bg-violet-500/15 text-violet-400 border border-violet-500/30",
    completed:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    cancelled: "bg-red-500/15 text-red-400 border border-red-500/30",
  };

  return (
    <div className="rounded-2xl mb-4 bg-[#1B1F26] border border-white/5 overflow-hidden">
      {/* Header */}

      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
        <h2 className="text-2xl font-semibold text-white">Recent Bookings</h2>

        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-amber-400 transition">
            <Funnel size={18} />
          </button>

          <button className="text-gray-400 hover:text-white transition">
            <EllipsisVertical size={18} />
          </button>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-[11px] uppercase tracking-widest text-gray-500">
            <th className="text-left px-4 py-2">Passenger</th>

            <th className="text-left">Pickup</th>

            <th className="text-left">Dropoff</th>

            <th className="text-left">Driver</th>

            <th className="text-left">Status</th>

            <th className="text-right pr-7">Fare</th>
          </tr>
        </thead>

        <tbody>
          {currentBookings.length === 0 && (
            <tr key="no-bookings">
              <td
                colSpan={6}
                className="border-t text-center text-md py-3 border-white/5 hover:cursor-pointer hover:bg-white/[0.02] transition"
              >
                No recent bookings
              </td>
            </tr>
          )}
          {currentBookings.length > 0 &&
            currentBookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-t border-white/5 hover:cursor-pointer hover:bg-white/[0.02] transition"
              >
                <td className="px-4 py-2">
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-black">
                      {booking?.avatar ||
                        booking?.passengerId?.name
                          ?.split(" ")[0]
                          ?.split("")[0] +
                          booking?.passengerId?.name
                            ?.split(" ")[1]
                            ?.split("")[0]}
                    </div>

                    <div>
                      <p className="text-white font-medium">
                        {booking.passengerId?.name ||
                          booking.passengerName ||
                          "Unknown Passenger"}
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

                <td className="text-gray-300">{booking.pickupLocation}</td>

                <td className="text-gray-300">{booking.dropLocation}</td>

                <td>
                  <div>
                    <p className="text-white">{booking.driver}</p>
                    <p className="text-white font-medium"></p>
                    <p className="text-xs text-white">
                      {booking.driverId?.name.split(' ')[0] ||
                        booking.driverName?.split(' ')[0] ||
                        "Unknown Driver"}
                    </p>
                  </div>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="text-right pr-7">
                  <p className="font-bold text-white">
                    ${booking.price ? booking.price.toFixed(2) : "0.00"}
                  </p>

                  <p className="text-xs text-gray-500">{booking.payment}</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {pagination && recentBookings.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-between px-5 py-4 border-t border-white/5">
          <p className="text-sm text-gray-400">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, recentBookings.length)} of{" "}
            {recentBookings.length} results
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="h-9 w-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 disabled:opacity-40 hover:bg-white/5"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
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
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
