import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/** Admin: change a user's role ({ role }). */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["PATCH"])) return;
  await proxyToBackend(req, res, `/users/${req.query.id}/role`, {
    method: "PATCH",
    forwardBody: true,
  });
}
