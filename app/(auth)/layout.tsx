import Image from "next/image";

import { Card } from "@/components/ui/card";

/**
 * Shared shell for the auth pages (login, register, …). It only provides the
 * visual frame — branding and the surrounding Card — while each page supplies
 * its own CardHeader/CardContent. Keep this a Server Component; the interactive
 * form logic lives in the per-page client components.
 *
 * Colors come from shadcn theme tokens (bg-background, Card, text-primary) so
 * the look is controlled centrally via CSS variables, not hardcoded here.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-serif flex min-h-screen items-center justify-center bg-background px-6 py-12">
      {/* <div className="absolute inset-0 bg-[#c9d609]" /> */}
      <div className="w-full max-w-sm">
        <div className="z-1 mb-6 flex flex-col items-center gap-4">
          <Image
            src="/logo/doxie-logo-teal.svg"
            alt="Doxie"
            width={56}
            height={56}
            priority
            unoptimized
          />
          <span className="font-serif text-2xl font-bold tracking-tight text-[#68DBA9]">
            Doxie
          </span>
        </div>
        <Card className="z-1 bg-[#141B2B] ring-[#3D4A42] px-4 py-6 shadow-lg shadow-black/70">{children}</Card>
        <div className="z-1 mt-8 text-center text-sm flex flex-row justify-between text-muted-foreground">
          <p>All system operational</p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <a href="#" className="font-light hover:underline">Help</a>
            {/* <span className="text-xs">|</span> */}
            <a href="#" className="font-light hover:underline">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
