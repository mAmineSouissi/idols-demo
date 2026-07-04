import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { usersApi } from "@api/users";
import type { BackendUser, UserRole } from "@api/types";

/**
 * Normalized view-model of the authenticated user for the dashboard UI.
 * Shape mirrors the old mock `data.user` plus a few extra real fields.
 */
export interface CurrentUserView {
  name: string;
  firstName: string;
  handle: string;
  avatar: string;
  tier: string;
  email: string;
  avatarUrl: string | null;
  role: UserRole;
  bio: string | null;
  socials: Record<string, string | null>;
  metrics: Record<string, number>;
}

function tierLabel(role: UserRole): string {
  if (role === "brand") return "Brand account";
  if (role === "admin") return "Admin";
  return "Verified creator";
}

function initial(name: string): string {
  return (name.trim()[0] ?? "?").toUpperCase();
}

/**
 * Returns the current user as a display view-model. Resolves instantly from the
 * persisted auth store, then enriches with the full profile from
 * `GET /api/me` (bio, socials, metrics, avatar) once it loads.
 */
export function useCurrentUser(): CurrentUserView | null {
  const storeUser = useAuthStore((s) => s.user);
  const userId = storeUser?.id;
  const [fetched, setFetched] = useState<BackendUser | null>(null);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    usersApi
      .me()
      .then((u) => {
        if (active) setFetched(u);
      })
      .catch(() => {
        /* fall back to the store user */
      });
    return () => {
      active = false;
    };
  }, [userId]);

  if (!storeUser) return null;

  // Only trust the fetched profile if it belongs to the current user
  // (guards against a stale value after switching accounts).
  const profile = fetched && fetched.id === storeUser.id ? fetched : null;

  const role: UserRole =
    (profile?.role?.label?.toLowerCase() as UserRole) || storeUser.role;
  const name =
    profile?.displayName ||
    storeUser.displayName ||
    storeUser.name ||
    storeUser.email;
  const handleRaw = profile?.handle || storeUser.handle || "";
  const handle = handleRaw
    ? `@${handleRaw}`
    : role === "brand"
      ? "Brand account"
      : storeUser.email;

  return {
    name,
    firstName: name.split(" ")[0],
    handle,
    avatar: initial(name),
    tier: tierLabel(role),
    email: profile?.email || storeUser.email,
    avatarUrl: profile?.avatarUrl ?? storeUser.avatarUrl ?? null,
    role,
    bio: profile?.bio ?? null,
    socials: profile?.socials ?? {},
    metrics: profile?.metrics ?? {},
  };
}
