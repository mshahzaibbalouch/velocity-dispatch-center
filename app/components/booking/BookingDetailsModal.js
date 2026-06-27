"use client";

import { useState } from "react";
import { X, Info } from "lucide-react";
import BookingStatusTimeline from "./BookingStatusTimeline";

const BookingDetailsModal = ({ booking, onClose }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(booking.paymentStatus);

  const handleUpdatePaymentStatus = async () => {
    try {
      const res = await fetch(`/api/booking/${booking._id}/payment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setShowPaymentModal(false);
        onClose();
      }
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1B1F26] border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Booking Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Booking Info Sections */}
        <div className="space-y-6">
          {/* Timeline */}
      <BookingStatusTimeline booking={booking} />

      {/* Booking Status */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">
              Booking Status
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Booking ID</p>
                <p className="text-white font-mono">
                  {booking._id?.slice(-8).toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <p className="text-white capitalize">
                  {booking.status?.replace(/_/g, " ")}
                </p>
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">
              Passenger Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Name</p>
                <p className="text-white">{booking.passengerId?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-white text-sm">{booking.passengerId?.email || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Driver Details */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">
              Driver Details
            </h3>
            {booking.driverId ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Name</p>
                  <p className="text-white">{booking.driverId.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-white text-sm">{booking.driverId.email}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No driver assigned yet</p>
            )}
          </div>

          {/* Route Information */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">
              Route Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Pickup Location</p>
                <p className="text-white">{booking.pickupLocation}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Dropoff Location</p>
                <p className="text-white">{booking.dropLocation}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Distance</p>
                  <p className="text-white">{booking.distance} km</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Estimated Duration</p>
                  <p className="text-white">
                    {booking.estimatedDuration ? `${booking.estimatedDuration} min` : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trip Timing */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">
              Trip Timing
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Pickup Time</p>
                <p className="text-white text-sm">
                  {booking.pickupTime ? formatDate(booking.pickupTime) : "Not started"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Dropoff Time</p>
                <p className="text-white text-sm">
                  {booking.dropoffTime ? formatDate(booking.dropoffTime) : "Not completed"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Actual Duration</p>
                <p className="text-white">
                  {booking.actualDuration ? `${booking.actualDuration} min` : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">
                Payment Information
              </h3>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="text-xs text-amber-400 hover:text-amber-300 transition"
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Price</p>
                <p className="text-white font-semibold">${booking.price?.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                <p className="text-white capitalize">{booking.paymentMethod || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Payment Status</p>
                <p className="text-white capitalize">{booking.paymentStatus || "pending"}</p>
              </div>
            </div>
          </div>

          {/* Rating & Review */}
          {booking.rating && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">
                Rating & Review
              </h3>
              <div>
                <p className="text-xs text-gray-500 mb-1">Rating</p>
                <p className="text-white mb-3">
                  {Array(booking.rating)
                    .fill("★")
                    .join("")}{" "}
                  ({booking.rating}/5)
                </p>
                {booking.review && (
                  <>
                    <p className="text-xs text-gray-500 mb-1">Review</p>
                    <p className="text-white text-sm italic">{booking.review}</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {booking.notes && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Notes</h3>
              <p className="text-white text-sm">{booking.notes}</p>
            </div>
          )}

          {/* Timestamps */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">
              Timestamps
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Created</p>
                <p className="text-white text-xs">{formatDate(booking.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                <p className="text-white text-xs">{formatDate(booking.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* Payment Status Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1B1F26] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-white mb-4">
              Update Payment Status
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Payment Status
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500 transition"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePaymentStatus}
                className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetailsModal;
