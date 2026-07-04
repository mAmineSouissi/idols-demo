import type { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_ENDPOINTS } from "@api/config";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/** GET /api/users/:id → proxies GET /users/:id. */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["GET"])) return;
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id) {
    res.status(400).json({ message: "Missing user id" });
    return;
  }
  await proxyToBackend(req, res, BACKEND_ENDPOINTS.userById(id));
}
