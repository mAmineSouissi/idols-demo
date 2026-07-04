import type { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_ENDPOINTS } from "@api/config";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/** Admin: list all campaigns (auth'd; proxies GET /campaigns). */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["GET"])) return;
  await proxyToBackend(req, res, `${BACKEND_ENDPOINTS.campaigns}?limit=200`);
}
