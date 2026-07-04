import { BFF_BASE } from "./config";
import { ApiError } from "./types";

/**
 * BROWSER-SIDE fetch to the Next.js BFF proxy routes (same origin). The
 * NextAuth session cookie rides along automatically; the proxy attaches the
 * NestJS Bearer token server-side. The raw backend token never touches the
 * browser.
 */
export async function bffFetch<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  const { method = "GET", body } = options;

  const res = await fetch(`${BFF_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  const text = await res.text();
  const parsed = text ? safeJson(text) : undefined;

  if (!res.ok) {
    const message =
      (parsed as { message?: string | string[] })?.message ??
      res.statusText ??
      "Request failed";
    throw new ApiError(
      res.status,
      Array.isArray(message) ? message.join(", ") : String(message),
      parsed,
    );
  }

  return parsed as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
