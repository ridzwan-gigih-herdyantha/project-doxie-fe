import { type NextRequest, NextResponse } from "next/server";

import { serverEnv } from "@/lib/env";
import { getToken } from "@/lib/auth/session";

/**
 * Catch-all proxy: forwards `/api/backend/*` to the Laravel API.
 *
 * This exists for the cases where the browser must call the API directly
 * (polling, client-only Web APIs, etc.). It runs server-side, reads the token
 * from the httpOnly cookie, and adds the `Authorization` header — so the token
 * stays out of client JS and requests are same-origin (no CORS, no preflight).
 *
 * Server Components should call `api.*` from `lib/api/client` directly instead;
 * going through this HTTP hop only adds latency for them.
 */

// Headers that belong to this hop, not the upstream request.
const HOP_BY_HOP = new Set(["host", "connection", "cookie", "content-length"]);

async function handler(request: NextRequest, ctx: RouteContext<"/api/backend/[...path]">) {
  const { path } = await ctx.params;
  const search = request.nextUrl.search;
  const target = `${serverEnv.laravelApiUrl}/${path.join("/")}${search}`;

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key)) headers.set(key, value);
  });
  headers.set("Accept", "application/json");

  const token = await getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const hasBody = request.method !== "GET" && request.method !== "HEAD";

  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body: hasBody ? await request.arrayBuffer() : undefined,
      redirect: "manual",
    });

    // Stream the upstream response back to the client unchanged.
    return new NextResponse(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: upstream.headers,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to reach the API server." },
      { status: 502 },
    );
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
