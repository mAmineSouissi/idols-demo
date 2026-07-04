import { bffFetch } from "./client";
import type { BackendUser, UpdateUserPayload } from "./types";

/**
 * BROWSER-SIDE user calls. These hit the same-origin BFF proxy routes
 * (`/api/me`, `/api/users/*`), which attach the Bearer token server-side.
 */
export const usersApi = {
  /** Current authenticated user (proxies GET /auth/me). */
  me(): Promise<BackendUser> {
    return bffFetch<BackendUser>("/me");
  },

  list(): Promise<BackendUser[]> {
    return bffFetch<BackendUser[]>("/users");
  },

  byId(id: string): Promise<BackendUser> {
    return bffFetch<BackendUser>(`/users/${encodeURIComponent(id)}`);
  },

  updateMe(payload: UpdateUserPayload): Promise<BackendUser> {
    return bffFetch<BackendUser>("/users/me", {
      method: "PATCH",
      body: payload,
    });
  },
};
