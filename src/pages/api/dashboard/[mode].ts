import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/**
 * Auth'd dashboard summary BFF.
 *   GET /api/dashboard/brand   → GET /dashboard/brand
 *   GET /api/dashboard/creator → GET /dashboard/creator
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["GET"])) return;
  const mode = req.query.mode === "brand" ? "brand" : "creator";
  await proxyToBackend(req, res, `/dashboard/${mode}`);
}
