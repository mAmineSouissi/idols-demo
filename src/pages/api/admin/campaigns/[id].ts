import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/**
 * Admin: transition a campaign's status.
 * Body: { status: CampaignStatus, statusNote?: string } → PATCH /campaigns/:id/status.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["PATCH"])) return;

  const { id } = req.query;
  const { status, statusNote } = (req.body ?? {}) as {
    status?: string;
    statusNote?: string;
  };
  req.body = { status, statusNote };
  await proxyToBackend(req, res, `/campaigns/${id}/status`, {
    method: "PATCH",
    forwardBody: true,
  });
}
