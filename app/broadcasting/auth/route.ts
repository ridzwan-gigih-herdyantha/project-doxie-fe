import { type NextRequest, NextResponse } from "next/server";

import { serverEnv } from "@/lib/env";
import { getToken } from "@/lib/auth/session";

/**
 * Private-channel auth for Laravel Echo. Laravel serves this at the app root
 * (`/broadcasting/auth`, not under `/api`), so we strip `/api` from the base and
 * attach the Bearer token from the httpOnly cookie (kept out of client JS).
 */
export async function POST(request: NextRequest) {
  const token = await getToken();
  const base = serverEnv.laravelApiUrl.replace(/\/api\/?$/, "");
  const body = await request.text();

  try {
    const upstream = await fetch(`${base}/broadcasting/auth`, {
      method: "POST",
      headers: {
        "Content-Type":
          request.headers.get("content-type") ?? "application/x-www-form-urlencoded",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body,
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      console.error(`[broadcasting/auth] ${upstream.status}:`, text.slice(0, 300));
    }
    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("[broadcasting/auth] fetch failed", error);
    return NextResponse.json({ message: "Broadcast auth failed." }, { status: 502 });
  }
}
