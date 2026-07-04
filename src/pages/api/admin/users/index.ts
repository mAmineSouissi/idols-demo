import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, proxyToBackend } from "@/lib/bff";

/** Admin: full user list (email + role). */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["GET"])) return;
  await proxyToBackend(req, res, "/users/admin/all");
}
