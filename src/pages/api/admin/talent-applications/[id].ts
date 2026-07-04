import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/**
 * Admin: approve / reject a talent application.
 * Body: { action: "approve" | "reject", reviewNotes?: string }.
 * Strips `action` before forwarding (backend DTO rejects unknown fields).
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["PATCH"])) return;

  const { id } = req.query;
  const { action, reviewNotes } = (req.body ?? {}) as {
    action?: string;
    reviewNotes?: string;
  };
  const sub = action === "reject" ? "reject" : "approve";

  // forward only the whitelisted review field
  req.body = { reviewNotes };
  await proxyToBackend(req, res, `/talent-applications/${id}/${sub}`, {
    method: "PATCH",
    forwardBody: true,
  });
}
