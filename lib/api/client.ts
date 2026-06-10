import "server-only";

import { serverEnv } from "@/lib/env";
import { getToken } from "@/lib/auth/session";
import { ApiError } from "@/lib/api/errors";

/**
 * Server-side client for the Laravel API.
 *
 * Use this inside Server Components, Route Handlers, and Server Actions. It runs
 * server-to-server, so there is no CORS involved and the Bearer token (read from
 * the httpOnly cookie) never reaches the browser.
 *
 * `fetch` is uncached by default in Next.js 16, which is what we want for
 * per-user authenticated data. Opt into caching per call with `cache` /
 * `next: { revalidate, tags }` when a resource is safe to cache.
 */

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  /** Plain object serialized to a JSON request body (sets Content-Type). */
  json?: unknown;
  /** Raw body, when you need full control (e.g. FormData). Overrides `json`. */
  body?: BodyInit;
  /** Skip attaching the Authorization header (e.g. login/register). */
  skipAuth?: boolean;
}

async function request<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { json, body, skipAuth, headers, ...init } = options;

  const finalHeaders = new Headers(headers);
  finalHeaders.set("Accept", "application/json");

  let finalBody = body;
  if (json !== undefined && finalBody === undefined) {
    finalHeaders.set("Content-Type", "application/json");
    finalBody = JSON.stringify(json);
  }

  if (!skipAuth) {
    const token = await getToken();
    if (token) {
      finalHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  const url = `${serverEnv.laravelApiUrl}/${path.replace(/^\/+/, "")}`;
  const response = await fetch(url, { ...init, headers: finalHeaders, body: finalBody });

  // 204 No Content (and empty bodies) have nothing to parse.
  if (response.status === 204 || response.headers.get("content-length") === "0") {
    if (!response.ok) {
      throw new ApiError(response.status, response.statusText, null);
    }
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null && "message" in payload
        ? String((payload as { message: unknown }).message)
        : response.statusText || `Request failed with status ${response.status}`;
    throw new ApiError(response.status, message, payload);
  }

  return payload as T;
}

export const api = {
  get: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, json?: unknown, options?: ApiRequestOptions) =>
    request<T>(path, { ...options, method: "POST", json }),
  put: <T>(path: string, json?: unknown, options?: ApiRequestOptions) =>
    request<T>(path, { ...options, method: "PUT", json }),
  patch: <T>(path: string, json?: unknown, options?: ApiRequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", json }),
  delete: <T>(path: string, options?: ApiRequestOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),
};
