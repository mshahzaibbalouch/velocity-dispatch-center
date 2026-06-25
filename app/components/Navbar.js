"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Search, CircleQuestionMark } from "lucide-react";

export default function Navbar() {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 mb-6 flex flex-col gap-4 border border-white/5 bg-surface-container-high px-6 py-4 shadow-[0_20px_120px_rgba(0,0,0,0.12)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-muted" />
            <input
              type="search"
              placeholder="Search dispatches, vehicles, drivers..."
              className="rounded-4xl border border-white/10 bg-surface ps-10 px-3 py-3 text-sm text-on-surface outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/15 w-[50%]"
            />
          </div>
          <div className="flex items-center justify-end gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationOpen(!isNotificationOpen)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 text-on-surface transition"
                aria-label="Toggle notifications"
              >
                <Bell className="h-5 w-5" />
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 top-full mt-3 w-96 rounded-4xl border border-white/10 bg-surface-container-high p-4 shadow-2xl">
                  <div className="mb-3 border-b border-white/10 pb-3">
                    <p className="text-xs uppercase tracking-[0.35em] text-surface-muted">
                      Notifications
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-on-surface">
                      Recent updates
                    </h3>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    <div className="rounded-3xl p-4 transition hover:bg-surface-container cursor-pointer">
                      <p className="text-sm font-medium text-on-surface">
                        New driver assignment
                      </p>
                      <p className="mt-1 text-xs text-surface-muted">
                        Driver Anya has been assigned to ride #328.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/support"
              className="inline-flex items-center gap-2 rounded-3xl text-on-surface transition hover:bg-surface-container-high p-3"
            >
              <CircleQuestionMark className="h-5 w-5 text-secondary" />
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="inline-flex items-center gap-3 rounded-3xl border-l-2 border-white px-4 py-3 text-sm text-on-surface transition"
              >
                <div className="text-left">
                  <p className="font-medium">Shahzaib</p>
                </div>
                <img
                  src="/assets/images/team/admin.png"
                  alt="Admin profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-3 w-70 rounded-2xl border border-white/10 bg-surface-container-high p-3 shadow-2xl">
                  <div className="mb-4 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-4 rounded-3xl p-3">
                      <img
                        src="/assets/images/team/admin.png"
                        alt="Admin"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-on-surface">
                          Shahzaib
                        </p>
                        <p className="text-xs text-surface-muted">
                          Administrator
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      {
                        label: "View profile",
                        description: "See account details",
                      },
                      { label: "Settings", description: "Update preferences" },
                      {
                        label: "Sign out",
                        description: "Logout from dashboard",
                      },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        className="w-full rounded-3xl bg-surface p-3 text-left transition hover:bg-surface-container cursor-pointer"
                      >
                        <p className="text-sm font-medium text-on-surface">
                          {item.label}
                        </p>
                        <p className="text-xs text-surface-muted">
                          {item.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {(isNotificationOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setNotificationOpen(false);
            setProfileOpen(false);
          }}
        />
      )}
    </>
  );
}
