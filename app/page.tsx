import { api } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";
import { serverEnv } from "@/lib/env";

/**
 * Starter home page. It pings the Laravel API from the server to confirm the
 * integration is wired up, and degrades gracefully when the backend is down.
 * Replace this with your real UI — it's here as a living example of the
 * Server Component + `api` client pattern.
 */
async function checkApi(): Promise<{ ok: boolean; detail: string }> {
  try {
    // Hits the API root. Swap for a real endpoint such as `/health` or `/user`.
    await api.get("/ping", { skipAuth: true });
    return { ok: true, detail: "Connected" };
  } catch (error) {
    if (error instanceof ApiError) {
      // A response (even 401/404) means the server is reachable.
      return { ok: true, detail: `Reachable (HTTP ${error.status})` };
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return { ok: false, detail: message };
  }
}

export default async function Home() {
  const status = await checkApi();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-8 px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Doxie</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Next.js frontend wired to a Laravel API. Edit{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            app/page.tsx
          </code>{" "}
          to get started.
        </p>
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <span
            className={`inline-block size-2.5 rounded-full ${
              status.ok ? "bg-green-500" : "bg-red-500"
            }`}
            aria-hidden
          />
          <span className="font-medium">
            Laravel API: {status.ok ? "connected" : "unreachable"}
          </span>
        </div>
        <dl className="mt-3 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex gap-2">
            <dt className="w-20 shrink-0">Target</dt>
            <dd className="font-mono">{serverEnv.laravelApiUrl}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0">Detail</dt>
            <dd>{status.detail}</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}
