"use client";

import { useState } from "react";
import {
  EllipsisVertical,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Phone,
  Check,
  X,
} from "lucide-react";

const DriverTable = ({
  drivers = [],
  total = 1,
  pagination = false,
  isLoading = false,
  refresh = () => {},
  currentPage = 1,
  totalPages = 1,
  ITEMS_PER_PAGE = 10,
  onPageChange = () => {},
  onStatusChange = () => {},
  updatingStatus = {},
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const statusStyles = {
    online: "bg-green-500/15 text-green-400 border border-green-500/30",
    offline: "bg-gray-500/15 text-gray-400 border border-gray-500/30",
    on_trip: "bg-orange-500/15 text-orange-400 border border-orange-500/30",
    break: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  };

  const handleStatusChange = (driverId, newStatus) => {
    onStatusChange(driverId, newStatus);
    setOpenMenuId(null);
  };

  const statusOptions = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
    { value: "on_trip", label: "On Trip" },
    { value: "break", label: "Break" },
  ];

  return (
    <div className="rounded-2xl mb-4 bg-surface-container border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
        <h2 className="text-2xl font-semibold text-white">Drivers List</h2>

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
              <th className="text-left px-4 py-2">Driver Profile</th>
              <th className="text-left">Email</th>
              <th className="text-left">Company</th>
              <th className="text-left">Status</th>
              <th className="text-left">Rating</th>
              <th className="text-center pr-7">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="border-t border-white/5 py-6 text-center text-gray-400"
                >
                  Loading drivers...
                </td>
              </tr>
            ) : drivers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="border-t border-white/5 py-6 text-center text-gray-400"
                >
                  No drivers found
                </td>
              </tr>
            ) : (
              drivers.map((driver, index) => (
                <tr
                  key={driver._id || index}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  {/* Driver Profile */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {driver.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {driver.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {driver.email?.split("@")[0]}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="text-sm text-gray-300">{driver.email}</td>

                  {/* Company */}
                  <td className="text-sm text-gray-300">
                    {driver.companyName || "—"}
                  </td>

                  {/* Status */}
                  <td className="text-sm">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        statusStyles[driver.status] || statusStyles.offline
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          driver.status === "online"
                            ? "bg-green-400"
                            : driver.status === "on_trip"
                            ? "bg-orange-400"
                            : driver.status === "break"
                            ? "bg-yellow-400"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      {driver.status || "Offline"}
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="text-sm">
                    <div className="flex items-center gap-1">
                      <Star
                        size={14}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span className="text-white font-medium">
                        {driver.rating || "0.0"}
                      </span>
                      <span className="text-gray-500 text-xs">
                        ({driver.rideCount || 0})
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="text-center pr-7">
                    <button className="text-gray-400 hover:text-amber-400 transition inline-flex">
                      <EllipsisVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
          <p className="text-sm text-gray-400">
            Page {currentPage} of {totalPages} ({total} total)
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-sm text-gray-400 px-2">{currentPage}</span>

            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverTable;
