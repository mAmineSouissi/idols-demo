import { useEffect, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { adminApi, type WaitlistEntry } from "@api/admin";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";

type PageWithLayout = {
  (): ReactElement;
  getLayout?: (page: ReactElement) => ReactNode;
};

function toCsv(rows: WaitlistEntry[]): string {
  const cols = [
    "audience",
    "name",
    "email",
    "company",
    "discipline",
    "handle",
    "category",
    "createdAt",
  ] as const;
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [
    cols.join(","),
    ...rows.map((r) => cols.map((c) => esc(r[c])).join(",")),
  ].join("\n");
}

const AdminWaitlist: PageWithLayout = () => {
  const [rows, setRows] = useState<WaitlistEntry[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .waitlist()
      .then((p) => setRows(p.data))
      .catch(() => setError("Failed to load waitlist."));
  }, []);

  const exportCsv = () => {
    if (!rows) return;
    const blob = new Blob([toCsv(rows)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="font-display text-4xl mb-1">Waitlist</h1>
          <p className="opacity-60 text-sm">{rows?.length ?? 0} signups</p>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          disabled={!rows?.length}
          className="px-4 py-2 rounded-full border-2 border-(--color-border) font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors disabled:opacity-40 cursor-pointer"
        >
          Export CSV
        </button>
      </div>

      {error && <p className="text-(--color-accent-2) font-mono text-xs">{error}</p>}
      {!rows && !error && <p className="opacity-60 text-sm">Loading…</p>}
      {rows && rows.length === 0 && (
        <p className="opacity-60 text-sm">No signups yet.</p>
      )}

      {rows && rows.length > 0 && (
        <div className="overflow-x-auto border-2 border-(--color-border) rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-(--color-panel-2) font-mono text-[10px] uppercase tracking-[0.16em] text-left">
              <tr>
                <th className="p-3">Audience</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Company / Discipline</th>
                <th className="p-3">Handle / Category</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-(--color-border-soft)">
                  <td className="p-3 font-mono text-[11px] uppercase">{r.audience}</td>
                  <td className="p-3">{r.name}</td>
                  <td className="p-3 opacity-80">{r.email}</td>
                  <td className="p-3 opacity-80">{r.company || r.discipline || "—"}</td>
                  <td className="p-3 opacity-80">{r.handle || r.category || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

AdminWaitlist.getLayout = (page) => (
  <AdminGuard>
    <AdminLayout>{page}</AdminLayout>
  </AdminGuard>
);

export default AdminWaitlist;
