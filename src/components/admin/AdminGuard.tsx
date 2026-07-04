import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

/**
 * Client-side role gate for the /admin area. Unauthenticated → /login;
 * authenticated non-admins → 403 notice. NOTE: the backend admin endpoints are
 * auth-gated but not yet role-restricted (RolesGuard is a follow-up), so this
 * is the primary admin gate for now.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const role = session?.user?.role;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen grid place-items-center bg-(--color-bg) text-(--color-fg)">
        <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-60">
          Loading…
        </p>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <div className="min-h-screen grid place-items-center bg-(--color-bg) text-(--color-fg) px-6">
        <div className="text-center max-w-md">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-accent-2) mb-3">
            403 — Admins only
          </p>
          <h1 className="font-display text-3xl mb-2">No access</h1>
          <p className="opacity-60 text-sm">
            Your account ({role ?? "unknown"}) can&apos;t view the back office.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
