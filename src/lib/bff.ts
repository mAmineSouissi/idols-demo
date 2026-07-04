import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { backendFetch } from "@api/backend";
import { ApiError } from "@api/types";

/**
 * Reads the NestJS access token from the encrypted NextAuth JWT (server-side
 * only — never exposed to the browser) and forwards the request to the backend
 * with a Bearer header. This is the BFF boundary: the client talks to these
 * same-origin routes, they talk to NestJS.
 */
export async function proxyToBackend(
  req: NextApiRequest,
  res: NextApiResponse,
  backendPath: string,
  options: { method?: string; forwardBody?: boolean } = {},
): Promise<void> {
  const { method = req.method ?? "GET", forwardBody = false } = options;

  const token = await getToken({ req });
  if (!token?.backendToken) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  try {
    const data = await backendFetch<unknown>(backendPath, {
      method,
      token: token.backendToken,
      body: forwardBody ? req.body : undefined,
    });
    // 204 No Content from the backend → mirror it.
    if (data === undefined || data === "") {
      res.status(204).end();
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof ApiError) {
      res.status(err.status).json({ message: err.message });
      return;
    }
    res.status(502).json({ message: "Upstream request failed" });
  }
}

/** Guard helper: reject methods not in the allow-list. */
export function methodGuard(
  req: NextApiRequest,
  res: NextApiResponse,
  allowed: string[],
): boolean {
  if (!allowed.includes(req.method ?? "")) {
    res.setHeader("Allow", allowed.join(", "));
    res.status(405).json({ message: "Method not allowed" });
    return false;
  }
  return true;
}
