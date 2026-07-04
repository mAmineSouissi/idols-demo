import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";
import type { UserRole } from "@api/types";

declare module "next-auth" {
  /** Returned by `authorize` and persisted into the JWT. */
  interface User extends DefaultUser {
    role: UserRole;
    handle?: string | null;
    displayName?: string | null;
    /** NestJS access token — kept server-side, never sent to the client. */
    backendToken: string;
    /** NestJS refresh token — used server-side to mint new access tokens. */
    refreshToken: string;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
      handle?: string | null;
      displayName?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: UserRole;
    handle?: string | null;
    displayName?: string | null;
    backendToken?: string;
    refreshToken?: string;
    /** Epoch ms when backendToken expires; drives silent refresh. */
    accessTokenExpires?: number;
    error?: string;
  }
}
