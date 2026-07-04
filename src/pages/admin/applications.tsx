import { useEffect, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import {
  adminApi,
  type TalentApplication,
  type TalentApplicationStatus,
} from "@api/admin";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";

type PageWithLayout = {
  (): ReactElement;
  getLayout?: (page: ReactElement) => ReactNode;
};

const STATUS_COLOR: Record<TalentApplicationStatus, string> = {
  pending: "var(--color-accent-4)",
  approved: "var(--color-accent)",
  rejected: "var(--color-accent-2)",
};

const AdminApplications: PageWithLayout = () => {
  const [rows, setRows] = useState<TalentApplication[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .talentApplications()
      .then((p) => setRows(p.data))
      .catch(() => setError("Failed to load applications."));
  }, []);

  const act = async (id: string, action: "approve" | "reject") => {
    setBusy(id);
    try {
      const updated =
        action === "approve"
          ? await adminApi.approveApplication(id)
          : await adminApi.rejectApplication(id);
      setRows((rs) => rs?.map((r) => (r.id === id ? updated : r)) ?? rs);
    } catch {
      setError("Action failed (already reviewed?).");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <h1 className="font-display text-4xl mb-1">Talent applications</h1>
      <p className="opacity-60 text-sm mb-6">{rows?.length ?? 0} total</p>

      {error && (
        <p className="text-(--color-accent-2) font-mono text-xs mb-4">{error}</p>
      )}
      {!rows && !error && <p className="opacity-60 text-sm">Loading…</p>}
      {rows && rows.length === 0 && (
        <p className="opacity-60 text-sm">No applications yet.</p>
      )}

      {rows && rows.length > 0 && (
        <div className="overflow-x-auto border-2 border-(--color-border) rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-(--color-panel-2) font-mono text-[10px] uppercase tracking-[0.16em] text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Platform / Niche</th>
                <th className="p-3">Followers</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-(--color-border-soft) align-top">
                  <td className="p-3">
                    <div>{r.name}</div>
                    <div className="opacity-60 text-xs">{r.email}</div>
                  </td>
                  <td className="p-3 opacity-80">
                    {r.primaryPlatform} · {r.handle}
                    {r.niche && <div className="opacity-60 text-xs">{r.niche}</div>}
                  </td>
                  <td className="p-3 opacity-80">{r.followers || "—"}</td>
                  <td className="p-3">
                    <span
                      className="inline-block px-2 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.12em] text-(--color-fg)"
                      style={{ background: STATUS_COLOR[r.status] }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {r.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={busy === r.id}
                          onClick={() => act(r.id, "approve")}
                          className="px-3 py-1.5 rounded-full border-2 border-(--color-border) font-mono text-[10px] uppercase tracking-[0.12em] hover:bg-(--color-accent) transition-colors disabled:opacity-40 cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          disabled={busy === r.id}
                          onClick={() => act(r.id, "reject")}
                          className="px-3 py-1.5 rounded-full border-2 border-(--color-border) font-mono text-[10px] uppercase tracking-[0.12em] hover:bg-(--color-accent-2) hover:text-white transition-colors disabled:opacity-40 cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="opacity-50 font-mono text-[10px] uppercase">
                        reviewed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

AdminApplications.getLayout = (page) => (
  <AdminGuard>
    <AdminLayout>{page}</AdminLayout>
  </AdminGuard>
);

export default AdminApplications;
