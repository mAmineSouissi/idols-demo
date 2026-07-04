import type { NextApiRequest, NextApiResponse } from "next";
import { authApi } from "@api/auth";
import { ApiError } from "@api/types";

/** Public proxy → POST /auth/forgot-password. Always returns a generic 200. */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = (req.body ?? {}) as { email?: string };
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const data = await authApi.forgotPassword(email);
    return res.status(200).json(data);
  } catch (err) {
    if (err instanceof ApiError) {
      return res.status(err.status).json({ message: err.message });
    }
    return res.status(502).json({ message: "Request failed" });
  }
}
