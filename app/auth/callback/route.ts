import { NextResponse } from "next/server";

import { serverEnv } from "@/lib/env";
import { setToken, setUser, type SessionUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

/**
 * Google OAuth landing route.
 *
 * The flow: the "Sign in with Google" link hits Laravel's
 * `/auth/google/redirect`, Google bounces back to Laravel's callback, and
 * Laravel finally redirects the browser HERE with the issued token. Google
 * redirects to a *page*, not a JSON endpoint, so this has to be a Route Handler
 * that sets the httpOnly session cookie (same one used by email login), fetches
 * the current user, and forwards to the dashboard.
 *
 * Expected redirect from Laravel:
 *   /auth/callback?token=<sanctum-token>
 *   &error=<message>            (on failure)
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const error = url.searchParams.get("error");

  if (error || !token) {
    return NextResponse.redirect(new URL("/login?error=google", url.origin));
  }

  await setToken(token);

  // Populate the user cookie so Server Components (navbar, and the realtime
  // document-ready listener which is gated behind a user existing) work the same
  // as email login. Fetch directly with the token to avoid relying on the
  // just-set cookie being readable within this same request.
  try {
    const res = await fetch(`${serverEnv.laravelApiUrl}/auth/user`, {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      const json = (await res.json()) as Record<string, unknown>;
      const user = extractUser(json);
      if (user) await setUser(user);
    }
  } catch {
    // Best-effort — the token alone is enough to be signed in. If this fails,
    // the user cookie stays empty (name/avatar + live notifications degrade),
    // but the session is still valid.
  }

  return NextResponse.redirect(new URL("/dashboard?notice=signed-in", url.origin));
}

/** Pull the user object out of a few common Laravel response shapes. */
function extractUser(json: Record<string, unknown>): SessionUser | null {
  const data = json?.data as Record<string, unknown> | undefined;
  const candidate =
    (data?.user as Record<string, unknown> | undefined) ??
    data ??
    (json?.user as Record<string, unknown> | undefined) ??
    json;

  if (
    candidate &&
    typeof candidate.uuid === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.email === "string"
  ) {
    return {
      uuid: candidate.uuid,
      name: candidate.name,
      email: candidate.email,
      avatar_url:
        typeof candidate.avatar_url === "string" ? candidate.avatar_url : null,
    };
  }
  return null;
}
