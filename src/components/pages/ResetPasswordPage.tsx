"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export function ResetPasswordPage() {
  const router = useRouter();
  const token = typeof router.query.token === "string" ? router.query.token : "";

  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      setError("This reset link is missing its token.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        setError(data?.message ?? "This reset link is invalid or has expired.");
        return;
      }
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-svh grid place-items-center bg-(--color-bg) text-(--color-fg) px-6">
      <div className="w-full max-w-md">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-(--color-accent-2) mb-3">
          ✦ Set a new password
        </div>

        {done ? (
          <div>
            <h1 className="font-display italic text-4xl mb-3">All set.</h1>
            <p className="opacity-65 text-sm mb-6">
              Your password has been updated. You can sign in now.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-(--color-fg) text-(--color-bg) font-mono text-[11px] uppercase tracking-[0.18em]"
            >
              Go to sign in →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h1 className="font-display italic text-4xl mb-1">Choose a new password.</h1>
            <p className="opacity-60 text-sm mb-2">At least 8 characters.</p>

            <input
              type="password"
              autoComplete="new-password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-(--color-border) bg-transparent outline-none focus:border-(--color-fg)"
            />
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Confirm new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-(--color-border) bg-transparent outline-none focus:border-(--color-fg)"
            />

            {error && (
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-(--color-accent-2)">
                ⚠ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-5 py-3 rounded-full bg-(--color-fg) text-(--color-bg) font-mono text-[11px] uppercase tracking-[0.18em] disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Updating…" : "Update password"}
            </button>

            <Link
              href="/login"
              className="text-center font-mono text-[10px] uppercase tracking-[0.2em] opacity-55 hover:opacity-100 mt-1"
            >
              ← Back to sign in
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
