"use client";

import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession, signOut } from "next-auth/react";
import type { ReactNode } from "react";
import { useAuthActions } from "@/hooks/useAuthActions";

/**
 * Dedicated back-office entrance — separate from the public /login. Same
 * backend auth, but admin-only: a non-admin who signs in here is rejected and
 * signed back out rather than dropped into /admin.
 */
function AdminLogin() {
  const router = useRouter();
  const { login } = useAuthActions();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(email.trim(), password);
    if (!res.ok) {
      setError(res.error ?? "Invalid credentials.");
      setLoading(false);
      return;
    }
    const session = await getSession();
    if (session?.user?.role !== "admin") {
      await signOut({ redirect: false });
      setError("This account doesn't have back-office access.");
      setLoading(false);
      return;
    }
    router.push("/admin");
  }

  return (
    <>
      <Head>
        <title>Back office — Icons</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div
        className="min-h-svh grid place-items-center px-6"
        style={{ background: "#0a0a0a", color: "#f5f1ea" }}
      >
        <form onSubmit={onSubmit} className="w-full max-w-sm flex flex-col gap-4">
          <div>
            <div className="font-display italic text-3xl tracking-[-0.04em]">
              IC<span style={{ color: "var(--color-accent)" }}>✦</span>NS
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] opacity-50 mt-1">
              Back office · staff only
            </p>
          </div>

          <input
            type="email"
            autoComplete="username"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-transparent outline-none border-2 focus:border-white/70"
            style={{ borderColor: "rgba(245,241,234,0.25)" }}
          />
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-transparent outline-none border-2 focus:border-white/70"
            style={{ borderColor: "rgba(245,241,234,0.25)" }}
          />

          {error && (
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-(--color-accent-2)">
              ⚠ {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 px-5 py-3 rounded-full font-mono text-[11px] uppercase tracking-[0.2em] disabled:opacity-60 cursor-pointer"
            style={{ background: "var(--color-accent)", color: "#0a0a0a" }}
          >
            {loading ? "Signing in…" : "Enter back office"}
          </button>
        </form>
      </div>
    </>
  );
}

// No AdminGuard here — this is the unguarded entrance. Skip marketing chrome.
AdminLogin.getLayout = (page: ReactNode) => page;

export default AdminLogin;
