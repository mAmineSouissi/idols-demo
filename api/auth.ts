import { backendFetch } from "./backend";
import { BACKEND_ENDPOINTS } from "./config";
import type {
  AuthResponse,
  BackendUser,
  LoginPayload,
  RefreshResponse,
  SignupPayload,
} from "./types";

/**
 * SERVER-SIDE auth calls against the NestJS backend. Used by NextAuth
 * `authorize` and the signup proxy route.
 */
export const authApi = {
  login(payload: LoginPayload): Promise<AuthResponse> {
    return backendFetch<AuthResponse>(BACKEND_ENDPOINTS.login, {
      method: "POST",
      body: payload,
    });
  },

  signup(payload: SignupPayload): Promise<AuthResponse> {
    return backendFetch<AuthResponse>(BACKEND_ENDPOINTS.signup, {
      method: "POST",
      body: payload,
    });
  },

  /** Validate a token / fetch the current user from the backend. */
  me(token: string): Promise<BackendUser> {
    return backendFetch<BackendUser>(BACKEND_ENDPOINTS.me, { token });
  },

  /** Exchange a refresh token for a fresh access + refresh pair. */
  refresh(refreshToken: string): Promise<RefreshResponse> {
    return backendFetch<RefreshResponse>(BACKEND_ENDPOINTS.refresh, {
      method: "POST",
      body: { refreshToken },
    });
  },

  forgotPassword(email: string): Promise<{ message: string }> {
    return backendFetch<{ message: string }>(BACKEND_ENDPOINTS.forgotPassword, {
      method: "POST",
      body: { email },
    });
  },

  resetPassword(token: string, password: string): Promise<{ message: string }> {
    return backendFetch<{ message: string }>(BACKEND_ENDPOINTS.resetPassword, {
      method: "POST",
      body: { token, password },
    });
  },
};
