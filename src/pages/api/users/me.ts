import type { NextApiRequest, NextApiResponse } from "next";
import { BACKEND_ENDPOINTS } from "@api/config";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/** PATCH / DELETE /api/users/me → proxies the same against the backend. */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["PATCH", "DELETE"])) return;
  const path =
    req.method === "DELETE"
      ? BACKEND_ENDPOINTS.deleteMe
      : BACKEND_ENDPOINTS.updateMe;
  await proxyToBackend(req, res, path, {
    method: req.method,
    forwardBody: req.method === "PATCH",
  });
}
