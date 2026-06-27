"use client";

import { recentBookings } from "@/data/recentBookings";
import { Funnel, EllipsisVertical } from "lucide-react";

const statusStyles = {
  active: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  pickup: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  dropoff: "bg-violet-500/15 text-violet-400 border border-violet-500/30",
  completed: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  cancelled: "bg-red-500/15 text-red-400 border border-red-500/30",
};

export default function RecentBookings() {
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
          {recentBookings.map((booking) => (
            <tr
              key={booking.id}
              className="border-t border-white/5 hover:cursor-pointer hover:bg-white/[0.02] transition"
            >
              <td className="px-4 py-2">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-black">
                    {booking.avatar}
                  </div>

                  <div>
                    <p className="text-white font-medium">
                      {booking.passenger}
                    </p>

                    <p className="text-xs text-gray-500">{booking.bookedAt}</p>
                  </div>
                </div>
              </td>

              <td className="text-gray-300">{booking.pickup}</td>

              <td className="text-gray-300">{booking.dropoff}</td>

              <td>
                <div>
                  <p className="text-white">{booking.driver}</p>

                  <p className="text-xs text-gray-500">{booking.vehicle}</p>
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
                  ${booking.fare.toFixed(2)}
                </p>

                <p className="text-xs text-gray-500">{booking.payment}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
