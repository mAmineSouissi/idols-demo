import { useEffect, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { adminApi, type Earning, type AdminUser } from "@api/admin";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLayout } from "@/components/admin/AdminLayout";

type PageWithLayout = {
  (): ReactElement;
  getLayout?: (page: ReactElement) => ReactNode;
};

const usd = (cents: number) =>
  `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 0 })}`;

const AdminEarnings: PageWithLayout = () => {
  const [rows, setRows] = useState<Earning[] | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    creatorId: "",
    amount: "",
    description: "",
    status: "paid" as "paid" | "pending",
  });

  const load = () => {
    adminApi.earnings().then(setRows).catch(() => setError("Failed to load earnings."));
  };
  useEffect(() => {
    load();
    adminApi.users().then(setUsers).catch(() => {});
  }, []);

  const nameOf = (id: string) => {
    const u = users.find((x) => x.id === id);
    return u?.displayName || u?.handle || u?.email || id.slice(0, 8);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountCents = Math.round(Number(form.amount) * 100);
    if (!form.creatorId || !amountCents || amountCents < 1) {
      setError("Pick a creator and a valid amount.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await adminApi.recordEarning({
        creatorId: form.creatorId,
        amountCents,
        description: form.description || undefined,
        status: form.status,
      });
      setForm({ creatorId: "", amount: "", description: "", status: "paid" });
      load();
    } catch {
      setError("Failed to record payout.");
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    "px-3 py-2 rounded-lg border-2 border-(--color-border) bg-(--color-bg) text-sm outline-none focus:border-(--color-fg)";

  return (
    <div>
      <h1 className="font-display text-4xl mb-1">Earnings</h1>
      <p className="opacity-60 text-sm mb-6">{rows?.length ?? 0} payouts</p>

      {/* Record payout */}
      <form
        onSubmit={submit}
        className="flex flex-wrap items-end gap-3 mb-8 p-4 rounded-2xl border-2 border-(--color-border)"
      >
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-55">Creator</span>
          <select
            value={form.creatorId}
            onChange={(e) => setForm({ ...form, creatorId: e.target.value })}
            className={inputCls}
          >
            <option value="">Select…</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.displayName || u.handle || u.email || u.id.slice(0, 8)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-55">Amount ($)</span>
          <input
            type="number"
            min="1"
            step="1"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className={`${inputCls} w-28`}
          />
        </label>
        <label className="flex flex-col gap-1 flex-1 min-w-40">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-55">Description</span>
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-55">Status</span>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as "paid" | "pending" })}
            className={inputCls}
          >
            <option value="paid">paid</option>
            <option value="pending">pending</option>
          </select>
        </label>
        <button
          type="submit"
          disabled={busy}
          className="px-4 py-2 rounded-full bg-(--color-fg) text-(--color-bg) font-mono text-[11px] uppercase tracking-[0.16em] disabled:opacity-40 cursor-pointer"
        >
          Record payout
        </button>
      </form>

      {error && <p className="text-(--color-accent-2) font-mono text-xs mb-4">{error}</p>}
      {!rows && !error && <p className="opacity-60 text-sm">Loading…</p>}
      {rows && rows.length === 0 && <p className="opacity-60 text-sm">No payouts yet.</p>}

      {rows && rows.length > 0 && (
        <div className="overflow-x-auto border-2 border-(--color-border) rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-(--color-panel-2) font-mono text-[10px] uppercase tracking-[0.16em] text-left">
              <tr>
                <th className="p-3">Creator</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Description</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-(--color-border-soft)">
                  <td className="p-3">{nameOf(r.creatorId)}</td>
                  <td className="p-3 font-mono">{usd(r.amountCents)}</td>
                  <td className="p-3">
                    <span
                      className="inline-block px-2 py-1 rounded-full font-mono text-[10px] uppercase text-(--color-fg)"
                      style={{ background: r.status === "paid" ? "var(--color-accent)" : "var(--color-accent-4)" }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 opacity-80">{r.description || "—"}</td>
                  <td className="p-3 opacity-60 font-mono text-xs">
                    {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"}
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

AdminEarnings.getLayout = (page) => (
  <AdminGuard>
    <AdminLayout>{page}</AdminLayout>
  </AdminGuard>
);

export default AdminEarnings;
