import { useCallback } from "react";
import { signIn, signOut } from "next-auth/react";
import { useAuthStore } from "@/stores/auth.store";
import type { SignupPayload } from "@api/types";

export interface AuthActionResult {
  ok: boolean;
  error?: string;
}

/**
 * UI-facing auth actions. Wraps NextAuth signIn/signOut and the signup proxy,
 * and keeps the Zustand store in sync. Components call these instead of
 * touching NextAuth or fetch directly.
 */
export function useAuthActions() {
  const clear = useAuthStore((s) => s.clear);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthActionResult> => {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!res || res.error) {
        return { ok: false, error: res?.error ?? "Invalid email or password." };
      }
      return { ok: true };
    },
    [],
  );

  const signup = useCallback(
    async (payload: SignupPayload): Promise<AuthActionResult> => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          message?: string;
        };
        return { ok: false, error: body.message ?? "Sign up failed." };
      }
      // Establish the NextAuth session with the new credentials.
      return login(payload.email, payload.password);
    },
    [login],
  );

  const logout = useCallback(async () => {
    clear();
    await signOut({ redirect: false });
  }, [clear]);

  return { login, signup, logout };
}
