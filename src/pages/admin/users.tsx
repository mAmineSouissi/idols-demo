import { useEffect, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { adminApi, type AdminUser } from "@api/admin";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";

type PageWithLayout = {
  (): ReactElement;
  getLayout?: (page: ReactElement) => ReactNode;
};

const ROLES: Array<"Admin" | "creator" | "brand"> = ["Admin", "creator", "brand"];

const AdminUsers: PageWithLayout = () => {
  const [rows, setRows] = useState<AdminUser[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const load = () =>
    adminApi.users().then(setRows).catch(() => setError("Failed to load users."));
  useEffect(() => {
    load();
  }, []);

  const setRole = async (id: string, role: "Admin" | "creator" | "brand") => {
    setBusy(id);
    try {
      const updated = await adminApi.setUserRole(id, role);
      setRows((rs) => rs?.map((r) => (r.id === id ? updated : r)) ?? rs);
    } catch {
      setError("Failed to change role.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <h1 className="font-display text-4xl mb-1">Users</h1>
      <p className="opacity-60 text-sm mb-6">{rows?.length ?? 0} total</p>

      {error && <p className="text-(--color-accent-2) font-mono text-xs mb-4">{error}</p>}
      {!rows && !error && <p className="opacity-60 text-sm">Loading…</p>}

      {rows && rows.length > 0 && (
        <div className="overflow-x-auto border-2 border-(--color-border) rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-(--color-panel-2) font-mono text-[10px] uppercase tracking-[0.16em] text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Set role</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const current = r.role?.label;
                return (
                  <tr key={r.id} className="border-t border-(--color-border-soft)">
                    <td className="p-3">
                      <div>{r.displayName || r.handle || "—"}</div>
                      {r.handle && <div className="opacity-55 text-xs">@{r.handle}</div>}
                    </td>
                    <td className="p-3 opacity-80">{r.email || "—"}</td>
                    <td className="p-3">
                      <span
                        className="inline-block px-2 py-1 rounded-full font-mono text-[10px] uppercase text-(--color-fg)"
                        style={{
                          background:
                            current === "Admin"
                              ? "var(--color-accent-2)"
                              : "var(--color-panel-2)",
                        }}
                      >
                        {current ?? "—"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2 flex-wrap">
                        {ROLES.map((role) => (
                          <button
                            key={role}
                            type="button"
                            disabled={busy === r.id || current === role}
                            onClick={() => setRole(r.id, role)}
                            className="px-3 py-1.5 rounded-full border-2 border-(--color-border) font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors disabled:opacity-30 disabled:cursor-default cursor-pointer"
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

AdminUsers.getLayout = (page) => (
  <AdminGuard>
    <AdminLayout>{page}</AdminLayout>
  </AdminGuard>
);

export default AdminUsers;
