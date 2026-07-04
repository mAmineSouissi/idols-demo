import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/auth.store";

/**
 * Bridges the NextAuth session into the persisted Zustand store so UI code can
 * read auth state synchronously without threading useSession everywhere.
 * Mounted once in _app under SessionProvider.
 */
export function AuthSync() {
  const { data: session, status } = useSession();
  const setUser = useAuthStore((s) => s.setUser);
  const setStatus = useAuthStore((s) => s.setStatus);

  useEffect(() => {
    if (status === "loading") {
      setStatus("loading");
      return;
    }
    if (status === "authenticated" && session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email ?? "",
        name: session.user.name ?? null,
        handle: session.user.handle ?? null,
        displayName: session.user.displayName ?? null,
        avatarUrl: session.user.image ?? null,
        role: session.user.role,
      });
    } else {
      setUser(null);
    }
  }, [session, status, setUser, setStatus]);

  return null;
}
