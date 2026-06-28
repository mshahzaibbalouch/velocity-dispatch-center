"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, User, Building } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/app/components/ui/Icon";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordType, setPasswordType] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, key, remember }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      // Redirect to dashboard or provided route
      router.push(data?.redirect || "/");
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md p-8">
        <div className="glass-panel mx-auto w-full p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-amber-400 flex items-center justify-center gap-2 ">
              <Image
                src="/assets/images/favicon.svg"
                alt="Velocity"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              Velocity Dispatch
            </h1>
            <p className="mt-2 text-sm text-surface-muted">
              Command Center Access — Secure Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-2xl bg-error-container p-3 text-sm text-on-error-container">
                {error}
              </div>
            )}

            <label className="block">
              <span className="text-xs text-surface-muted">Work Email</span>
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="rounded-4xl border border-white/10 bg-surface ps-10 px-3 py-3 text-sm text-on-surface outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/15 w-full"
                />
              </div>
            </label>
            <label className="block">
              <div className="flex justify-between">
                <span className="text-xs text-surface-muted">ACCESS KEY</span>
              </div>

              <div className="mt-2 flex items-center">
                <div className="relative flex-1">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-muted" />
                  <input
                    type={passwordType ? "password" : "text"}
                    required
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="••••••••"
                    className="rounded-4xl border border-white/10 bg-surface ps-10 px-3 py-3 text-sm text-on-surface outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/15 w-full"
                  />
                  <Icon
                    icon={passwordType ? Eye : EyeOff}
                    className="cursor-pointer absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-muted"
                    onClick={() => setPasswordType(!passwordType)}
                  />
                </div>
              </div>
            </label>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-surface-muted">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember my username
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary mt-2 inline-flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-surface-muted">
            New to Velocity Dispatch?{" "}
            <Link
              href="/auth/signup"
              className="text-amber-400 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
