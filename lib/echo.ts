import Echo from "laravel-echo";
import Pusher from "pusher-js";

let echo: Echo<"reverb"> | null = null;

/** Singleton Echo (Reverb) client; private-channel auth via /broadcasting/auth. */
export function getEcho(): Echo<"reverb"> {
  if (echo) return echo;
  (window as unknown as { Pusher: typeof Pusher }).Pusher = Pusher;
  Pusher.logToConsole = true; // logs every WS frame (channels + event names)

  echo = new Echo<"reverb">({
    broadcaster: "reverb",
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY ?? "",
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
    wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT ?? 8080),
    wssPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT ?? 443),
    forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "http") === "https",
    enabledTransports: ["ws", "wss"],
    authEndpoint: "/broadcasting/auth",
  });

  // Diagnostics: log the socket connection lifecycle.
  const pusher = (echo.connector as unknown as { pusher: Pusher }).pusher;
  pusher.connection.bind("state_change", (s: { previous: string; current: string }) =>
    console.log(`[echo] connection ${s.previous} → ${s.current}`),
  );
  pusher.connection.bind("error", (e: unknown) =>
    console.error("[echo] connection error", e),
  );

  return echo;
}
