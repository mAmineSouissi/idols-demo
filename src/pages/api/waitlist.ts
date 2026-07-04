import type { NextApiRequest, NextApiResponse } from "next";
import { backendFetch } from "@api/backend";
import { BACKEND_ENDPOINTS } from "@api/config";
import { ApiError } from "@api/types";

type Audience = "talent" | "brand";

/**
 * Public BFF route for the /waitlist form. Anonymous visitors have no auth
 * token, so this proxies straight to the NestJS waitlist endpoint via
 * backendFetch (no token) rather than the auth-required proxyToBackend.
 *
 * It drops honeypot bots and forwards only the backend DTO fields — the API
 * runs forbidNonWhitelisted, so any extra key (e.g. `_gotcha`) would 400.
 * Errors are mapped to the Formspree-style { errors: [{ message }] } shape the
 * WaitlistPage already parses.
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

  const body = (req.body ?? {}) as Record<string, string>;

  // Honeypot — bots fill `_gotcha`; pretend success so they don't retry.
  if (body._gotcha) return res.status(200).json({ ok: true });

  const audience: Audience = body.audience === "brand" ? "brand" : "talent";

  const payload =
    audience === "brand"
      ? {
          audience,
          name: body.name,
          email: body.email,
          company: body.company,
          category: body.category,
        }
      : {
          audience,
          name: body.name,
          email: body.email,
          discipline: body.discipline,
          handle: body.handle,
        };

  try {
    await backendFetch(BACKEND_ENDPOINTS.waitlist, {
      method: "POST",
      body: payload,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    if (err instanceof ApiError) {
      const message =
        err.status === 409
          ? "You're already on the list."
          : err.status === 400
            ? "Please check your details and try again."
            : "Something went wrong. Try again.";
      return res.status(err.status).json({ errors: [{ message }] });
    }
    return res
      .status(502)
      .json({ errors: [{ message: "Network error — please retry." }] });
  }
}
