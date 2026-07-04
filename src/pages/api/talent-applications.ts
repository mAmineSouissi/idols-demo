import type { NextApiRequest, NextApiResponse } from "next";
import { backendFetch } from "@api/backend";
import { BACKEND_ENDPOINTS } from "@api/config";
import { ApiError } from "@api/types";

/** Fields the backend CreateTalentApplicationDto accepts (forbidNonWhitelisted). */
const FIELDS = [
  "name",
  "email",
  "primaryPlatform",
  "handle",
  "otherHandles",
  "niche",
  "category",
  "followers",
  "engagement",
  "avgViews",
  "formats",
  "tone",
  "sampleLinks",
  "why",
] as const;

/**
 * Public BFF route for the /talents/apply form. Anonymous applicants have no
 * token, so this proxies to NestJS via backendFetch (no token). Forwards only
 * the whitelisted DTO fields and maps errors to { errors: [{ message }] }.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ errors: [{ message: "Method not allowed" }] });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const payload: Record<string, unknown> = {};
  for (const f of FIELDS) {
    if (body[f] !== undefined) payload[f] = body[f];
  }

  try {
    await backendFetch(BACKEND_ENDPOINTS.talentApplications, {
      method: "POST",
      body: payload,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    if (err instanceof ApiError) {
      const message =
        err.status === 409
          ? "You've already applied with this email."
          : err.status === 400
            ? "Please check your details and try again."
            : "Something went wrong. Please try again.";
      return res.status(err.status).json({ errors: [{ message }] });
    }
    return res
      .status(502)
      .json({ errors: [{ message: "Network error — please retry." }] });
  }
}
