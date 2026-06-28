"use client";

import { useState } from "react";
import {
  ChevronDown, MessageSquare, Mail,
  BookOpen, Send, CheckCircle,
} from "lucide-react";

const faqs = [
  {
    q: "How do I assign a driver to a booking?",
    a: "Go to the Booking page, find the pending ride, and click the assign button. You'll see a list of available drivers sorted by proximity.",
  },
  {
    q: "Why is a driver showing offline on the map?",
    a: "A driver goes offline when they close the app or lose internet. Check the Drivers page for their last known location and contact info.",
  },
  {
    q: "How do I export booking reports?",
    a: "On the Booking Management page, click 'Export CSV' in the top-right header. This exports all visible bookings with current filters applied.",
  },
  {
    q: "Can I change my account role?",
    a: "Roles are assigned by the system administrator. Contact your admin or reach out to Velocity support to request a role change.",
  },
  {
    q: "What does fleet capacity percentage mean?",
    a: "It shows how many of your total registered drivers are currently online and available. 75% means 75 out of 100 registered drivers are active.",
  },
  {
    q: "How is average pickup time calculated?",
    a: "It's the average time between a booking being accepted and the driver arriving at the pickup location, measured across all rides today.",
  },
];

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-medium text-on-surface">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-surface-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm text-surface-muted leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function SupportPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ subject: "", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Support</h1>
        <p className="mt-1 text-sm text-surface-muted">
          Get help, browse FAQs or send us a message.
        </p>
      </div>

      {/* Support channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: MessageSquare,
            label: "Live Chat",
            desc: "Avg. response in 5 min",
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            cta: "Start chat",
          },
          {
            icon: Mail,
            label: "Email Support",
            desc: "support@velocity.com",
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            cta: "Send email",
          },
          {
            icon: BookOpen,
            label: "Documentation",
            desc: "Guides and references",
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            cta: "Browse docs",
          },
        ].map(({ icon: Icon, label, desc, color, bg, cta }) => (
          <div
            key={label}
            className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-surface-container p-5"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <div>
              <p className="font-semibold text-white">{label}</p>
              <p className="text-sm text-surface-muted mt-0.5">{desc}</p>
            </div>
            <button className="mt-auto rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-on-surface hover:bg-white/10 transition">
              {cta}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ */}
        <div className="rounded-2xl border border-white/5 bg-surface-container p-6">
          <h2 className="text-base font-semibold text-white mb-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-surface-muted mb-5">
            Quick answers to the most common questions.
          </p>
          <div>
            {faqs.map((f) => (
              <FAQ key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="rounded-2xl border border-white/5 bg-surface-container p-6">
          <h2 className="text-base font-semibold text-white mb-1">
            Send a Message
          </h2>
          <p className="text-sm text-surface-muted mb-5">
            Can't find what you need? Our team will get back to you within 24 hours.
          </p>

          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/10">
                <CheckCircle className="h-7 w-7 text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Message sent!</p>
                <p className="text-sm text-surface-muted mt-1">
                  We'll reply to your email within 24 hours.
                </p>
              </div>
              <button
                onClick={() => { setSent(false); setForm({ subject: "", message: "" }); }}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-on-surface hover:bg-white/10 transition"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-surface-muted">
                  Subject
                </label>
                <input
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Driver not appearing on map"
                  className="input-field"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-surface-muted">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your issue in detail..."
                  className="input-field resize-none py-3"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
              >
                <Send className="h-4 w-4" /> Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
