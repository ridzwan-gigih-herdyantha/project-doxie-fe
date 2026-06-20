import "server-only";

import { redirect } from "next/navigation";

import { serverEnv } from "@/lib/env";
import { getToken } from "@/lib/auth/session";
import { ApiError } from "@/lib/api/errors";
import { SESSION_EXPIRED_PATH } from "@/lib/auth/expire";


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


  if (response.status === 401 && !skipAuth) {
    redirect(SESSION_EXPIRED_PATH);
  }

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
    // Prefer the API's own message; fall back per-status for bodies with none.
    const fallback =
      response.status === 413
        ? "The file is too large."
        : response.statusText || `Request failed with status ${response.status}`;
    const message =
      typeof payload === "object" && payload !== null && "message" in payload
        ? String((payload as { message: unknown }).message)
        : fallback;
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
