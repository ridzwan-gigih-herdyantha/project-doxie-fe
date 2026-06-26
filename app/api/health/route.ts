import { NextResponse } from "next/server";

import { serverEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

/**
 * Server-side readiness probe for the status indicator on the auth screens.
 * Hits the backend's `/ready` endpoint
 */
export async function GET() {
  const base = serverEnv.laravelApiUrl.replace(/\/api\/?$/, "");

  try {
    const res = await fetch(`${base}/ready`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return NextResponse.json({ ok: false });

    const data = (await res.json()) as {
      status?: string;
      checks?: Record<string, unknown>;
    };

    const checksOk =
      data.checks && typeof data.checks === "object"
        ? Object.values(data.checks).every((v) => v === true)
        : true;

    return NextResponse.json({ ok: data.status === "ok" && checksOk });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
