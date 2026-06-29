"use client";

import { useState } from "react";
import { X, MapPin, DollarSign, Navigation2 } from "lucide-react";

const CreateBookingModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropLocation: "",
    passengerId: "",
    distance: "",
    price: "",
    estimatedDuration: "",
    paymentMethod: "cash",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (
      !formData.pickupLocation ||
      !formData.dropLocation ||
      !formData.passengerId ||
      !formData.distance ||
      !formData.price
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]">
      <div className="bg-surface-container border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Create New Booking</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/15 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Passenger ID */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Passenger ID <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="passengerId"
              value={formData.passengerId}
              onChange={handleChange}
              placeholder="Enter passenger user ID"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
            />
            <p className="text-xs text-gray-500 mt-1">
              You can find the passenger ID in the user management section
            </p>
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <MapPin size={16} className="inline mr-2" />
              Pickup Location <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="e.g., 452 Market St, Downtown"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          {/* Dropoff Location */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Navigation2 size={16} className="inline mr-2" />
              Dropoff Location <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="dropLocation"
              value={formData.dropLocation}
              onChange={handleChange}
              placeholder="e.g., Multan Airport"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          {/* Distance and Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Distance (km) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                placeholder="e.g., 15"
                step="0.1"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <DollarSign size={16} className="inline mr-2" />
                Price <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 25.50"
                step="0.01"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          {/* Estimated Duration and Payment Method */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Estimated Duration (min)
              </label>
              <input
                type="number"
                name="estimatedDuration"
                value={formData.estimatedDuration}
                onChange={handleChange}
                placeholder="e.g., 30"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty for auto-calculation
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500 transition"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="wallet">Wallet</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any special notes or instructions..."
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-black font-semibold rounded-lg transition"
            >
              {loading ? "Creating..." : "Create Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookingModal;
