import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/**
 * Brand-side campaign matches BFF (auth'd, ownership enforced server-side).
 *   GET  /api/campaigns/:id/creators → creators on the campaign
 *   POST /api/campaigns/:id/creators → invite a creator ({ creatorId })
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["GET", "POST"])) return;
  const { id } = req.query;
  await proxyToBackend(req, res, `/campaigns/${id}/creators`, {
    method: req.method,
    forwardBody: req.method === "POST",
  });
}
