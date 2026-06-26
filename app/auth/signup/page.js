"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Building, User } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (form.password.length < 8) {
      setError("Access key must be at least 8 characters");
      return;
    }
    
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          companyName: form.companyName,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Registration failed");
        setLoading(false);
        return;
      }

      router.push(data?.redirect || "/dashboard");
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen text-white flex items-center justify-center bg-surface py-8">
      <div className="w-full max-w-md p-4">
        <div className="glass-panel mx-auto w-full p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-amber-400">
              Velocity Dispatch
            </h1>
            <p className="mt-2 text-sm text-surface-muted">
              Command Center Access — Secure Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-2xl text-orange-800 bg-error-container p-3 text-sm text-on-error-container">
                {error}
              </div>
            )}

            {/* Full Name */}
            <label className="block">
              <span className="text-xs text-surface-muted">FULL NAME</span>
              <div className="relative mt-1">
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-muted" />
                <input
                  type="text"
                  name="fullName"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="rounded-4xl border border-white/10 bg-surface ps-10 px-3 py-3 text-sm text-on-surface outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/15 w-full"
                />
              </div>
            </label>

            {/* Company Name */}
            <label className="block">
              <span className="text-xs text-surface-muted">COMPANY NAME</span>
              <div className="relative mt-1">
                <Building className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-muted" />
                <input
                  type="text"
                  name="companyName"
                  required
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Velocity Inc."
                  className="rounded-4xl border border-white/10 bg-surface ps-10 px-3 py-3 text-sm text-on-surface outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/15 w-full"
                />
              </div>
            </label>

            {/* Email */}
            <label className="block">
              <span className="text-xs text-surface-muted">
                DISPATCHER EMAIL
              </span>
              <div className="relative mt-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-muted" />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@velocity.com"
                  className="rounded-4xl border border-white/10 bg-surface ps-10 px-3 py-3 text-sm text-on-surface outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/15 w-full"
                />
              </div>
            </label>

            {/* Password */}
            <label className="block">
              <span className="text-xs text-surface-muted">ACCESS KEY</span>
              <div className="relative mt-1">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="rounded-4xl border border-white/10 bg-surface ps-10 px-3 py-3 text-sm text-on-surface outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/15 w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-muted"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary mt-2 inline-flex items-center justify-center gap-2"
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-surface-muted">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-amber-400 hover:underline font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
        <div className="w-full max-w-md p-6">
          <div className="flex justify-between">
            <label className="inline-block uppercase text-center font-bold items-center gap-2 text-sm text-surface-muted">
              <p className="text-emerald-600">50K+</p>
              <span className="text-surface-muted font-semibold">Drivers</span>
            </label>
            <label className="inline-block uppercase text-center font-bold items-center gap-2 text-sm text-surface-muted">
              <p className="text-emerald-600">120</p>
              <span className="text-surface-muted font-semibold">Cities</span>
            </label>
            <label className="inline-block uppercase text-center font-bold items-center gap-2 text-sm text-surface-muted">
              <p className="text-emerald-600">99.9%</p>
              <span className="text-surface-muted font-semibold">Uptime</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
