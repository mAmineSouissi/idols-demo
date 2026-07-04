/**
 * API base URLs.
 *
 * - BACKEND_URL  → the NestJS server, used SERVER-SIDE only (NextAuth
 *   `authorize`, BFF proxy routes). Never exposed to the browser.
 * - BFF_BASE     → same-origin Next.js API routes the browser talks to.
 */

/** Server-side only. The NestJS API origin + global prefix. */
export const BACKEND_URL = (
  process.env.BACKEND_URL ?? "http://localhost:8080/api"
).replace(/\/$/, "");

/** Browser-side base for the Next.js BFF proxy routes (same origin). */
export const BFF_BASE = "/api";

/** Backend auth endpoints (server-side). */
export const BACKEND_ENDPOINTS = {
  login: "/auth/login",
  signup: "/auth/signup",
  logout: "/auth/logout",
  me: "/auth/me",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  refresh: "/auth/refresh",
  users: "/users",
  userById: (id: string) => `/users/${id}`,
  userByHandle: (handle: string) => `/users/handle/${handle}`,
  updateMe: "/users/me",
  deleteMe: "/users/me",
  waitlist: "/waitlist",
  talentApplications: "/talent-applications",
  campaigns: "/campaigns",
  campaignsMine: "/campaigns/mine",
} as const;
