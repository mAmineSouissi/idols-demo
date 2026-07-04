import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, proxyToBackend } from "@/lib/bff";

// Comma-joined relations the thread list needs (repeated ?join= params 500 the API).
const JOINS = "participants,participants.user,lastMessage";

/**
 * Chat conversations BFF (auth'd).
 *   GET  /api/chat/conversations → the caller's conversations (w/ participants + last message)
 *   POST /api/chat/conversations → start/reuse a 1:1 ({ targetUserId })
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!methodGuard(req, res, ["GET", "POST"])) return;

  if (req.method === "POST") {
    await proxyToBackend(req, res, "/chat/conversations", {
      method: "POST",
      forwardBody: true,
    });
    return;
  }

  await proxyToBackend(
    req,
    res,
    `/chat/conversations?join=${encodeURIComponent(JOINS)}&limit=100`,
  );
}
