import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/waitlist", label: "Waitlist" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/campaigns", label: "Campaigns" },
  { href: "/admin/earnings", label: "Earnings" },
  { href: "/admin/users", label: "Users" },
];

/** Minimal back-office chrome: sidebar nav + content. Skips marketing layout. */
export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-fg) grid grid-cols-1 md:grid-cols-[220px_1fr]">
      <aside className="border-r-2 border-(--color-border) p-5 flex flex-col gap-6 md:min-h-screen">
        <div className="font-display italic text-2xl tracking-[-0.04em]">
          IC<span style={{ color: "var(--color-accent)" }}>✦</span>NS
          <span className="block font-mono text-[10px] not-italic tracking-[0.3em] uppercase opacity-50 mt-1">
            Back office
          </span>
        </div>
        <nav className="flex md:flex-col gap-1 flex-wrap">
          {NAV.map((n) => {
            const active =
              n.href === "/admin"
                ? router.pathname === "/admin"
                : router.pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "px-3 py-2 rounded-lg font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                  active
                    ? "bg-(--color-fg) text-(--color-bg)"
                    : "hover:bg-(--color-panel-2) text-(--color-muted-fg) hover:text-(--color-fg)",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="mt-auto text-left px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-(--color-muted-fg) hover:text-(--color-accent-2) transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </aside>
      <main className="p-6 md:p-10 overflow-x-auto">{children}</main>
    </div>
  );
}
