import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/** Creator accepts/declines an invite ({ status }). */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["PATCH"])) return;
  await proxyToBackend(req, res, `/collaborations/${req.query.id}`, {
    method: "PATCH",
    forwardBody: true,
  });
}
