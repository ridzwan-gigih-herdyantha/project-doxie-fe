import Echo from "laravel-echo";
import Pusher from "pusher-js";

let echo: Echo<"pusher"> | null = null;

/** Singleton Echo (Pusher) client; private channels auth via the token proxy. */
export function getEcho(): Echo<"pusher"> {
  if (echo) return echo;
  (window as unknown as { Pusher: typeof Pusher }).Pusher = Pusher;
  echo = new Echo<"pusher">({
    broadcaster: "pusher",
    key: process.env.NEXT_PUBLIC_PUSHER_KEY ?? "",
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "mt1",
    forceTLS: true,
    authEndpoint: "/api/backend/broadcasting/auth",
  });
  return echo;
}
