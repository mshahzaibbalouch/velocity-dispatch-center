"use client";

import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { drivers, routes, routeMeta, fleetStats, passengers } from "@/data/fleet";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);

const CircleMarker = dynamic(
  () => import("react-leaflet").then((m) => m.CircleMarker),
  { ssr: false },
);

const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

const MULTAN_CENTER = [30.1575, 71.5249];

// Haversine distance between two [lat, lng] points → returns km
function getDistanceKm([lat1, lng1], [lat2, lng2]) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ms to travel from current waypoint to next, given speed
function getStepMs(routeName, stepIndex) {
  const route = routes[routeName];
  const speed = routeMeta[routeName].speed; // km/h
  const from = route[stepIndex];
  const to = route[(stepIndex + 1) % route.length];
  const distKm = getDistanceKm(from, to);
  return (distKm / speed) * 3600 * 1000; // convert to ms
}

function initDriverState() {
  return drivers.map((d) => {
    if (d.status === "offline") {
      return { ...d };
    }
    const route = routes[d.route];
    const step = d.stepIndex % route.length;
    return {
      ...d,
      lat: route[step][0],
      lng: route[step][1],
      stepIndex: step,
      nextTick: Date.now() + getStepMs(d.route, step),
    };
  });
}

export default function DispatchMap() {
  const [driverStates, setDriverStates] = useState(initDriverState);
  const animFrameRef = useRef(null);

  useEffect(() => {
    function tick() {
      const now = Date.now();
      setDriverStates((prev) =>
        prev.map((d) => {
          if (d.status === "offline") return d;
          if (now < d.nextTick) return d; // not time yet

          const route = routes[d.route];
          const nextStep = (d.stepIndex + 1) % route.length;
          const stepMs = getStepMs(d.route, nextStep);

          return {
            ...d,
            stepIndex: nextStep,
            lat: route[nextStep][0],
            lng: route[nextStep][1],
            nextTick: now + stepMs,
          };
        }),
      );
      animFrameRef.current = requestAnimationFrame(tick);
    }

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
      {/* Top badges */}
      <div className="absolute top-3 left-3 z-[999] flex gap-2">
        <span className="flex items-center gap-1.5 bg-black/60 border border-white/10 text-xs font-semibold px-3 py-1.5 rounded-full text-white backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          LIVE DISPATCH ACTIVE
        </span>
        <span className="flex items-center gap-1.5 bg-black/60 border border-white/10 text-xs font-semibold px-3 py-1.5 rounded-full text-white backdrop-blur-sm">
          📍 MULTAN CITY
        </span>
      </div>

      {/* Legend */}
      <div className="absolute top-3 right-3 z-[999] flex flex-col gap-1.5 bg-black/60 border border-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-2 text-xs text-white">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          Online ({fleetStats.online})
        </div>
        <div className="flex items-center gap-2 text-xs text-white">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-500" />
          Offline ({fleetStats.offline})
        </div>
        <div className="flex items-center gap-2 text-xs text-white">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          Passengers ({passengers.length})
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={MULTAN_CENTER}
        zoom={12}
        zoomControl={false}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", background: "#0d0d0d" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {driverStates.map((driver) => (
          <CircleMarker
            key={driver.id}
            center={[driver.lat, driver.lng]}
            radius={driver.status === "online" ? 7 : 5}
            pathOptions={{
              fillColor: driver.status === "online" ? "#f59e0b" : "#6b7280",
              fillOpacity: 1,
              color: driver.status === "online" ? "#fcd34d" : "#4b5563",
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-xs font-semibold">{driver.name}</div>
              <div
                className={`text-xs mt-0.5 ${driver.status === "online" ? "text-emerald-500" : "text-gray-400"}`}
              >
                {driver.status === "online"
                  ? `● On route: ${driver.route.replace(/_/g, " ")} · ${routeMeta[driver.route].speed}km/h`
                  : "● Offline"}
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {passengers.map((passenger) => (
          <CircleMarker
            key={passenger.id}
            center={[passenger.lat, passenger.lng]}
            radius={6}
            pathOptions={{
              fillColor: "#22c55e",
              fillOpacity: 1,
              color: "#16a34a",
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-xs font-semibold">{passenger.name}</div>
              <div className="text-xs mt-0.5 text-emerald-400">
                ● Waiting for pickup
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Bottom stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-[999] flex items-center justify-between px-5 py-3 bg-black/70 backdrop-blur-sm border-t border-white/10">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Avg Pickup Time
          </p>
          <p className="text-xl font-bold text-white">
            {fleetStats.avgPickupTime}
          </p>
        </div>

        <div className="flex flex-col gap-1 min-w-[160px]">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Fleet Capacity
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all"
                style={{ width: `${fleetStats.fleetCapacity}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-white">
              {fleetStats.fleetCapacity}%
            </span>
          </div>
        </div>

        <button className="bg-amber-500 hover:bg-amber-400 transition text-black text-xs font-medium px-4 py-2 rounded-md tracking-widest uppercase">
          Deploy Rapid Response
        </button>
      </div>
    </div>
  );
}
