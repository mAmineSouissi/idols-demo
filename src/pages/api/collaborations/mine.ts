import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/** Creator's own invites/collaborations. */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["GET"])) return;
  await proxyToBackend(req, res, "/collaborations/mine");
}
