import type { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_ENDPOINTS } from "@api/config";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/** Admin: list talent applications (auth'd; proxies GET /talent-applications). */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["GET"])) return;
  await proxyToBackend(
    req,
    res,
    `${BACKEND_ENDPOINTS.talentApplications}?limit=200`,
  );
}
