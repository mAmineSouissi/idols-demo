import type { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_ENDPOINTS } from "@api/config";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/**
 * Brand campaigns BFF. Campaigns are brand-owned, so both verbs require auth —
 * proxyToBackend attaches the brand's backend token (401 if not signed in).
 *   POST /api/campaigns  → POST /campaigns        (create brief)
 *   GET  /api/campaigns  → GET  /campaigns/mine   (the brand's own campaigns)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["GET", "POST"])) return;

  if (req.method === "POST") {
    await proxyToBackend(req, res, BACKEND_ENDPOINTS.campaigns, {
      method: "POST",
      forwardBody: true,
    });
    return;
  }

  await proxyToBackend(req, res, BACKEND_ENDPOINTS.campaignsMine);
}
