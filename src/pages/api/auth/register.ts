import type { NextApiRequest, NextApiResponse } from "next";
import { authApi } from "@api/auth";
import { ApiError, type SignupPayload, type UserRole } from "@api/types";

// `admin` is intentionally excluded — admins are seeded/promoted, not self-registered.
const ROLES: UserRole[] = ["creator", "brand"];

/**
 * Public signup proxy. Creates the user on the NestJS backend. The client then
 * calls `signIn("credentials")` with the same email/password to establish the
 * NextAuth session, so the backend token lands in the encrypted JWT.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, role, handle, displayName } = (req.body ??
    {}) as Partial<SignupPayload>;

  if (!email || !password || !role || !handle || !displayName) {
    return res.status(400).json({
      message: "email, password, role, handle and displayName are required",
    });
  }
  if (!ROLES.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const { user } = await authApi.signup({
      email,
      password,
      role,
      handle,
      displayName,
    });
    return res.status(201).json({ user });
  } catch (err) {
    if (err instanceof ApiError) {
      return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: "Signup failed" });
  }
}
