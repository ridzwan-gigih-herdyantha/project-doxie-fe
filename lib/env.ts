import "server-only";

/**
 * Centralized, validated access to server-side environment variables.
 *
 * This module is server-only: importing it from a Client Component fails the
 * build, so the Laravel base URL (and anything else added here) can never leak
 * into the browser bundle. Read these values through `serverEnv` rather than
 * touching `process.env` directly so a missing variable fails loudly at startup
 * instead of producing a confusing `fetch` to `undefined/...`.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". ` +
        `Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

export const serverEnv = {
  /** Base URL of the Laravel API, e.g. http://localhost:8000/api */
  laravelApiUrl: required("LARAVEL_API_URL").replace(/\/+$/, ""),
} as const;
