import { useEffect, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { adminApi } from "@api/admin";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";

type PageWithLayout = {
  (): ReactElement;
  getLayout?: (page: ReactElement) => ReactNode;
};

const AdminHome: PageWithLayout = () => {
  const [counts, setCounts] = useState<{
    waitlist: number;
    applications: number;
    pendingApps: number;
    campaigns: number;
  } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [w, a, c] = await Promise.all([
          adminApi.waitlist(),
          adminApi.talentApplications(),
          adminApi.campaigns(),
        ]);
        setCounts({
          waitlist: w.meta.itemCount,
          applications: a.meta.itemCount,
          pendingApps: a.data.filter((x) => x.status === "pending").length,
          campaigns: c.meta.itemCount,
        });
      } catch {
        setError("Failed to load overview.");
      }
    })();
  }, []);

  const cards = [
    { href: "/admin/waitlist", label: "Waitlist signups", value: counts?.waitlist },
    {
      href: "/admin/applications",
      label: "Talent applications",
      value: counts?.applications,
      sub: counts ? `${counts.pendingApps} pending` : undefined,
    },
    { href: "/admin/campaigns", label: "Campaigns", value: counts?.campaigns },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl mb-1">Overview</h1>
      <p className="opacity-60 text-sm mb-8">Icons back office</p>
      {error && (
        <p className="text-(--color-accent-2) font-mono text-xs mb-4">{error}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-3 max-w-3xl">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border-2 border-(--color-border) p-5 hover:bg-(--color-panel-2) transition-colors"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-55">
              {c.label}
            </div>
            <div className="font-display text-4xl mt-2">
              {c.value ?? "—"}
            </div>
            {c.sub && (
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-accent-2) mt-1">
                {c.sub}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

AdminHome.getLayout = (page) => (
  <AdminGuard>
    <AdminLayout>{page}</AdminLayout>
  </AdminGuard>
);

export default AdminHome;
