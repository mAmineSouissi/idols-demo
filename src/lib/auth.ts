import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authApi } from "@api/auth";
import type { UserRole } from "@api/types";

/** Normalize the backend role label into our UserRole union. */
function normalizeRole(label?: string): UserRole {
  const l = (label ?? "").toLowerCase();
  if (l === "brand") return "brand";
  if (l === "admin") return "admin";
  return "creator";
}

/** Epoch-ms expiry read from a JWT's `exp` claim (0 if unreadable). */
function accessTokenExpiry(jwt?: string): number {
  if (!jwt) return 0;
  try {
    const payload = JSON.parse(
      Buffer.from(jwt.split(".")[1], "base64").toString("utf8"),
    );
    return typeof payload.exp === "number" ? payload.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Authenticate against the NestJS backend.
        const { user, token, refreshToken } = await authApi.login({
          email: credentials.email,
          password: credentials.password,
        });

        // The returned object is persisted into the NextAuth JWT.
        return {
          id: user.id,
          email: user.email,
          name: user.displayName ?? user.username ?? user.email,
          image: user.avatarUrl ?? null,
          handle: user.handle ?? null,
          displayName: user.displayName ?? null,
          role: normalizeRole(user.role?.label),
          backendToken: token,
          refreshToken,
        };
      },
    }),
  ],

  callbacks: {
    // Persist backend tokens + profile into the (server-side, encrypted) JWT,
    // and silently refresh the access token once it expires.
    async jwt({ token, user }) {
      // Initial sign-in.
      if (user) {
        token.backendToken = user.backendToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = accessTokenExpiry(user.backendToken);
        token.role = user.role;
        token.handle = user.handle ?? null;
        token.displayName = user.displayName ?? null;
        token.picture = user.image ?? null;
        return token;
      }

      // Access token still valid (60s safety buffer)?
      if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires - 60_000
      ) {
        return token;
      }

      // Expired → exchange the refresh token for a fresh pair.
      if (!token.refreshToken) return { ...token, error: "NoRefreshToken" };
      try {
        const refreshed = await authApi.refresh(token.refreshToken);
        token.backendToken = refreshed.token;
        token.refreshToken = refreshed.refreshToken;
        token.accessTokenExpires = accessTokenExpiry(refreshed.token);
        delete token.error;
      } catch {
        // Refresh failed (refresh token expired/invalid) — next protected call
        // will 401 and the FE will route to /login.
        token.error = "RefreshAccessTokenError";
      }
      return token;
    },

    // Expose a safe profile to the client. The raw backendToken is NOT
    // surfaced here — the BFF proxy reads it server-side via getToken().
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role;
        session.user.handle = token.handle ?? null;
        session.user.displayName = token.displayName ?? null;
      }
      return session;
    },
  },
};
