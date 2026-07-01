import { NextResponse } from "next/server";

import { setToken, setUser, type SessionUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

/**
 * Google OAuth landing route.
 *
 * The flow: the "Sign in with Google" link hits Laravel's
 * `/auth/google/redirect`, Google bounces back to Laravel's callback, and
 * Laravel finally redirects the browser HERE with the issued token. Google
 * redirects to a *page*, not a JSON endpoint, so this has to be a Route Handler
 * that sets the httpOnly session cookie (same one used by email login) and then
 * forwards to the dashboard.
 *
 * Expected redirect from Laravel:
 *   /auth/callback?token=<sanctum-token>
 *   &user=<base64-encoded JSON of {uuid,name,email,avatar_url}>   (optional)
 *   &error=<message>                                              (on failure)
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const error = url.searchParams.get("error");

  if (error || !token) {
    return NextResponse.redirect(new URL("/login?error=google", url.origin));
  }

  await setToken(token);

  // Optional user payload so Server Components can show the name/avatar without
  // an extra round-trip (mirrors what email login stores).
  const rawUser = url.searchParams.get("user");
  if (rawUser) {
    try {
      const decoded = Buffer.from(rawUser, "base64").toString("utf8");
      const u = JSON.parse(decoded) as Partial<SessionUser>;
      if (u.uuid && u.name && u.email) {
        await setUser({
          uuid: u.uuid,
          name: u.name,
          email: u.email,
          avatar_url: u.avatar_url ?? null,
        });
      }
    } catch {
      // Malformed user payload — ignore; the token alone is enough to sign in.
    }
  }

  return NextResponse.redirect(new URL("/dashboard?notice=signed-in", url.origin));
}
