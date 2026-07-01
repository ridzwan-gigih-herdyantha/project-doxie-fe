import Image from "next/image";

import { Button } from "@/components/ui/button";
import { serverEnv } from "@/lib/env";

/**
 * "Sign in with Google" — a plain link (full browser navigation) to the Laravel
 * OAuth redirect endpoint. Google bounces back to Laravel, which then redirects
 * to our /auth/callback route with a token (see app/auth/callback/route.ts).
 * Rendered from a Server Component so the API base URL stays server-side.
 */
export function GoogleAuthButton({ label = "Sign in with Google" }: { label?: string }) {
  const href = `${serverEnv.laravelApiUrl}/auth/google/redirect`;

  return (
    <Button
      asChild
      variant="outline"
      className="w-full my-4 rounded-sm dark:bg-[#3D4A42]/10 dark:border-[#3D4A42] hover:dark:bg-[#3D4A42]/30"
    >
      <a href={href}>
        <Image
          src="/logo/google-icon.svg"
          alt=""
          width={14}
          height={14}
          unoptimized
        />
        {label}
      </a>
    </Button>
  );
}
