"use client";

import { useState } from "react";
import { X } from "lucide-react";

const AddDriverChoiceModal = ({ isOpen, onClose, onSelectOption }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface-container border border-white/10 rounded-2xl p-6 w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Add Driver</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <button
            onClick={() => onSelectOption("select")}
            className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 rounded-lg transition text-left"
          >
            <h3 className="text-white font-semibold mb-1">
              Select from Existing Users
            </h3>
            <p className="text-sm text-gray-400">
              Convert a dispatcher or admin user to a driver
            </p>
          </button>

          <button
            onClick={() => onSelectOption("manual")}
            className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 rounded-lg transition text-left"
          >
            <h3 className="text-white font-semibold mb-1">Add Details Manually</h3>
            <p className="text-sm text-gray-400">
              Create a new driver with basic information
            </p>
          </button>
        </div>

        {/* Cancel */}
        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddDriverChoiceModal;
