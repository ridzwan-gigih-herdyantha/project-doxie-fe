import { redirect } from "next/navigation";

import { clearToken, clearUser } from "@/lib/auth/session";

/**
 * Session-expired endpoint.
 *
 * Hit when an authenticated request returns `401` mid-session. It clears the
 * stale auth cookies (only a Route Handler/Server Action may write cookies — a
 * Server Component render can't) and forwards to the login page. Both server-
 * and client-side callers funnel here so there is a single place that logs out.
 */
export async function GET() {
  await clearToken();
  await clearUser();
  redirect("/login?expired=1");
}
