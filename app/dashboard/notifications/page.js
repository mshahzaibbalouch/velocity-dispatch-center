"use client";

import { useState } from "react";
import {
  Bell, CarTaxiFront, AlertTriangle,
  Info, CheckCheck, Trash2, Filter,
} from "lucide-react";

const ALL = [
  { id: 1, type: "booking",  title: "New booking assigned",      body: "Ride #BK-12041 has been assigned to Driver 12 — Multan Airport.",    time: "2 min ago",   read: false },
  { id: 2, type: "alert",    title: "Driver offline alert",       body: "Driver 8 went offline unexpectedly on Bosan Road route.",             time: "14 min ago",  read: false },
  { id: 3, type: "system",   title: "System maintenance tonight", body: "Scheduled downtime from 02:00 – 03:00 AM PKT. Plan accordingly.",    time: "1 hour ago",  read: false },
  { id: 4, type: "booking",  title: "Ride completed",             body: "Ride #BK-12042 completed successfully. Fare: $12.80.",               time: "1 hour ago",  read: true  },
  { id: 5, type: "alert",    title: "High demand — Midtown",      body: "Passenger demand is spiking near BWP Chowk. Deploy more drivers.",   time: "2 hours ago", read: true  },
  { id: 6, type: "system",   title: "New feature available",      body: "Live route heat maps are now available on the Tracking page.",       time: "5 hours ago", read: true  },
  { id: 7, type: "booking",  title: "Booking cancelled",          body: "Ride #BK-12046 was cancelled by the passenger.",                     time: "6 hours ago", read: true  },
  { id: 8, type: "alert",    title: "Fleet capacity low",         body: "Only 42% of fleet is currently online. Consider driver outreach.",   time: "Yesterday",   read: true  },
];

const typeConfig = {
  booking: { icon: CarTaxiFront,   color: "text-amber-400",   bg: "bg-amber-400/10"   },
  alert:   { icon: AlertTriangle,  color: "text-red-400",     bg: "bg-red-400/10"     },
  system:  { icon: Info,           color: "text-blue-400",    bg: "bg-blue-400/10"    },
};

const filters = ["All", "Unread", "Booking", "Alert", "System"];

export default function NotificationsPage() {
  const [items, setItems]     = useState(ALL);
  const [active, setActive]   = useState("All");

  const markAllRead = () => setItems((p) => p.map((n) => ({ ...n, read: true })));
  const markRead    = (id) => setItems((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));
  const remove      = (id) => setItems((p) => p.filter((n) => n.id !== id));

  const visible = items.filter((n) => {
    if (active === "Unread")  return !n.read;
    if (active === "Booking") return n.type === "booking";
    if (active === "Alert")   return n.type === "alert";
    if (active === "System")  return n.type === "system";
    return true;
  });

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            Notifications
            {unreadCount > 0 && (
              <span className="rounded-full bg-amber-400/15 px-2.5 py-0.5 text-sm font-semibold text-amber-400">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="mt-1 text-sm text-surface-muted">
            Stay on top of fleet activity and system alerts.
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-white/10 transition"
        >
          <CheckCheck className="h-4 w-4 text-emerald-400" />
          Mark all as read
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
              active === f
                ? "bg-amber-400/15 text-amber-400"
                : "bg-surface-container text-surface-muted hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="rounded-2xl border border-white/5 bg-surface-container overflow-hidden">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-surface-muted">
            <Bell className="h-10 w-10 opacity-20" />
            <p className="text-sm">No notifications here.</p>
          </div>
        ) : (
          visible.map((n, i) => {
            const { icon: NIcon, color, bg } = typeConfig[n.type];
            return (
              <div
                key={n.id}
                className={`flex items-start gap-4 px-5 py-4 transition hover:bg-white/5 ${
                  i < visible.length - 1 ? "border-b border-white/5" : ""
                } ${!n.read ? "bg-amber-400/5" : ""}`}
              >
                {/* Icon */}
                <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${bg}`}>
                  <NIcon className={`h-4 w-4 ${color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${!n.read ? "text-white" : "text-on-surface"}`}>
                      {n.title}
                      {!n.read && (
                        <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-amber-400 align-middle" />
                      )}
                    </p>
                    <span className="shrink-0 text-xs text-surface-muted">{n.time}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-surface-muted">{n.body}</p>
                  {!n.read && (
                    <button
                      onClick={() => markRead(n.id)}
                      className="mt-2 text-xs font-medium text-amber-400 hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                </div>

                {/* Delete */}
                <button
                  onClick={() => remove(n.id)}
                  className="mt-0.5 shrink-0 text-surface-muted hover:text-red-400 transition"
                  aria-label="Dismiss"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
