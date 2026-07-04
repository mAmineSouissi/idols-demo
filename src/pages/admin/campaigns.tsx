import { useEffect, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { adminApi, type Campaign, type CampaignStatus } from "@api/admin";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";

type PageWithLayout = {
  (): ReactElement;
  getLayout?: (page: ReactElement) => ReactNode;
};

const STATUSES: CampaignStatus[] = [
  "submitted",
  "in_review",
  "matching",
  "live",
  "completed",
  "cancelled",
];

const AdminCampaigns: PageWithLayout = () => {
  const [rows, setRows] = useState<Campaign[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .campaigns()
      .then((p) => setRows(p.data))
      .catch(() => setError("Failed to load campaigns."));
  }, []);

  const setStatus = async (id: string, status: CampaignStatus) => {
    setBusy(id);
    try {
      const updated = await adminApi.updateCampaignStatus(id, status);
      setRows((rs) => rs?.map((r) => (r.id === id ? updated : r)) ?? rs);
    } catch {
      setError("Status update failed.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <h1 className="font-display text-4xl mb-1">Campaigns</h1>
      <p className="opacity-60 text-sm mb-6">{rows?.length ?? 0} total</p>

      {error && (
        <p className="text-(--color-accent-2) font-mono text-xs mb-4">{error}</p>
      )}
      {!rows && !error && <p className="opacity-60 text-sm">Loading…</p>}
      {rows && rows.length === 0 && (
        <p className="opacity-60 text-sm">No campaigns yet.</p>
      )}

      {rows && rows.length > 0 && (
        <div className="overflow-x-auto border-2 border-(--color-border) rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-(--color-panel-2) font-mono text-[10px] uppercase tracking-[0.16em] text-left">
              <tr>
                <th className="p-3">Brand</th>
                <th className="p-3">Type / Budget</th>
                <th className="p-3">Targeting</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-(--color-border-soft) align-top">
                  <td className="p-3">
                    <div>{r.brandName}</div>
                    <div className="opacity-60 text-xs">{r.industry}</div>
                  </td>
                  <td className="p-3 opacity-80">
                    {r.campaignType}
                    <div className="opacity-60 text-xs">{r.budget}</div>
                  </td>
                  <td className="p-3 opacity-80">
                    {r.tier} · {r.quantity} creators
                    <div className="opacity-60 text-xs">
                      {(r.platforms || []).join(", ")}
                    </div>
                  </td>
                  <td className="p-3">
                    <select
                      value={r.status}
                      disabled={busy === r.id}
                      onChange={(e) =>
                        setStatus(r.id, e.target.value as CampaignStatus)
                      }
                      className="bg-(--color-bg) border-2 border-(--color-border) rounded-lg px-2 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] cursor-pointer disabled:opacity-40"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
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

AdminCampaigns.getLayout = (page) => (
  <AdminGuard>
    <AdminLayout>{page}</AdminLayout>
  </AdminGuard>
);

export default AdminCampaigns;
