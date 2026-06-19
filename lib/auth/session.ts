import "server-only";

import { cookies } from "next/headers";

/**
 * Bearer-token session helpers.
 *
 * The token issued by Laravel (Sanctum/Passport) is kept in an httpOnly cookie
 * so it is never readable by client-side JavaScript (XSS-safe). Server
 * Components read it to authenticate server-to-server fetches; the route-handler
 * proxy reads it to forward client requests. Writing the cookie is only allowed
 * from a Route Handler or Server Action (not during Server Component render).
 */

const TOKEN_COOKIE = "doxie_token";

/** Read the Bearer token from the request cookies, or `null` if absent. */
export async function getToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(TOKEN_COOKIE)?.value ?? null;
}

/**
 * Persist the token in an httpOnly cookie.
 * Call only from a Route Handler or Server Action.
 *
 * @param token   The token returned by the Laravel login endpoint.
 * @param maxAge  Lifetime in seconds. Defaults to 7 days.
 */
export async function setToken(token: string, maxAge = 60 * 60 * 24 * 7): Promise<void> {
  const store = await cookies();
  store.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

/** Remove the token cookie (logout). Call only from a Route Handler/Server Action. */
export async function clearToken(): Promise<void> {
  const store = await cookies();
  store.delete(TOKEN_COOKIE);
}

const USER_COOKIE = "doxie_user";

/** The authenticated user returned by the Laravel login/register endpoints. */
export interface SessionUser {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
}

/**
 * Persist the user returned at login so Server Components can show their name,
 * email, and avatar without an extra `GET /user` round-trip. Call only from a
 * Route Handler or Server Action.
 */
export async function setUser(
  user: SessionUser,
  maxAge = 60 * 60 * 24 * 7,
): Promise<void> {
  const store = await cookies();
  store.set(USER_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

/** Read the stored user, or `null` if absent/invalid. */
export async function getUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const raw = store.get(USER_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

/** Remove the user cookie (logout). Call only from a Route Handler/Server Action. */
export async function clearUser(): Promise<void> {
  const store = await cookies();
  store.delete(USER_COOKIE);
}
