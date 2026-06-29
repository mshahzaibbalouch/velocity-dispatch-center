"use client";

import {
  Clock3,
  MapPin,
  Navigation,
  User,
  Truck,
} from "lucide-react";

const badgeColors = {
  amber: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  blue: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  red: "bg-red-500/15 text-red-400 border-red-500/30",
};

export default function DriverCard({ trip }) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-4 transition-all duration-300 hover:border-amber-400/40 hover:bg-slate-900 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
            <User className="h-6 w-6 text-amber-400" />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {trip.driver}
            </h3>

            <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
              <Truck size={13} />
              {trip.vehicle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-slate-800 px-2 py-1 text-xs text-white">
          <Clock3 size={13} />
          {trip.eta}
        </div>
      </div>

      {/* Pickup */}
      <div className="mt-5 flex gap-3">
        <MapPin
          size={18}
          className="mt-0.5 text-emerald-400"
        />

        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Pickup
          </p>

          <p className="text-sm text-slate-200">
            {trip.pickup}
          </p>
        </div>
      </div>

      {/* Destination */}
      <div className="mt-4 flex gap-3">
        <Navigation
          size={18}
          className="mt-0.5 text-amber-400"
        />

        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Destination
          </p>

          <p className="text-sm text-slate-200">
            {trip.destination}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            badgeColors[trip.color]
          }`}
        >
          {trip.status}
        </span>

        <span className="text-xs text-slate-400">
          {trip.progress}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-amber-400"
          style={{ width: "70%" }}
        />
      </div>
    </div>
  );
}