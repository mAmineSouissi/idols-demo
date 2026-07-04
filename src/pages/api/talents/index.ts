import type { NextApiRequest, NextApiResponse } from "next";
import { backendFetch } from "@api/backend";
import type { BackendUser } from "@api/types";

/**
 * Public talent directory. Proxies the backend user list (no auth — /talents is
 * a public page) and strips email server-side so PII never hits the browser.
 * ponytail: filter to real creators once /users returns role.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json([]);
  }
  try {
    const users = await backendFetch<BackendUser[]>("/users");
    const talents = (users ?? [])
      .filter((u) => u.handle)
      .map((u) => ({
        id: u.id,
        handle: u.handle,
        displayName: u.displayName,
        avatarUrl: u.avatarUrl,
        bio: u.bio,
        socials: u.socials,
        metrics: u.metrics,
        status: u.status,
      }));
    res.status(200).json(talents);
  } catch {
    res.status(200).json([]); // FE keeps its fallback list
  }
}
