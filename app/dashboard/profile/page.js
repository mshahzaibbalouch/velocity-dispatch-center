import Image from "next/image";
import Link from "next/link";
import {
  Mail, Phone, Building, Shield,
  CarTaxiFront, Clock, DollarSign, Edit,
} from "lucide-react";

const stats = [
  { label: "Rides Managed",  value: "3,842",  icon: CarTaxiFront, color: "text-amber-400",  bg: "bg-amber-400/10"  },
  { label: "Avg Response",   value: "4m 12s", icon: Clock,        color: "text-blue-400",   bg: "bg-blue-400/10"   },
  { label: "Revenue Handled",value: "$94.2K", icon: DollarSign,   color: "text-emerald-400",bg: "bg-emerald-400/10"},
];

const activity = [
  { action: "Assigned Driver 12 to ride #BK-12041", time: "2 min ago"   },
  { action: "Approved fleet expansion — 5 vehicles", time: "1 hour ago" },
  { action: "Updated system notification settings",  time: "3 hours ago"},
  { action: "Exported monthly revenue report",       time: "Yesterday"  },
  { action: "Onboarded Driver 50 — Multan South",    time: "2 days ago" },
];

export default function ProfilePage() {
  return (
    <div className="pb-10">
      {/* Header card */}
      <div className="relative rounded-2xl border border-white/5 bg-surface-container overflow-hidden mb-6">
        {/* Banner */}
        <div className="h-32 bg-[linear-gradient(to_right,rgba(251,191,36,0.20),rgba(251,191,36,0.05),transparent)]" />

        {/* Avatar + info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10">
            <div className="flex items-end gap-4">
              <Image
                src="/assets/images/team/admin.png"
                alt="Admin"
                width={80}
                height={80}
                className="h-20 w-20 rounded-2xl object-cover ring-4 ring-surface-container"
              />
              <div className="mb-1">
                <h1 className="text-xl font-bold text-white">Shahzaib Balouch</h1>
                <p className="text-sm text-emerald-400">Chief Executive Officer</p>
              </div>
            </div>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 self-start sm:self-auto rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-on-surface hover:bg-white/10 transition"
            >
              <Edit className="h-4 w-4" /> Edit Profile
            </Link>
          </div>

          {/* Contact details */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Mail,     value: "shahzaib@velocity.com" },
              { icon: Phone,    value: "+92 300 0000000"        },
              { icon: Building, value: "Velocity Dispatch"      },
            ].map(({ icon: Icon, value }) => (
              <div key={value} className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2.5">
                <Icon className="h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-sm text-on-surface truncate">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left col */}
        <div className="space-y-6">
          {/* Role & access */}
          <div className="rounded-2xl border border-white/5 bg-surface-container p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-surface-muted">
              Role & Access
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10">
                <Shield className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Admin</p>
                <p className="text-xs text-surface-muted">Full system access</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {["Manage drivers", "View all bookings", "Access financials", "System settings"].map((p) => (
                <div key={p} className="flex items-center gap-2 text-sm text-surface-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-2xl border border-white/5 bg-surface-container p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-surface-muted">
              Performance
            </h2>
            <div className="space-y-3">
              {stats.map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${bg}`}>
                      <Icon className={`h-4 w-4 ${color}`} />
                    </div>
                    <span className="text-sm text-surface-muted">{label}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right col — activity */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-surface-container p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-surface-muted">
            Recent Activity
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-3 top-2 bottom-2 w-px bg-white/5" />
            <div className="space-y-5">
              {activity.map(({ action, time }, i) => (
                <div key={i} className="flex gap-4 pl-1">
                  <div className="relative z-10 mt-1 h-5 w-5 shrink-0 rounded-full border-2 border-amber-400/40 bg-surface-container flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-on-surface">{action}</p>
                    <p className="text-xs text-surface-muted mt-0.5">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
