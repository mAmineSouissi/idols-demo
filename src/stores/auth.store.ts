import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserRole } from "@api/types";

/**
 * Client-side auth mirror. NextAuth owns the secure session + backend token
 * (encrypted httpOnly cookie); this store persists only the non-sensitive
 * profile that the UI reads (replaces the old `localStorage("icons-session")`
 * mock). It is kept in sync with the NextAuth session by <AuthSync/>.
 */
export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  handle?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  status: "loading" | "authenticated" | "unauthenticated";
  setUser: (user: AuthUser | null) => void;
  setStatus: (status: AuthState["status"]) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      status: "loading",
      setUser: (user) =>
        set({
          user,
          status: user ? "authenticated" : "unauthenticated",
        }),
      setStatus: (status) => set({ status }),
      clear: () => set({ user: null, status: "unauthenticated" }),
    }),
    {
      name: "icons-auth",
      // Persist only the user; status is derived on each load.
      partialize: (state) => ({ user: state.user }),
    },
  ),
);

/** Convenience selectors. */
export const useAuthUser = () => useAuthStore((s) => s.user);
export const useIsAuthenticated = () =>
  useAuthStore((s) => s.status === "authenticated");
