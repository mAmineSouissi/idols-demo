/**
 * Shared API types — mirror the Icons NestJS backend contract
 * (icons-api `ResponseUserDto`, auth DTOs).
 */

export type UserRole = "creator" | "brand" | "admin";

/** A role as returned by the backend (RoleEntity). */
export interface BackendRole {
  id: string;
  label: string;
  description?: string;
}

/** The user shape returned by `GET /auth/me`, `/auth/login`, `/auth/signup`. */
export interface BackendUser {
  id: string;
  email: string;
  username?: string;
  handle?: string;
  displayName?: string;
  avatarUrl?: string | null;
  bio?: string | null;
  socials?: Record<string, string | null> | null;
  metrics?: Record<string, number> | null;
  status?: string;
  role?: BackendRole;
  roleId?: string;
  isActive?: boolean;
  emailVerified?: string | null;
  lastSeenAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/** Body of `POST /auth/login`. */
export interface LoginPayload {
  email: string;
  password: string;
}

/** Body of `POST /auth/signup`. */
export interface SignupPayload {
  email: string;
  password: string;
  role: UserRole;
  handle: string;
  displayName: string;
}

/** Response of `/auth/login` and `/auth/signup` (tokens in the body). */
export interface AuthResponse {
  user: BackendUser;
  token: string;
  refreshToken: string;
}

/** Response of `/auth/refresh`. */
export interface RefreshResponse {
  token: string;
  refreshToken: string;
}

export interface UpdateUserPayload {
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  socials?: Record<string, string | null>;
  metrics?: Record<string, number>;
}

/** Normalized API error thrown by the fetch helpers. */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
