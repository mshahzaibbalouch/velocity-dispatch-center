"use client";

import { useState } from "react";
import {
  Check,
  Truck,
  MapPin,
  Trash2,
  Star,
  DollarSign,
  LogOut,
  AlertCircle,
} from "lucide-react";

const BookingActionsMenu = ({ booking, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const updateStatus = async (newStatus, endpoint) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/booking/${booking._id}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.success) {
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRating = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/booking/${booking._id}/rate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, review }),
      });
      const data = await res.json();
      if (data.success) {
        setShowRatingModal(false);
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error("Error adding rating:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    const reason = prompt("Enter cancellation reason:");
    if (reason) {
      setLoading(true);
      try {
        const res = await fetch(`/api/booking/${booking._id}/cancel`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cancellationReason: reason }),
        });
        const data = await res.json();
        if (data.success) {
          onUpdate();
          onClose();
        }
      } catch (error) {
        console.error("Error cancelling booking:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getAvailableActions = () => {
    const actions = [];
    const status = booking.status;

    if (status === "pending" || status === "confirmed") {
      actions.push({
        label: "Assign Driver",
        icon: Truck,
        action: () => updateStatus("driver_assigned", "assign-driver"),
        color: "text-blue-400",
      });
    }

    if (status === "driver_assigned") {
      actions.push({
        label: "Driver Arrived",
        icon: MapPin,
        action: () => updateStatus("driver_arrived", "driver-arrived"),
        color: "text-indigo-400",
      });
    }

    if (status === "driver_arrived") {
      actions.push({
        label: "Pickup Passenger",
        icon: Check,
        action: () => updateStatus("picked_up", "pickup"),
        color: "text-cyan-400",
      });
      actions.push({
        label: "Mark as Dropped Out",
        icon: LogOut,
        action: () => updateStatus("dropped_out", "dropped-out"),
        color: "text-orange-400",
      });
    }

    if (status === "picked_up") {
      actions.push({
        label: "Start Transit",
        icon: Truck,
        action: () => updateStatus("in_transit", "in-transit"),
        color: "text-orange-400",
      });
    }

    if (status === "in_transit") {
      actions.push({
        label: "Drop Off",
        icon: MapPin,
        action: () => updateStatus("completed", "dropoff"),
        color: "text-emerald-400",
      });
    }

    if (status === "completed") {
      actions.push({
        label: "Add Rating",
        icon: Star,
        action: () => setShowRatingModal(true),
        color: "text-yellow-400",
      });
    }

    if (
      status !== "completed" &&
      status !== "cancelled" &&
      status !== "dropped_out"
    ) {
      actions.push({
        label: "Cancel Booking",
        icon: AlertCircle,
        action: handleCancel,
        color: "text-red-400",
      });
    }

    return actions;
  };

  const actions = getAvailableActions();

  return (
    <>
      <div className="absolute right-0 top-full mt-2 w-48 bg-[#252a32] border border-white/10 rounded-lg shadow-lg overflow-hidden z-50">
        {actions.length === 0 ? (
          <div className="px-4 py-3 text-gray-400 text-sm">
            No actions available for this status
          </div>
        ) : (
          actions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                onClick={action.action}
                disabled={loading}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed border-b border-white/5 last:border-b-0"
              >
                <Icon size={16} className={action.color} />
                {action.label}
              </button>
            );
          })
        )}
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1B1F26] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-white mb-4">
              Rate this Booking
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl transition ${
                      star <= rating
                        ? "text-yellow-400"
                        : "text-gray-500 hover:text-yellow-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">{rating} out of 5</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Review (Optional)
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your feedback..."
                rows={3}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRatingModal(false)}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRating}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-black font-semibold rounded-lg transition"
              >
                {loading ? "Saving..." : "Save Rating"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingActionsMenu;
