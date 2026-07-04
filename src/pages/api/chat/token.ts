import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

/**
 * Hands the backend access token to the browser so it can authenticate the
 * Socket.IO handshake. Real-time needs a client-held token; the gateway
 * verifies its signature. (This is the one place we intentionally expose it.)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = await getToken({ req });
  if (!token?.backendToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.status(200).json({ token: token.backendToken });
}
