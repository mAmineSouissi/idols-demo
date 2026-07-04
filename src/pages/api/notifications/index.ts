import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/**
 * Notifications BFF (auth'd).
 *   GET  /api/notifications → the caller's notifications
 *   POST /api/notifications → create a test notification (dev helper)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["GET", "POST"])) return;
  if (req.method === "POST") {
    await proxyToBackend(req, res, "/notifications/test", { method: "POST" });
    return;
  }
  await proxyToBackend(req, res, "/notifications?limit=20&sort=createdAt,desc");
}
