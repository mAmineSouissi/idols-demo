import { BACKEND_URL } from "./config";
import { ApiError } from "./types";

export async function backendFetch<T>(
  path: string,
  options: {
    method?: string;
    body?: unknown;
    token?: string;
    headers?: Record<string, string>;
  } = {},
): Promise<T> {
  const { method = "GET", body, token, headers = {} } = options;

  const res = await fetch(`${BACKEND_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    // Server-to-server; no browser cookies involved.
    cache: "no-store",
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
