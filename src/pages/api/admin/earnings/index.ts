import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/** Admin earnings: GET all, POST records a payout. */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["GET", "POST"])) return;
  await proxyToBackend(req, res, "/earnings", {
    method: req.method,
    forwardBody: req.method === "POST",
  });
}
