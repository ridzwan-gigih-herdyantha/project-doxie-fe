import { Card } from "@/components/ui/card";
import { DoxieLogo } from "@/components/doxie-logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-serif flex min-h-screen items-center justify-center bg-background px-6 py-12">
      {/* <div className="absolute inset-0 bg-[#c9d609]" /> */}
      <div className="w-full max-w-sm">
        <div className="z-1 mb-6 flex flex-col items-center gap-4">
          <DoxieLogo className="size-14" />
          <span className="font-serif text-2xl font-bold tracking-tight text-brand">
            Doxie
          </span>
        </div>
        <Card className="z-1 bg-[#141B2B] ring-[#3D4A42] px-4 py-6 shadow-lg shadow-black/70">
          {children}
        </Card>
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
