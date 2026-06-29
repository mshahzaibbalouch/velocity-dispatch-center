"use client";

import DriverCard from "./DriverCard";

const activeTrips = [
  {
    id: 1,
    driver: "Sarah Johnson",
    vehicle: "TRP-204",
    eta: "4 min",
    pickup: "456 7th Ave, New York, NY",
    destination: "JFK Terminal 4",
    status: "In Transit",
    progress: "2.4 miles remaining",
    color: "amber",
  },
  {
    id: 2,
    driver: "Michael Chan",
    vehicle: "TRP-187",
    eta: "12 min",
    pickup: "Brooklyn Bridge Park",
    destination: "Wall Street",
    status: "Heading to Pickup",
    progress: "3.8 miles away",
    color: "emerald",
  },
  {
    id: 3,
    driver: "Elena Rodriguez",
    vehicle: "TRP-321",
    eta: "1 min",
    pickup: "Times Square North",
    destination: "Central Park West",
    status: "Arriving",
    progress: "Driver arriving",
    color: "blue",
  },
];

export default function ActiveTripsPanel() {
  return (
    <aside className="absolute right-6 top-6 bottom-6 w-[340px] rounded-2xl border border-slate-700/40 bg-[#171D26]/95 backdrop-blur-md shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/50 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Active Trips
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            {activeTrips.length} drivers currently on route
          </p>
        </div>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-semibold text-emerald-400">
          {activeTrips.length}
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-4 overflow-y-auto p-5 h-[calc(100%-88px)]">
        {activeTrips.map((trip) => (
          <DriverCard key={trip.id} trip={trip} />
        ))}
      </div>
    </aside>
  );
}