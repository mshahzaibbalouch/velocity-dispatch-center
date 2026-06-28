"use client";

import Image from "next/image";
import {
  User, Bell, Shield, Palette, Trash2, Save,
  Eye, EyeOff, LogOut,
} from "lucide-react";
import { useState } from "react";

const tabs = [
  { id: "profile",       label: "Profile",       icon: User    },
  { id: "appearance",    label: "Appearance",    icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell    },
  { id: "security",      label: "Security",      icon: Shield  },
];

function Section({ title, description, children }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-surface-container p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {description && <p className="mt-1 text-sm text-surface-muted">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-surface-muted">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-surface-muted">{hint}</p>}
    </div>
  );
}

function Toggle({ enabled, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0">
      <div>
        <p className="text-sm font-medium text-on-surface">{label}</p>
        {description && <p className="text-xs text-surface-muted mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
          enabled ? "bg-amber-400" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [notifs, setNotifs] = useState({
    newBooking:   true,
    driverAlert:  true,
    systemUpdate: false,
    marketing:    false,
  });
  const [profile, setProfile] = useState({
    name: "Shahzaib Balouch",
    email: "shahzaib@velocity.com",
    phone: "+92 300 0000000",
    role: "Chief Executive Officer",
    company: "Velocity Dispatch",
  });

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-surface-muted">
          Manage your account, preferences and security.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar tabs */}
        <aside className="lg:w-56 shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  activeTab === id
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-surface-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-6 min-w-0">

          {/* ── PROFILE ── */}
          {activeTab === "profile" && (
            <>
              <Section title="Public Profile" description="This is how others see you in the system.">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
                  <Image
                    src="/assets/images/team/admin.png"
                    alt="Avatar"
                    width={72}
                    height={72}
                    className="h-18 w-18 rounded-2xl object-cover ring-2 ring-amber-400/30"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">Profile photo</p>
                    <p className="text-xs text-surface-muted mt-0.5">PNG, JPG up to 2MB</p>
                    <button className="mt-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-on-surface hover:bg-white/10 transition">
                      Change photo
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name">
                    <input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="input-field"
                    />
                  </Field>
                  <Field label="Role / Title">
                    <input
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="input-field"
                    />
                  </Field>
                  <Field label="Email Address">
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="input-field"
                    />
                  </Field>
                  <Field label="Phone Number">
                    <input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="input-field"
                    />
                  </Field>
                  <Field label="Company" hint="Used on reports and exports.">
                    <input
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      className="input-field sm:col-span-2"
                    />
                  </Field>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="btn-primary flex items-center gap-2 text-sm">
                    <Save className="h-4 w-4" /> Save changes
                  </button>
                </div>
              </Section>

              {/* Danger zone */}
              <Section title="Danger Zone" description="Irreversible actions — proceed with caution.">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                  <div>
                    <p className="text-sm font-semibold text-red-400">Delete account</p>
                    <p className="text-xs text-surface-muted mt-0.5">
                      Permanently delete your account and all associated data.
                    </p>
                  </div>
                  <button className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 transition shrink-0">
                    <Trash2 className="h-4 w-4" /> Delete account
                  </button>
                </div>
              </Section>
            </>
          )}

          {/* ── APPEARANCE ── */}
          {activeTab === "appearance" && (
            <Section title="Appearance" description="Customize how Velocity Dispatch looks for you.">
              <Field label="Theme">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
                  {["Dark (Default)", "Darker", "Midnight"].map((t, i) => (
                    <button
                      key={t}
                      className={`rounded-xl border p-4 text-left transition ${
                        i === 0
                          ? "border-amber-400/50 bg-amber-400/10 text-amber-400"
                          : "border-white/5 bg-surface-container-high text-surface-muted hover:border-white/20"
                      }`}
                    >
                      <div className="mb-2 h-10 rounded-lg bg-surface-container" />
                      <p className="text-xs font-semibold">{t}</p>
                    </button>
                  ))}
                </div>
              </Field>
              <div className="mt-6 space-y-1">
                <Toggle
                  label="Compact sidebar"
                  description="Reduce sidebar padding for more screen space."
                  enabled={false}
                  onChange={() => {}}
                />
                <Toggle
                  label="Reduce motion"
                  description="Minimize animations across the dashboard."
                  enabled={false}
                  onChange={() => {}}
                />
              </div>
            </Section>
          )}

          {/* ── NOTIFICATIONS ── */}
          {activeTab === "notifications" && (
            <Section title="Notification Preferences" description="Choose what you want to be notified about.">
              <div className="space-y-1">
                <Toggle
                  label="New booking assigned"
                  description="When a new ride is assigned to your fleet."
                  enabled={notifs.newBooking}
                  onChange={(v) => setNotifs({ ...notifs, newBooking: v })}
                />
                <Toggle
                  label="Driver alerts"
                  description="SOS, offline, or route deviation alerts."
                  enabled={notifs.driverAlert}
                  onChange={(v) => setNotifs({ ...notifs, driverAlert: v })}
                />
                <Toggle
                  label="System updates"
                  description="Platform maintenance and version updates."
                  enabled={notifs.systemUpdate}
                  onChange={(v) => setNotifs({ ...notifs, systemUpdate: v })}
                />
                <Toggle
                  label="Marketing & tips"
                  description="Product news and feature announcements."
                  enabled={notifs.marketing}
                  onChange={(v) => setNotifs({ ...notifs, marketing: v })}
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button className="btn-primary flex items-center gap-2 text-sm">
                  <Save className="h-4 w-4" /> Save preferences
                </button>
              </div>
            </Section>
          )}

          {/* ── SECURITY ── */}
          {activeTab === "security" && (
            <>
              <Section title="Change Password" description="Use a strong password you don't use elsewhere.">
                <div className="space-y-4">
                  <Field label="Current Password">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="input-field pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-muted"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </Field>
                  <Field label="New Password">
                    <input type="password" placeholder="••••••••" className="input-field" />
                  </Field>
                  <Field label="Confirm New Password">
                    <input type="password" placeholder="••••••••" className="input-field" />
                  </Field>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="btn-primary flex items-center gap-2 text-sm">
                    <Save className="h-4 w-4" /> Update password
                  </button>
                </div>
              </Section>

              <Section title="Active Sessions" description="Devices currently logged into your account.">
                {[
                  { device: "Windows PC — Chrome", location: "Multan, PK", time: "Now",           current: true  },
                  { device: "iPhone 15 — Safari",  location: "Lahore, PK",  time: "2 hours ago",  current: false },
                ].map((s) => (
                  <div key={s.device} className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-white">{s.device}</p>
                      <p className="text-xs text-surface-muted">{s.location} · {s.time}</p>
                    </div>
                    {s.current
                      ? <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400">Current</span>
                      : <button className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-surface-muted hover:text-red-400 hover:border-red-400/30 transition">
                          <LogOut className="h-3 w-3" /> Revoke
                        </button>
                    }
                  </div>
                ))}
              </Section>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
